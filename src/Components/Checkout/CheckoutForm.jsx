import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  Button,
  Heading,
  SimpleGrid,
  Grid,
  GridItem,
  SkeletonCircle,
  SkeletonText,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import Footer from "../Footer/Footer";
import { ContextProvider } from "../../context/ContextAPI";
import { MdLocalShipping } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./checkout.css";
import axios from "axios";

const CheckoutForm = () => {
  const [load, setload] = useState(false);
  let patternMobile = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i
  );
  const cxtData = useContext(ContextProvider);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: cxtData.userName.name,
      email: cxtData.userName.email,
      phone: "",
      address: "",
      area: "",
      street: "",
      state: "",
      pincode: "",
      orderDetails: "",
    },
    onSubmit: async (values) => {
      formik.values.orderDetails = cxtData.checkout;
      console.log(values);
      try {
        const userResponse = await axios.post(
          "https://ecommerce-d7a8d-default-rtdb.asia-southeast1.firebasedatabase.app/checkoutUserOrders.json",
          JSON.stringify({
            user: formik.values,
          }),
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
        console.log(userResponse);
        if (userResponse.statusText === "OK") {
          //setDisplayModal(true);
        }
      } catch (error) {
        console.log(error);
      }
      cxtData.setCheckoutUserDetails({ values });
      navigate("/payment");
    },
    validationSchema: yup.object({
      name: yup.string("Enter Name").required("Name is required"),
      email: yup
        .string("Enter Mail")
        .required("Mail required")
        .email("Enter Valid Email"),
      phone: yup
        .string()
        .required("Phone Number required")
        .matches(patternMobile, "Phone number is not valid")
        .min(10, "Enter a valid Number")
        .max(10, "Enter a valid Number"),
      address: yup.string().required("Address required"),
      area: yup.string().required("Area required"),
      street: yup.string().required("Street required"),
      state: yup.string().required("State required"),
      pincode: yup
        .string()
        .required("Pincode is required")
        .matches(patternMobile, "Pincode is not valid")
        .min(6, "Enter a valid Pincode Number")
        .max(6, "Enter a valid Pincode Number"),
    }),
  });

  return (
    <>
      {load ? (
        <div className="container">
          <div className="row">
            <div className="col-md-12 mt-4">
              <Grid
                mt={{ sm: "30px" }}
                templateRows={{
                  sm: "repeat(1, 1fr)",
                  md: "repeat(1, 1fr)",
                  lg: "repeat(1, 1fr)",
                }}
                templateColumns={{
                  sm: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(2, 1fr)",
                }}
                gap={6}
              >
                <GridItem>
                  <Box padding="6" boxShadow="lg" bg="white">
                    <SkeletonCircle size="10" />
                    <SkeletonText
                      mt="4"
                      noOfLines={20}
                      spacing="4"
                      skeletonHeight="4"
                    />
                  </Box>
                </GridItem>
                <GridItem>
                  <Box padding="6" boxShadow="lg" bg="white">
                    <SkeletonCircle size="10" />
                    <SkeletonText
                      mt="4"
                      noOfLines={20}
                      spacing="4"
                      skeletonHeight="4"
                    />
                  </Box>
                </GridItem>
              </Grid>
            </div>
          </div>
        </div>
      ) : (
        <Container marginTop={{ lg: "-60px", sm: "10px" }} maxW={"7xl"}>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}
          >
            <Flex>
              <Box
                rounded={"md"}
                alt={"product image"}
                fit={"contain"}
                align={"center"}
                w={"100%"}
                h={{ base: "100%", sm: "400px", lg: "500px" }}
              >
                <Image src={cxtData.checkout.thumbnail} />
                <Box as={"header"}>
                  <Heading
                    lineHeight={1.1}
                    fontWeight={600}
                    fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                  >
                    {cxtData.checkout.title?.toUpperCase()}
                  </Heading>
                  <Text color={"gray.900"} fontWeight={300} fontSize={"2xl"}>
                    ${cxtData.checkout.price}.00 USD
                  </Text>
                  <Text color={"gray.900"} fontWeight={300} fontSize={"2xl"}>
                    Quantity: {cxtData.checkout.quantity}
                  </Text>
                  <Text color={"gray.900"} fontWeight={500} fontSize={"2xl"}>
                    Total: ${cxtData.checkout.quantity * cxtData.checkout.price}
                  </Text>
                </Box>
              </Box>
            </Flex>
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <Stack spacing={{ base: 6, md: 10 }}>
                <Box as={"header"}>
                  <Heading>Address</Heading>

                  <FormControl isInvalid={formik.errors.name}>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="text"
                      name="name"
                      variant="filled"
                      value={formik.values.name.toUpperCase()}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.name ? (
                      <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                    ) : (
                      ""
                    )}
                  </FormControl>
                  <FormControl isInvalid={formik.errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      name="email"
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
                  <FormControl isInvalid={formik.errors.phone}>
                    <FormLabel>Phone</FormLabel>
                    <Input
                      type="text"
                      name="phone"
                      variant="filled"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.phone ? (
                      <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
                    ) : (
                      ""
                    )}
                  </FormControl>
                  <FormControl isInvalid={formik.errors.address}>
                    <FormLabel>Address</FormLabel>
                    <Input
                      type="text"
                      name="address"
                      variant="filled"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.address ? (
                      <FormErrorMessage>
                        {formik.errors.address}
                      </FormErrorMessage>
                    ) : (
                      ""
                    )}
                  </FormControl>
                  <FormControl isInvalid={formik.errors.area}>
                    <FormLabel>Area</FormLabel>
                    <Input
                      type="text"
                      name="area"
                      variant="filled"
                      value={formik.values.area}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.area ? (
                      <FormErrorMessage>{formik.errors.area}</FormErrorMessage>
                    ) : (
                      ""
                    )}
                  </FormControl>
                  <FormControl isInvalid={formik.errors.street}>
                    <FormLabel>Street</FormLabel>
                    <Input
                      type="text"
                      name="street"
                      variant="filled"
                      value={formik.values.street}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.street ? (
                      <FormErrorMessage>
                        {formik.errors.street}
                      </FormErrorMessage>
                    ) : (
                      ""
                    )}
                  </FormControl>
                  <FormControl isInvalid={formik.errors.state}>
                    <FormLabel>State</FormLabel>
                    <Input
                      type="text"
                      name="state"
                      variant="filled"
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      list="datalistOptions"
                      id="exampleDataList"
                      autocomplete="off"
                      className="input"
                    />
                    <datalist id="datalistOptions">
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Arunachal Pradesh">
                        Arunachal Pradesh
                      </option>
                      <option value="Assam">Assam</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chattisgarh">Chattisgarh</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Harayana">Harayana</option>
                      <option value="Himichal Pradesh">Himichal Pradesh</option>
                      <option value="Jarkhand">Jarkhand</option>
                      <option value="Karanata">Karanata</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Tamil Nadu<">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh<">Uttar Pradesh</option>
                      <option value="Uttrakhand">Uttrakhand</option>
                      <option value="West Bengal">West Bengal</option>
                    </datalist>
                    {formik.errors.state ? (
                      <FormErrorMessage>{formik.errors.state}</FormErrorMessage>
                    ) : (
                      ""
                    )}
                  </FormControl>
                  <FormControl isInvalid={formik.errors.pincode}>
                    <FormLabel>Pincode</FormLabel>
                    <Input
                      type="text"
                      variant="filled"
                      name="pincode"
                      value={formik.values.pincode}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.pincode ? (
                      <FormErrorMessage>
                        {formik.errors.pincode}
                      </FormErrorMessage>
                    ) : (
                      ""
                    )}
                  </FormControl>
                </Box>

                <Button
                  type="submit"
                  rounded={"none"}
                  w={"full"}
                  mt={8}
                  size={"lg"}
                  py={"7"}
                  bg="gray.900"
                  color="white"
                  textTransform={"uppercase"}
                  _hover={{
                    transform: "translateY(2px)",
                    boxShadow: "lg",
                  }}
                >
                  Buy
                </Button>
              </Stack>
            </form>
          </SimpleGrid>
        </Container>
      )}
      <Footer />
    </>
  );
};

export default CheckoutForm;
