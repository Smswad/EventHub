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
  googleLogin: () => Promise<UserCredential | void>;
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
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      // Force trigger state update with the fresh currentUser so displayName is immediately available
      if (auth.currentUser) {
        setUser({ ...auth.currentUser } as User);
        await syncUserToFirestore(auth.currentUser, { displayName: name });
      }
    }
    return userCredential;
  };

  const login = async (email: string, password: string): Promise<UserCredential> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (userCredential.user) {
      await syncUserToFirestore(userCredential.user);
    }
    return userCredential;
  };

  const googleLogin = async (): Promise<UserCredential | void> => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        await syncUserToFirestore(result.user);
      }
      return result;
    } catch (error: any) {
      if (error?.code === "auth/popup-blocked") {
        console.warn("Popup blocked by browser, falling back to signInWithRedirect...");
        await signInWithRedirect(auth, provider);
        return;
      }
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
