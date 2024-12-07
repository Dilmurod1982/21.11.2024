import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAppStore } from "../lib/zustand";
import toast from "react-hot-toast";
import { useState } from "react";

export const useLogin = () => {
  const [isPending, setIsPending] = useState(false);
  const setUser = useAppStore((state) => state.setUser);
  const signIn = async (email, password) => {
    setIsPending(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      setUser(user);
      toast.success(`Welcome, ${user.displayName}`);
      setIsPending(false);
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      setIsPending(false);
    }
  };
  return { isPending, signIn };
};
