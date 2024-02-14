import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { User } from "../models/user.model";
import { useDispatch } from "react-redux";
import { createUser } from "../features/User/UserSlice";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>(Object);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    // setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createUser(user));

    console.log("submit with data :", user);
    navigate("/users");
  };

  return (
    <Box
      display={"flex"}
      pt={{ base: "50px" }} // alignItems={{ base: "center", md: "" }}
      h="100vh"
      bg="gray.100"
    >
      <Container maxWidth={{ base: "auto", md: "80%" }}>
        <Flex
          flexDirection={["column"]}
          gap={8}
          bg="white"
          fontFamily={"mono"}
          p={4}
          rounded={"md"}
        >
          <Heading fontFamily={"mono"}>Create New User</Heading>
          <form onSubmit={handleSubmit}>
            <Flex flexDirection={"column"} gap={4}>
              <FormControl isRequired>
                <FormLabel>User name</FormLabel>
                <Input
                  name="name"
                  onChange={handleChange}
                  placeholder="waqas"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  onChange={handleChange}
                  placeholder="abc@gmail.com"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Age</FormLabel>
                <Input
                  name="age"
                  onChange={handleChange}
                  type="number"
                  placeholder="23"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Select name="gender" onChange={handleSelectChange}>
                  <option></option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Select>
                <Button mt={4} colorScheme="teal" type="submit">
                  <FaPlus />
                </Button>
              </FormControl>
            </Flex>
          </form>
        </Flex>
      </Container>
    </Box>
  );
};

export default CreateUser;
