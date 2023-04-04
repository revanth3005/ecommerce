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
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
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
  return (
    <Flex
      minH={"92vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
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
                    {" "}
                    <NavLink to={"/sign-up"}>Signup</NavLink>
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

export default Login;
