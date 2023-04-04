import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: async(values) => {
     
      try {
        const register=await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password,
          // values.firstName,
          // values.lastName
        )
        console.log(register);
        console.log(values);
      } catch (error) {
        console.log(error.message);
      }
    },
    validationSchema: yup.object({
      firstName: yup
        .string()
        .required("First Name required")
        .min(3, "To Small"),
      lastName: yup.string().required("Last Name required").min(3, "To Small"),
      email: yup.string("Email requierd").email("Enter Valid Email").required(),
      password: yup.string().required("Password required").min(10, "Too Small"),
    }),
  });

  return (
    <Flex
      minH={"92vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <form autoComplete="off" onSubmit={formik.handleSubmit}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl
                    id="firstName"
                     isInvalid={formik.errors.firstName}
                  >
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      variant="filled"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                    />
                    <>
                      {" "}
                      {formik.errors.firstName ? (
                        <FormErrorMessage>
                          {formik.errors.firstName}
                        </FormErrorMessage>
                      ) : (
                        ""
                      )}
                    </>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isInvalid={formik.errors.lastName}>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      variant="filled"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.lastName ? (
                      <FormErrorMessage>
                        {formik.errors.lastName}
                      </FormErrorMessage>
                    ) : (
                      ""
                    )}
                  </FormControl>
                </Box>
              </HStack>
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
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={1}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link color={"blue.400"}>
                    <NavLink to={"/sign-in"}>Login</NavLink>
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
};

export default Register;
