import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchfriends } from "../features/friends/friendsSlice";
import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  HStack,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

const GetAllFriends = () => {
  const [friendsData, setFriendsData] = useState([]);
  const [cardsetails, setCardsDetails] = useState({
    totalcards: 0,
    deliveredcards: 0,
    undeliveredcards: 0,
  });
  const dispatch = useDispatch();

  const frndCardsData = async () => {
    await dispatch(fetchfriends());
  };
  const data = useSelector((state) => state.card.friends.data);

  useEffect(() => {
    let totalcards = 0;
    let deliveredcards = 0;
    let undeliveredcards = 0;

    if (data) {
      for (let index = 0; index < data.length; index++) {
        totalcards++;
        data[index].isCarddeliverd === true
          ? deliveredcards++
          : undeliveredcards++;
      }

      setCardsDetails({
        totalcards: totalcards,
        undeliveredcards: undeliveredcards,
        deliveredcards: deliveredcards,
      });

      setFriendsData(data);
    }
  }, [data]);
  useEffect(() => {
    frndCardsData();
  }, [dispatch]);

  return (
    <Box w={"full"}>
      <Container
        maxW={{ base: "Container.lg" }}
        pt={4}
        pb={4}
        minH={{ base: "100vh", md: "full" }}
        bg="gray.300"
      >
        <Stack>
          <Box>
            <HStack>
              <Text fontSize={"2xl"} fontFamily={"mono"}>
                All Friends
              </Text>
              <Spacer />
              <Box
                boxShadow="lg"
                bgGradient="linear(to-r, #67C3F3,#5A98F2)"
                p={2}
                rounded={"lg"}
              >
                <Text
                  fontFamily={"mono"}
                  fontWeight={"bold"}
                  fontSize={"lg"}
                  color={"white"}
                >{`Cards:${cardsetails.totalcards}`}</Text>
              </Box>
            </HStack>
          </Box>
          <Box>
            <HStack gap={4}>
              <HStack
                boxShadow="lg"
                p={2}
                bg={"gray.100"}
                fontFamily={"mono"}
                fontWeight={"bold"}
                rounded={"lg"}
                fontSize={12}
                justifyContent={"center"}
                alignContent={"center"}
              >
                <Text>Delivered:</Text>
                <Text
                // fontSize={"1.2rem"}
                >{`${cardsetails.deliveredcards}`}</Text>
              </HStack>

              <HStack
                boxShadow="lg"
                p={2}
                bg={"gray.100"}
                fontFamily={"mono"}
                fontWeight={"bold"}
                rounded={"lg"}
                justifyContent={"center"}
                alignContent={"center"}
                fontSize={12}
              >
                <Text>Undelivered:</Text>
                <Text
                  color={"red"}
                  // fontSize={"1.2rem"}
                >{`${cardsetails.undeliveredcards}`}</Text>
              </HStack>
            </HStack>
          </Box>
          <Divider orientation="horizontal" borderColor="blackAlpha.500" />

          {/* <Box w="100%" h="1px" bg="gray.300" /> */}
          {friendsData &&
            friendsData.map((item: any, index) => (
              <Box
                key={index}
                boxShadow="lg"
                p={2}
                fontSize={"lg"}
                fontFamily={"mono"}
                color={"white"}
                bgGradient={`${
                  item?.isCarddeliverd
                    ? "linear(to-r, #67C3F3,#5A98F2)"
                    : "linear(to-r, red.600, red.400)"
                }`}
                rounded={"md"}
              >
                <Stack display={"flex"} direction={["row"]}>
                  <Text>{item.friendName}</Text>
                  <Spacer />
                  <Text>{`${
                    item?.isCarddeliverd ? "Delivered" : "Not Delivered"
                  } `}</Text>
                </Stack>
              </Box>
            ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default GetAllFriends;
