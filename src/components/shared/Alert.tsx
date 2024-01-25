import { colors } from "@/styles/colorPalette";
import styled from "@emotion/styled";
import Button from "./Button";
import Dimmed from "./Dimmed";
import FlexBox from "./FlexBox";
import Text from "./Text";

interface AlertProps {
  open?: boolean;
  title: React.ReactNode;
  description?: React.ReactNode;
  buttonLable?: string;
  onButtonClick: () => void;
}

export default function Alert({
  open,
  title,
  description,
  buttonLable = "확인",
  onButtonClick,
}: AlertProps) {
  if (!open) return null;

  return (
    <Dimmed>
      <AlertContainer>
        <Text
          typography="t4"
          bold={true}
          display="block"
          style={{ marginBottom: 6 }}
        >
          {title}
        </Text>
        {description && <Text typography="t7">{description}</Text>}
        <FlexBox justify="flex-end">
          <Button onClick={onButtonClick} style={{ border: "none" }}>
            {buttonLable}
          </Button>
        </FlexBox>
      </AlertContainer>
    </Dimmed>
  );
}

const AlertContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: ${colors.white};
  overflow: hidden;
  z-index: var(--alert-zindex);
  width: 320px;
  padding: 24px;
  box-sizing: border-box;
`;
