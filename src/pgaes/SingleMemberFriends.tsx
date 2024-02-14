import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchmembers } from "../features/Membars/GetAllMemebers";
import {
  Box,
  Container,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Select,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchfriends } from "../features/friends/friendsSlice";

const SingleMemberFriends = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [cardsetails, setCardsDetails] = useState({
    totalcards: 0,
    deliveredcards: 0,
    undeliveredcards: 0,
  });
  let list = [];
  const getAllMemebers = async () => {
    await dispatch(fetchmembers());
  };
  const handleSelectChange = (e: any) => {
    const value = e.target.value;
    setSelectedMember(e.target.value);
    listOfFriends(value);
  };

  const listOfFriends = (value: any) => {
    const friendof = value;
    list = friendData.filter((item: any) => item.friendOf === friendof);
    let totalcards = 0;
    let deliveredcards = 0;
    let undeliveredcards = 0;
    if (list) {
      for (let index = 0; index < list.length; index++) {
        totalcards++;
        list[index].isCarddeliverd === true
          ? deliveredcards++
          : undeliveredcards++;
      }
      console.log(totalcards, deliveredcards, undeliveredcards);
      setCardsDetails({
        totalcards: totalcards,
        undeliveredcards: undeliveredcards,
        deliveredcards: deliveredcards,
      });
      console.log(list);
      setFriendList(list);
    }
  };
  const frndCardsData = async () => {
    await dispatch(fetchfriends());
  };
  const friendData = useSelector((state) => state.card.friends.data);

  const data = useSelector((state) => state.member.member.data);
  useEffect(() => {
    if (data) {
      setMembers(data);
    }
  }, [data]);

  useEffect(() => {
    getAllMemebers();
  }, [dispatch]);
  useEffect(() => {
    frndCardsData();
  }, [dispatch]);

  const handlechange = async (id: any) => {
    setIsLoading(true);
    console.log("item id:", id);

    await axios
      .put(`https://card-backend-phi.vercel.app/api/v1/updateCard/${id}`, {
        isCarddeliverd: true,
      })
      .then((response) => {
        console.log("Update successful:", response.data.data);
        setIsLoading(false);
        updateFrindData(response.data.data);

        // setFriendList((prevList: any) => {
        //   // console.log(item);
        //   return prevList.map((item: any) => {
        //     item._id === response.data.data._id
        //       ? { ...item, isCarddeliverd: true }
        //       : item;
        //   });
        // });
      })
      .catch((error) => {
        console.error("Error updating card:", error);
      });
  };
  const updateFrindData = (updatedData: any) => {
    setFriendList((prev: any) =>
      prev.map((item: any) =>
        item._id === updatedData._id ? { ...item, isCarddeliverd: true } : item
      )
    );
  };

  // console.log("new list :", friendList);

  return (
    <Box p="2" w="full" minH={{ base: "100vh", md: "full" }} bg={"gray.200"}>
      <Container p={2} maxWidth={{ base: "container.lg" }}>
        <Stack>
          <Box>
            <HStack>
              <Text fontSize={"lg"} fontFamily={"monospace"}>
                Friends of:
              </Text>
              <Text
                rounded={"lg"}
                bg={"gray.600"}
                color={"white"}
                p={2}
                boxShadow={"lg"}
                fontFamily={"mono"}
                fontWeight={"bold"}
              >{`${selectedMember == "" ? "None" : selectedMember}`}</Text>

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
                <Text>{`${cardsetails.deliveredcards}`}</Text>
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
                <Text color={"red"}>{`${cardsetails.undeliveredcards}`}</Text>
              </HStack>
            </HStack>
          </Box>
        </Stack>
        <Divider
          mb={4}
          mt={4}
          orientation="horizontal"
          borderColor="blackAlpha.500"
        />
        <Stack bg={"white"} rounded={"lg"} boxShadow="lg" p={2}>
          <Box p={4}>
            <FormControl>
              <FormLabel>FRIEND OF:</FormLabel>
              <Select
                onChange={handleSelectChange}
                value={selectedMember}
                placeholder="Select Memeber"
              >
                {members.map((member: any, index) => (
                  <option key={index} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Stack>
        <Stack mt={4} bg={"white"} rounded={"lg"} boxShadow="lg" p={2}>
          {isloading === true ? (
            "loading...."
          ) : (
            <>
              {friendList.length > 0 ? (
                <Box>
                  {friendList.map((item: any, index) => (
                    <Box
                      key={index}
                      boxShadow="lg"
                      p={2}
                      fontSize={"lg"}
                      fontFamily={"mono"}
                      color={"white"}
                      m={2}
                      bgGradient={`${
                        item?.isCarddeliverd
                          ? "linear(to-r, #67C3F3,#5A98F2)"
                          : "linear(to-r, red.600, red.400)"
                      }`}
                      rounded={"md"}
                    >
                      <Stack
                        display={"flex"}
                        alignItems={"center"}
                        direction={["row"]}
                      >
                        <Text>{item.friendName}</Text>
                        <Spacer />
                        <Box rounded={"lg"} cursor={"pointer"} p={2}>
                          {item.isCarddeliverd ? (
                            <Box
                              _hover={{
                                transform: "scale(1.5)",
                                transition: "0.3s",
                              }}
                            >
                              <i className="fa-duotone fa-circle-check"></i>
                            </Box>
                          ) : (
                            <Box
                              _hover={{
                                transform: "scale(1.5)",
                                transition: "0.3s",
                              }}
                              onClick={() => handlechange(item._id)}
                            >
                              <i className="fa-duotone fa-envelope"></i>
                            </Box>
                          )}
                        </Box>
                      </Stack>
                    </Box>
                  ))}
                </Box>
              ) : (
                <VStack
                  display={"flex"}
                  justifyContent={"center"}
                  bg={"gray.100"}
                  p={8}
                >
                  <Box fontSize={"40"}>
                    <i className="fa-duotone fa-face-worried"></i>
                  </Box>
                  <Text fontFamily={"mono"} fontWeight={"bold"}>
                    No friends yet
                  </Text>
                </VStack>
              )}
            </>
          )}

          {/* {friendList.length > 0 ? (
            <Box>
              {friendList.map((item: any, index) => (
                <Box
                  key={index}
                  boxShadow="lg"
                  p={2}
                  fontSize={"lg"}
                  fontFamily={"mono"}
                  color={"white"}
                  m={2}
                  bgGradient={`${
                    item?.isCarddeliverd
                      ? "linear(to-r, #67C3F3,#5A98F2)"
                      : "linear(to-r, red.600, red.400)"
                  }`}
                  rounded={"md"}
                >
                  <Stack
                    display={"flex"}
                    alignItems={"center"}
                    direction={["row"]}
                  >
                    <Text>{item.friendName}</Text>
                    <Spacer />
                    <Box rounded={"lg"} cursor={"pointer"} p={2}>
                      {item.isCarddeliverd ? (
                        <Box
                          _hover={{
                            transform: "scale(1.5)",
                            transition: "0.3s",
                          }}
                        >
                          <i className="fa-duotone fa-circle-check"></i>
                        </Box>
                      ) : (
                        <Box
                          _hover={{
                            transform: "scale(1.5)",
                            transition: "0.3s",
                          }}
                          onClick={() => handlechange(item._id)}
                        >
                          <i className="fa-duotone fa-envelope"></i>
                        </Box>
                      )}
                    </Box>
                  </Stack>
                </Box>
              ))}
            </Box>
          ) : (
            <VStack
              display={"flex"}
              justifyContent={"center"}
              bg={"gray.100"}
              p={8}
            >
              <Box fontSize={"40"}>
                <i className="fa-duotone fa-face-worried"></i>
              </Box>
              <Text fontFamily={"mono"} fontWeight={"bold"}>
                No friends yet
              </Text>
            </VStack>
          )} */}
        </Stack>
      </Container>
    </Box>
  );
};

export default SingleMemberFriends;
