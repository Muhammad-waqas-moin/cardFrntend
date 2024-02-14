import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchmembers } from "../features/Membars/GetAllMemebers";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CreateFriend = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };
  const handleSelectChange = (e: any) => {
    setSelectedMember(e.target.value);
  };

  const handleButtonClick = (e: any) => {
    e.preventDefault();
    console.log({
      friend: inputValue,
      member: selectedMember,
      isCarddeliverd: false,
    });
    handleSend();
  };

  const handleSend = () => {
    axios
      .post("http://localhost:5000/api/v1/CreateFriendCard", {
        friendName: `${inputValue}`,
        friendOf: `${selectedMember}`,
        isCarddeliverd: false,
      })
      .then((response) => {
        console.log("Data sent successfully:", response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };
  const getAllMemebers = async () => {
    await dispatch(fetchmembers());
  };

  const data = useSelector((state: any) => state.member.member.data);
  useEffect(() => {
    if (data) {
      setMembers(data);
    }
  }, [data]);

  useEffect(() => {
    getAllMemebers();
  }, [dispatch]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      p="4"
      w="full"
      minH={{ base: "100vh", md: "full" }}
      bg={"gray.200"}
    >
      <Stack w={"full"} rounded={"lg"} bg="white" p={2}>
        <Box
          boxShadow="lg"
          bgGradient="linear(to-r, #67C3F3,#5A98F2)"
          rounded={"lg"}
          color="white"
          mb={4}
        >
          <Text
            p={4}
            fontFamily={"mono"}
            fontSize={"lg"}
            fontWeight={"bold"}
            textAlign={"center"}
          >
            Add New Friend
          </Text>
        </Box>
        <Box>
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
        <Box>
          <FormControl mt="4">
            <FormLabel>FRIEND:</FormLabel>
            <Input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />
          </FormControl>
        </Box>{" "}
        e.preventDafault();
        <Box boxShadow="lg" onClick={handleButtonClick}>
          <Button
            type="submit"
            mt="4"
            bgGradient="linear(to-r, #67C3F3,#5A98F2)"
            color="white"
            _hover={{ bg: "black", color: "white" }}
            w="100%"
          >
            ADD
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default CreateFriend;
