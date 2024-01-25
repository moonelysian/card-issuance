import Button from "@shared/Button";
import { collection, doc, writeBatch } from "firebase/firestore";
import { store } from "@remote/firebase";
import { card_list, adBanners } from "@/mock/data";
import { COLLECTIONS } from "@/constants";

export default function TestPage() {
  const handleCardButtonClick = async () => {
    const batch = writeBatch(store);

    card_list.forEach((card) => {
      const docRef = doc(collection(store, COLLECTIONS.CARD));
      batch.set(docRef, card);
    });
    await batch.commit();
    alert("카드 리스트 추가 완료");
  };

  const handleAdButtonClick = async () => {
    const batch = writeBatch(store);

    adBanners.forEach((banner) => {
      const docRef = doc(collection(store, COLLECTIONS.ADBANNER));
      batch.set(docRef, banner);
    });
    await batch.commit();
    alert("광고 배너 추가 완료");
  };

  return (
    <div>
      <Button
        onClick={async () => {
          await handleCardButtonClick();
        }}
      >
        카드 리스트 추가하기
      </Button>

      <Button
        onClick={async () => {
          await handleAdButtonClick();
        }}
      >
        광고 배너 추가하기
      </Button>
    </div>
  );
}
