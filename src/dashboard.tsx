import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Box, H2, H5, Text } from "@adminjs/design-system";
import { UploadDistributionComponent } from "./uploadDistribution";

const pageHeaderHeight = 284;
const pageHeaderPaddingY = 74;
const pageHeaderPaddingX = 250;

export const DashboardHeader: React.FC = () => {
  return (
    <Box position="relative" overflow="hidden" data-css="default-dashboard">
      <Box
        position="absolute"
        top={50}
        left={-10}
        opacity={[0.2, 0.4, 1]}
        animate>
        {/* <Illustration variant="Rocket" /> */}
      </Box>
      <Box
        position="absolute"
        top={-70}
        right={-15}
        opacity={[0.2, 0.4, 1]}
        animate>
        {/* <Illustration variant="Moon" /> */}
      </Box>
      <Box
        bg="grey100"
        height={pageHeaderHeight}
        py={pageHeaderPaddingY}
        px={["default", "lg", pageHeaderPaddingX]}>
        <Text textAlign="center" color="white">
          <H2>SEIZO.IO ADMIN</H2>
        </Text>
      </Box>
    </Box>
  );
};

const resources: { title: string; path: string }[] = [
  { title: "Team", path: "/resources/Team" },
];

const Card = styled(Box)`
  color: ${({ theme }): string => theme.colors.grey100};
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid black;
  }
`;

Card.defaultProps = {
  variant: "white",
  boxShadow: "card",
};

export const Dashboard: React.FC = () => {
  return (
    <Box>
      <DashboardHeader />
      <Box
        mt={["xl", "xl", "-100px"]}
        mb="xl"
        mx={[0, 0, 0, "auto"]}
        px={["default", "lg", "xxl", "0"]}
        position="relative"
        flex
        flexDirection="row"
        flexWrap="wrap"
        width={[1, 1, 1, 1024]}>
        <section className="dashboardSection">
          <UploadDistributionComponent />
        </section>
        {resources.map((box, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Box key={index} width={[1, 1 / 2, 1 / 2, 1 / 3]} p="lg">
            <Card as="a" href={box.path}>
              <H5 mt="lg">{box.title}</H5>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
