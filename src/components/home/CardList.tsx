import { getCards } from "@/remote/card";
import ListRow from "@shared/ListRow";
import { useInfiniteQuery } from "react-query";
import { flatten } from "lodash";
import { useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function CardList() {
  const {
    data,
    hasNextPage = false,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery("cards", ({ pageParam }) => getCards(pageParam), {
    getNextPageParam: (snapshot) => snapshot.lastVisible,
  });

  const loadMore = useCallback(() => {
    if (!hasNextPage || isFetching) {
      return;
    }
    return fetchNextPage();
  }, [hasNextPage, isFetching, fetchNextPage]);

  if (data === null) {
    return null;
  }

  const cards = flatten(data?.pages.map(({ items }) => items));

  return (
    <div>
      <InfiniteScroll
        dataLength={cards.length}
        next={() => loadMore()}
        hasMore={hasNextPage}
        loader={<></>}
      >
        {cards?.map((card, index) => (
          <ListRow
            key={card.id}
            contents={
              <ListRow.Texts title={`${index + 1}위`} subTitle={card.name} />
            }
            right={card.payback ? <div>{card.payback}</div> : null}
            withArrow={true}
            onClick={() => {}}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}
