import styled from "@emotion/styled";
import { colors, Colors } from "@styles/colorPalette";
import { Typography, typographyMap } from "@styles/typography";
import { CSSProperties } from "react";

interface TextProps {
  typography?: Typography;
  color?: Colors;
  display?: CSSProperties["display"];
  textAligh?: CSSProperties["textAlign"];
  fontWeight?: CSSProperties["fontWeight"];
  bold?: boolean;
}

const Text = styled.span<TextProps>(
  ({ color = "black", display, textAligh, fontWeight, bold }) => ({
    color: colors[color],
    display,
    textAligh,
    fontWeight: bold ? "bold" : fontWeight,
  }),
  ({ typography = "t5" }) => typographyMap[typography],
);

export default Text;
