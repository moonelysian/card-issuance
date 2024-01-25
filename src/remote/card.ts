import { collection, getDocs } from "firebase/firestore";
import { store } from "./firebase";

import { COLLECTIONS } from "@constants";
import { Card } from "@models/card";

export async function getCards() {
  const cardSnapShot = await getDocs(collection(store, COLLECTIONS.CARD));
  return cardSnapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }));
}
