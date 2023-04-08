import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { auth } from "../../../firebase/firebaseConfig";
import { ContextProvider } from "../../../context/ContextAPI";
import MessageModal from "../../Modal/MessageModal";

let successMsg = "";
let successHead = "";
let failureMsg = "";
let failureHead = "";
const Login = () => {
  const cxtData = useContext(ContextProvider);
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const [displayMsg, setDisplayMsg] = useState("");
  const [failureModal, setFailureModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        const login = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        console.log(login);
        cxtData.setLogState(true);
        successHead = "User Login Successful...";
        successMsg = "You have Login Successfully... Enjoy your Shopping...";
        setSuccessModal(true);
        const name = values.email.split("@");
        cxtData.setUserName({
          name: name[0],
          email: values.email,
        });
        setTimeout(() => {
          navigate("/products");
        }, [1000]);
      } catch (error) {
        console.log(error.message);
        failureHead = "Login Failed..";
        failureMsg = error.message;
        setFailureModal(true);
      }
    },
    validationSchema: yup.object({
      email: yup
        .string("Enter Mail")
        .required("Mail required")
        .email("Enter Valid Email"),
      password: yup
        .string("Password required")
        .min(10, "Enter Full Password")
        .required("Password required"),
    }),
  });
  const getState = (state) => {
    setFailureModal(state);
    setSuccessModal(state);
  };
  return (
    <Flex
      minH={"92vh"}
      align={"center"}
      justify={"center"}
      bgGradient="linear(19deg, #EE74E1 0%, #3EECAC 100%,#EE74E1)"
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading color={"whiteAlpha.900"} fontSize={"4xl"}>
            Sign in to your account
          </Heading>
          <Text color={"whiteAlpha.900"} fontSize={"lg"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        {/* we can keep form here=== */}
        <form autoComplete="off" onSubmit={formik.handleSubmit}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email" isInvalid={formik.errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  variant="filled"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors.email ? (
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                ) : (
                  ""
                )}
              </FormControl>
              <FormControl id="password" isInvalid={formik.errors.password}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    variant="filled"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {formik.errors.password ? (
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                ) : (
                  ""
                )}
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
                <Text align={"center"}>
                  New user?{" "}
                  <Link color={"blue.400"}>
                    <NavLink to={"/sign-up"}>Signup</NavLink>
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </form>
        {successModal && (
          <MessageModal
            getState={getState}
            message={successMsg}
            header={successHead}
          />
        )}
        {failureModal && (
          <MessageModal
            getState={getState}
            message={failureMsg}
            header={failureHead}
          />
        )}
      </Stack>
    </Flex>
  );
};

export default Login;
