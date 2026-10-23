"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export const syncUserToFirestore = async (
  firebaseUser: User,
  additionalData?: { displayName?: string; role?: string }
) => {
  if (!firebaseUser?.uid) return;
  try {
    const userDocRef = doc(db, "users", firebaseUser.uid);
    await setDoc(
      userDocRef,
      {
        uid: firebaseUser.uid,
        email: firebaseUser.email || "",
        displayName: additionalData?.displayName || firebaseUser.displayName || "Event Organizer",
        photoURL: firebaseUser.photoURL || null,
        role: additionalData?.role || "organizer",
        lastLoginAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
    console.log("Successfully recorded user in Firestore users collection:", firebaseUser.uid);
  } catch (err: any) {
    console.warn("Could not save user to Firestore (check Firestore security rules):", err?.message);
  }
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (name: string, email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  googleLogin: () => Promise<UserCredential>;
  logout: () => Promise<void>;
  signOut: () => Promise<void>; // Alias for backwards compatibility
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  register: async () => {
    throw new Error("AuthProvider is not available");
  },
  login: async () => {
    throw new Error("AuthProvider is not available");
  },
  googleLogin: async () => {
    throw new Error("AuthProvider is not available");
  },
  logout: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if returning from a redirect sign-in
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          setUser(result.user);
          syncUserToFirestore(result.user);
        }
      })
      .catch((err) => {
        console.error("Redirect sign-in error:", err);
      });

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        syncUserToFirestore(currentUser);
      }
    });

    return () => unsubscribe();
  }, []);

  const register = async (name: string, email: string, password: string): Promise<UserCredential> => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name,
        });
        const freshUser = auth.currentUser || userCredential.user;
        setUser({ ...freshUser } as User);
        await syncUserToFirestore(freshUser, { displayName: name });
      }
      return userCredential;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<UserCredential> => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        setUser(userCredential.user);
        await syncUserToFirestore(userCredential.user);
      }
      return userCredential;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async (): Promise<UserCredential> => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      // Open popup directly within user gesture without pre-state delays
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        setUser(result.user);
        await syncUserToFirestore(result.user);
      }
      return result;
    } catch (error: any) {
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    await firebaseSignOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        googleLogin,
        logout,
        signOut: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
