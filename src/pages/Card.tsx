import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { getCard } from "@/remote/card";
import Top from "@shared/Top";
import ListRow from "@shared/ListRow";
import FixedBottomButton from "@shared/FixedBottomButton";
import FlexBox from "@shared/FlexBox";
import Text from "@shared/Text";

export default function CardPage() {
  const { id = "" } = useParams();
  const { data } = useQuery(["card", id], () => getCard(id), {
    enabled: id !== "",
  });

  if (!data) return null;

  const { name, corpName, promotion, tags, benefit } = data;
  return (
    <div>
      <Top
        title={`${corpName} ${name}`}
        subTitle={promotion ? removeHtmlTags(promotion.title) : tags.join(", ")}
      />
      <ul>
        {benefit.map((content, index) => (
          <motion.li
            initial={{ opacity: 0, translateX: -90 }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              delay: index * 0.1,
            }}
          >
            <ListRow
              as="div"
              key={`혜택 ${index + 1}`}
              left={<IconCheck />}
              contents={
                <ListRow.Texts title={`혜택 ${index + 1}`} subTitle={content} />
              }
            />
          </motion.li>
        ))}
      </ul>
      {promotion && (
        <FlexBox direction="column" css={termsContainerStyles}>
          <Text>유의사항</Text>
          <Text>{removeHtmlTags(promotion.terms)}</Text>
        </FlexBox>
      )}
      <FixedBottomButton label="신청하기" onClick={() => {}} />
    </div>
  );
}

function IconCheck() {
  return (
    <svg
      enableBackground="new 0 0 32 32"
      height="20px"
      id="Слой_1"
      version="1.1"
      viewBox="0 0 32 32"
      width="20px"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g id="Check_Circle">
        <path
          d="M16,0C7.163,0,0,7.163,0,16c0,8.837,7.163,16,16,16c8.836,0,16-7.164,16-16C32,7.163,24.836,0,16,0z M16,30   C8.268,30,2,23.732,2,16C2,8.268,8.268,2,16,2s14,6.268,14,14C30,23.732,23.732,30,16,30z"
          fill="#2196f3"
        />
        <path
          d="M23.3,10.393L13.012,20.589l-4.281-4.196c-0.394-0.391-1.034-0.391-1.428,0   c-0.395,0.391-0.395,1.024,0,1.414l4.999,4.899c0.41,0.361,1.023,0.401,1.428,0l10.999-10.899c0.394-0.39,0.394-1.024,0-1.414   C24.334,10.003,23.695,10.003,23.3,10.393z"
          fill="#2196f3"
        />
      </g>
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
    </svg>
  );
}

function removeHtmlTags(input: string): string {
  const regex = /<[^>]*>/g;
  return input.replace(regex, "");
}

const termsContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px;
`;
