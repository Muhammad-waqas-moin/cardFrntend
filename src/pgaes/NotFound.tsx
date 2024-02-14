import { Box, Flex, Heading } from "@chakra-ui/react";
import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";

const NotFound = () => {
  return (
    <Box h={"100vh"} maxWidth={"full"} bg={"gray.100"} p={2} pt={0}>
      <Flex
        h={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
        bg={"white"}
      >
        <Player
          autoplay
          loop
          src="https://lottie.host/fd937025-b234-497e-89c5-a56de80da3f7/9s2UWPqAeu.json"
        />
        {/* <Heading>Errr</Heading> */}
      </Flex>
    </Box>
  );
};

export default NotFound;
