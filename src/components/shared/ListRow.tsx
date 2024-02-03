import FlexBox from "./FlexBox";
import { css } from "@emotion/react";
import Text from "./Text";

interface ListRowProps {
  left?: React.ReactNode;
  contents?: React.ReactNode;
  right?: React.ReactNode;
  withArrow?: boolean;
  onClick?: () => void;
  as?: "div" | "li";
}

const listRowContainerStyles = css`
  padding: 8px 20px;
`;
const listContentLeftStyles = css`
  margin-right: 14px;
`;
const listContentsStyles = css`
  flex: 1;
`;

const ListRow = ({
  left,
  contents,
  right,
  withArrow,
  onClick,
  as = "li",
}: ListRowProps) => {
  return (
    <FlexBox
      as={as}
      css={listRowContainerStyles}
      align="center"
      onClick={onClick}
    >
      {left && <FlexBox css={listContentLeftStyles}>{left}</FlexBox>}
      {contents && <FlexBox css={listContentsStyles}>{contents}</FlexBox>}
      {right && <FlexBox>{right}</FlexBox>}
      {withArrow && <IconArrowRight />}
    </FlexBox>
  );
};

const IconArrowRight = () => {
  return (
    <svg
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
    >
      <title />
      <path d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z" />
    </svg>
  );
};

const ListRowTexts = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <FlexBox direction="column">
      <Text bold={true}>{title}</Text>
      <Text typography="t7">{subTitle}</Text>
    </FlexBox>
  );
};

ListRow.Texts = ListRowTexts;

export default ListRow;
