import { collection, getDocs } from "firebase/firestore";
import { store } from "./firebase";

import { COLLECTIONS } from "@constants";
import { AdBanner } from "@models/banner";

export async function getAdBanners() {
  const adBannerSnapShot = await getDocs(
    collection(store, COLLECTIONS.ADBANNER),
  );
  return adBannerSnapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as AdBanner),
  }));
}
