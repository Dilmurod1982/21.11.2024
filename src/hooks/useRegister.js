import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useAppStore } from "../lib/zustand/index";
import toast from "react-hot-toast";

function useRegister() {
  const [isPending, setIsPending] = useState(false);
  const setUser = useAppStore((state) => state.setUser);

  const registerWithGoogle = async () => {
    setIsPending(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      toast.success(`Welcome  ${user.displayName}`);
      setIsPending(false);
    } catch (error) {
      const errorMessage = error.message;
      alert(errorMessage);
      setIsPending(false);
    }
  };
  const registerEmailAndPassword = async (
    email,
    password,
    displayName,
    photoURL
  ) => {
    try {
      const register = createUserWithEmailAndPassword(auth, email, password);
      setIsPending(true);
      const user = (await register).user;
      await updateProfile(auth.currentUser, { displayName, photoURL });
      setUser(user);
      console.log(user);
      toast.success(`Welcome, ${user.displayName}`);
      setIsPending(false);
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      console.log(errorMessage);
      setIsPending(false);
    }
  };
  return { registerWithGoogle, isPending, registerEmailAndPassword };
}

export { useRegister };
