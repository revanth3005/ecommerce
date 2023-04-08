import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
} from "@chakra-ui/react";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from "react-icons/md";
import { BsGithub, BsDiscord, BsPerson } from "react-icons/bs";
import axios from "axios";
import { useContext, useState } from "react";
import MessageModal from "../Modal/MessageModal";
import { ContextProvider } from "../../context/ContextAPI";
import { useNavigate } from "react-router-dom";

let msg;
let head;
const Contact = () => {
  const navigate = useNavigate();
  const cxtData = useContext(ContextProvider);
  const [user, setUser] = useState({
    name: cxtData.userName.name || "",
    mail: cxtData.userName.email || "",
    message: "",
  });
  const [modal, setModal] = useState();
  const onChangeHandler = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await axios.post(
        "https://ecommerce-d7a8d-default-rtdb.asia-southeast1.firebasedatabase.app/feedback.json",
        JSON.stringify({
          user: user,
        }),
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      console.log(userResponse);
      if (userResponse.statusText === "OK") {
        console.log(user);
        msg =
          "Thanks for your feedback/Report, Customer care will react out soon...";
        head = "Feedback/Report ";
        setModal(true);
        setUser({
          name: "",
          mail: "",
          message: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getState = (state) => {
    setModal(state);
  };
  return (
    <Container
      bg="#9DC4FB"
      maxW="full"
      mt={0}
      centerContent
      justifyContent={"center"}
      alignItems={"center"}
      overflow="hidden"
      h={{ lg: "91vh" }}
    >
      <Flex>
        <Box
          bg="#02054B"
          color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
        >
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Heading>Contact</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                    Fill up the form below to contact
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <VStack pl={0} spacing={3} alignItems="flex-start">
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: "2px solid #1C6FEB" }}
                        leftIcon={<MdPhone color="#1970F1" size="20px" />}
                      >
                        +91-9xxxxxxxx1
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: "2px solid #1C6FEB" }}
                        leftIcon={<MdEmail color="#1970F1" size="20px" />}
                      >
                        revanthxxx@gmail.com
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: "2px solid #1C6FEB" }}
                        leftIcon={<MdLocationOn color="#1970F1" size="20px" />}
                      >
                        Kalluru,Khammam <br /> India
                      </Button>
                    </VStack>
                  </Box>
                  <HStack
                    mt={{ lg: 10, md: 10 }}
                    spacing={5}
                    px={5}
                    alignItems="flex-start"
                  >
                    <IconButton
                      aria-label="facebook"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: "#0D74FF" }}
                      icon={<MdFacebook size="28px" />}
                    />
                    <IconButton
                      aria-label="github"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: "#0D74FF" }}
                      icon={<BsGithub size="28px" />}
                    />
                    <IconButton
                      aria-label="discord"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: "#0D74FF" }}
                      icon={<BsDiscord size="28px" />}
                    />
                  </HStack>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg="white" borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <form onSubmit={onSubmitForm}>
                      <VStack spacing={5}>
                        <FormControl id="name">
                          <FormLabel>Your Name</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                              pointerEvents="none"
                              children={<BsPerson color="gray.800" />}
                            />
                            <Input
                              required
                              type="text"
                              size="md"
                              onChange={onChangeHandler}
                              value={user.name}
                              name="name"
                            />
                          </InputGroup>
                        </FormControl>
                        <FormControl id="name">
                          <FormLabel>Mail</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                              pointerEvents="none"
                              children={<MdOutlineEmail color="gray.800" />}
                            />
                            <Input
                              required
                              type="email"
                              size="md"
                              value={user.mail}
                              name="mail"
                              onChange={onChangeHandler}
                            />
                          </InputGroup>
                        </FormControl>
                        <FormControl id="name">
                          <FormLabel>Message</FormLabel>
                          <Textarea
                            required
                            onChange={onChangeHandler}
                            value={user.message}
                            name="message"
                            borderColor="gray.300"
                            _hover={{
                              borderRadius: "gray.300",
                            }}
                            placeholder="message"
                          />
                        </FormControl>
                        <FormControl id="name" float="right">
                          <Button
                            type="submit"
                            variant="solid"
                            bg="#0D74FF"
                            color="white"
                            _hover={{}}
                          >
                            Send Message
                          </Button>
                        </FormControl>
                      </VStack>
                    </form>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
      {modal && (
        <MessageModal getState={getState} message={msg} header={head} />
      )}
    </Container>
  );
};

export default Contact;
