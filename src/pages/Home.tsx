import AdBanners from "@components/home/AdBanners";
import CardList from "@components/home/CardList";
import Top from "@shared/Top";

export default function HomePage() {
  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subTitle="회원님을 위해서 혜택 좋은 카드를 가져왔어요."
      />
      <AdBanners />
      <CardList />
    </div>
  );
}
