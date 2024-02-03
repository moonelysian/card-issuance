import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";
import Button from "@shared/Button";
import { colors } from "@styles/colorPalette";

interface FixedBottomButtonProps {
  label: string;
  onClick: () => void;
}

export default function FixedBottomButton({
  label,
  onClick,
}: FixedBottomButtonProps) {
  const $portal = document.getElementById("root-portal");

  if (!$portal) return null;

  return createPortal(
    <Container>
      <Button onClick={onClick} full={true} size="medium" css={buttonStyles}>
        {label}
      </Button>
    </Container>,
    $portal,
  );
}

const slideup = keyframes`
to {
  transform: translateY(0)
  }
`;

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.white};
  padding: 20px 10px;
  transform: translateY(100%);
  animation: ${slideup} 0.5s ease-in-out forwards;
`;

const buttonStyles = css`
  border-radius: 8px;
`;
