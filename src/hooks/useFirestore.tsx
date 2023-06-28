import { app, db } from "@/configs/firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";

export default function useFirestore() {
  const [biders, setBiders] = useState<UserInterface[]>();
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "bider"), (doc) => {
      const biders: UserInterface[] = [];
      doc.forEach((d) => {
        biders.push({ ...d.data(), id: d.id } as UserInterface);
      });
      setBiders(biders);
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const auth = getAuth(app);
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const addKonBid = async (name: string) => {
    if (name.length === 0) return;
    await addDoc(collection(db, "bider"), {
      name: name,
      bid: 0,
    });
  };

  const vote = async (id: string) => {
    await updateDoc(doc(db, "bider", id), {
      bid: biders?.find((b) => b.id === id)?.bid! + 1,
    });
  };

  const signInWithGoogle = async () => {
    const auth = getAuth(app);
    auth.languageCode = "th";
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const signOutAction = () => {
    const auth = getAuth(app);
    signOut(auth);
  };

  return { addKonBid, biders, vote, signInWithGoogle, user, signOutAction };
}
