import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const itemsCollection = collection(db, "items");

export async function addItem(name: string) {
  return await addDoc(itemsCollection, { name, bought: false });
}

export async function listItems() {
  const snapshot = await getDocs(itemsCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data }));
}

export async function removeItem(id: string) {
  return await deleteDoc(doc(db, "itens", id));
}

export async function itemBought(id: string, bought: boolean) {
  return await updateDoc(doc(db, "itens", id), { bought });
}
