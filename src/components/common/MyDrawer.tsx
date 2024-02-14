import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { FaBars, FaUserTie, FaUsers } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";

const MyDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const navigate = useNavigate();
  return (
    <>
      <Button
        ref={btnRef}
        bg="black"
        _hover={{
          transform: "scale(1.1)", // Apply scale transformation on hover
          transition: "transform 0.5s ease",
          bgGradient: "linear(to-r, #67C3F3,#5A98F2)",
        }}
        color="white"
        onClick={onOpen}
      >
        <FaBars />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton
            bg="gray.200"
            mt="2"
            _hover={{ bg: "red", color: "white" }}
          />
          <DrawerHeader bg="black">
            {" "}
            <NavLink to={"/"}>
              <Box
                justifyContent={{ base: "center", md: "flex-start" }}
                fontSize={"2xl"}
                fontFamily={"mono"}
                onClick={onClose}
              >
                <i
                  className="fa-duotone fa-cards-blank"
                  style={{ color: "#5A98F2" }}
                ></i>
              </Box>
            </NavLink>
          </DrawerHeader>
          <Divider orientation="horizontal" borderColor="blackAlpha.500" />
          <DrawerBody>
            <Box>
              <Stack fontFamily={"mono"}>
                <NavLink to={"/create"}>
                  <Button
                    leftIcon={<IoPersonAdd />}
                    bgGradient="linear(to-r, #67C3F3,#5A98F2)"
                    variant="solid"
                    color={"white"}
                    _hover={{
                      bg: "linear(to-r, #67C3F3,#5A98F2)",
                    }}
                    onClick={onClose}
                  >
                    ADD FRIEND
                  </Button>
                </NavLink>
                <NavLink to="/friends">
                  <Button
                    leftIcon={<FaUsers />}
                    bgGradient="linear(to-r, #67C3F3,#5A98F2)"
                    variant="solid"
                    color={"white"}
                    _hover={{
                      bg: "linear(to-r, #67C3F3,#5A98F2)",
                    }}
                    onClick={onClose}
                  >
                    Get All FRIENDS
                  </Button>
                </NavLink>
                <NavLink to="/singleMemberFriends">
                  <Button
                    leftIcon={<FaUserTie />}
                    bgGradient="linear(to-r, #67C3F3,#5A98F2)"
                    variant="solid"
                    color={"white"}
                    _hover={{
                      bg: "linear(to-r, #67C3F3,#5A98F2)",
                    }}
                    onClick={onClose}
                  >
                    Get Your Friend
                  </Button>
                </NavLink>
              </Stack>
            </Box>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MyDrawer;
