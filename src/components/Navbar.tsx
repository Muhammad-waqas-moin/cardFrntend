import {
  Box,
  Container,
  Flex,
  HStack,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import MyDrawer from "./common/MyDrawer";
import { NavLink } from "react-router-dom";
const Navbar: React.FC = () => {
  return (
    <Box w={"full"} bg="black">
      <Container maxWidth={{ base: "full", md: "Container.lg" }}>
        <Flex
          pt={4}
          pb={4}
          gap={{ base: 2 }}
          flexDirection={{ base: "row" }}
          alignItems={"center"}
        >
          <HStack gap={16}>
            <NavLink to={"/"}>
              <Box fontSize={"2xl"} boxShadow="lg">
                <Stack
                  direction={["row"]}
                  justifyContent={"center"}
                  fontFamily={"mono"}
                  alignItems={"center"}
                >
                  <i
                    className="fa-duotone fa-cards-blank"
                    style={{ color: "gray" }}
                  ></i>
                  <Text color={"White"}>Cards</Text>
                </Stack>
              </Box>
            </NavLink>
          </HStack>
          <Spacer />
          <Stack direction={["row"]}>
            <Box display={{ base: "block", md: "none" }}>
              <MyDrawer />
            </Box>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
