import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getAdBanners } from "@remote/adBanner";
import Text from "@shared/Text";
import FlexBox from "@shared/FlexBox";
import { colors } from "@styles/colorPalette";

import { Swiper, SwiperSlide } from "swiper/react";

export default function AdBanners() {
  const { data: adBanners } = useQuery("banners", getAdBanners);

  return (
    <Container>
      <Swiper spaceBetween={8}>
        {adBanners?.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Link to={banner.link}>
              <FlexBox direction="column" css={BannerContainerCss}>
                <Text bold={true}>{banner.title}</Text>
                <Text typography="t7">{banner.description}</Text>
              </FlexBox>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}

const Container = styled.div`
  padding: 24px;
`;

const BannerContainerCss = css`
  padding: 16px;
  background-color: ${colors.grey};
  border-radius: 4px;
`;
