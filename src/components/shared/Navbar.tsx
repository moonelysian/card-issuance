import { css } from "@emotion/react";
import { Link, useLocation } from "react-router-dom";

import { useCallback } from "react";

import { colors } from "@styles/colorPalette";
import Flex from "@shared/FlexBox";
import Button from "@shared/Button";

function Navbar() {
  const location = useLocation();
  const showSignButton =
    ["/signup", "/signin"].includes(location.pathname) === false;

  const renderButton = useCallback(() => {
    if (showSignButton) {
      return (
        <Link to="/signup">
          <Button>로그인/회원가입</Button>
        </Link>
      );
    }

    return null;
  }, [showSignButton]);

  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to="/">홈</Link>
      {renderButton()}
    </Flex>
  );
}

const navbarContainerStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.grey};
`;

export default Navbar;
