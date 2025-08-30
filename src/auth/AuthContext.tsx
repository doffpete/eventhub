import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  type User,
  onAuthStateChanged,
  type UserCredential,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";

interface AuthContextI {
  user: User | null;
  loading: boolean;
  signInUser: (email: string, password: string) => Promise<UserCredential>;
  signUpNewUser: (email: string, password: string) => Promise<UserCredential>;
  passwordReset: (email: string, redirectUrl: string) => Promise<void>;
  confirmResetPassword: (
    oobCode: string,
    newPassword: string
  ) => Promise<boolean>;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
}
const AuthContext = createContext<AuthContextI | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider);
  };

  const signInUser = async (email: string, password: string) => {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  };

  const signUpNewUser = async (email: string, password: string) => {
    const userData = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userData;
  };

  const passwordReset = async (email: string, redirectUrl: string) => {
    // const redirectUrl =
    //   import.meta.env.VITE_RESET_PASSWORD_REDIRECT ||
    //   `${window.location.origin}/reset_password`;
    await sendPasswordResetEmail(auth, email, {
      url: redirectUrl,
      handleCodeInApp: true,
    });
  };

  const confirmResetPassword = async (oobCode: string, newPassword: string) => {
    try {
      await confirmPasswordReset(auth, oobCode!, newPassword);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const logOut = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInUser,
        signUpNewUser,
        signInWithGoogle,
        passwordReset,
        confirmResetPassword,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
