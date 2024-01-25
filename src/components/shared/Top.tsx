import { css } from "@emotion/react";
import FlexBox from "./FlexBox";
import Text from "./Text";

interface TopProps {
  title: string;
  subTitle: string;
}

export default function Top({ title, subTitle }: TopProps) {
  return (
    <FlexBox direction="column" css={containerStyles}>
      <Text bold={true} typography="t4">
        {title}
      </Text>
      <Text typography="t7">{subTitle}</Text>
    </FlexBox>
  );
}

const containerStyles = css`
  padding: 24px;
`;
