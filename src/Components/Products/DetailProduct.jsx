import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  Grid,
  GridItem,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { ContextProvider } from "../../context/ContextAPI";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import "./Detail.css";

const DetailProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [load, setLoad] = useState(false);

  const cxtData = useContext(ContextProvider);

  useEffect(() => {
    setLoad(true);
    let timer;
    const fetchProduct = async () => {
      try {
        const productResponse = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        console.log(productResponse.data);
        timer = setTimeout(() => {
          setProduct(productResponse.data);
          setLoad(false);
        }, [1000]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
    return () => clearTimeout(timer);
  }, [id]);

  const addItem = (product) => {
    if (cxtData.logState) {
      cxtData.addToCart(product);
    } else {
      navigate("/sign-in");
    }
  };
  return (
    <>
      {load ? (
        <div className="container">
          <div className="row">
            <div className="col-md-12 mt-4">
              <Grid
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
        <Container marginTop={{lg:"-60px",sm:"25"}} maxW={"7xl"}>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}
          >
            <Flex>
              <Box
                rounded={"md"}
                alt={"product image"}
                src={product?.thumbnail}
                fit={"contain"}
                align={"center"}
                w={"100%"}
                h={{ base: "100%", sm: "400px", lg: "500px" }}
              >
                <div id="carouselExample" class="carousel slide">
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img
                        src={product?.images[0]}
                        class="d-block w-100"
                        alt="..."
                      />
                    </div>
                    <div class="carousel-item">
                      <img
                        src={product?.images[1]}
                        class="d-block w-100"
                        alt="..."
                      />
                    </div>
                    <div class="carousel-item">
                      <img
                        src={product?.images[2]}
                        class="d-block w-100"
                        alt="..."
                      />
                    </div>
                  </div>
                  <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="prev"
                  >
                    <span
                      class="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="next"
                  >
                    <span
                      class="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </Box>
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={"header"}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                >
                  {product?.title}
                </Heading>
                <Text color={"gray.900"} fontWeight={300} fontSize={"2xl"}>
                  ${product?.price}.00 USD
                </Text>
              </Box>

              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={"column"}
                divider={<StackDivider borderColor={"gray.200"} />}
              >
                <VStack spacing={{ base: 4, sm: 6 }}>
                  <Text color={"gray.500"} fontSize={"2xl"} fontWeight={"300"}>
                    {product?.description}
                  </Text>
                  <Text fontSize={"lg"}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                    aliquid amet at delectus doloribus dolorum expedita hic,
                    ipsum maxime modi nam officiis porro, quae, quisquam quos
                    reprehenderit velit? Natus, totam.
                  </Text>
                </VStack>
                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={"yellow.400"}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Features
                  </Text>

                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <List spacing={2}>
                      <ListItem>Chronograph</ListItem>
                      <ListItem>Master Chronometer Certified</ListItem>{" "}
                      <ListItem>Tachymeter</ListItem>
                    </List>
                    <List spacing={2}>
                      <ListItem>Anti‑magnetic</ListItem>
                      <ListItem>Chronometer</ListItem>
                      <ListItem>Small seconds</ListItem>
                    </List>
                  </SimpleGrid>
                </Box>
                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color="yellow.400"
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Product Details
                  </Text>

                  <List spacing={2}>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Between lugs:
                      </Text>{" "}
                      20 mm
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Bracelet:
                      </Text>{" "}
                      leather strap
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Case:
                      </Text>{" "}
                      Steel
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Case diameter:
                      </Text>{" "}
                      42 mm
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Dial color:
                      </Text>{" "}
                      Black
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Crystal:
                      </Text>{" "}
                      Domed, scratch‑resistant sapphire crystal with
                      anti‑reflective treatment inside
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Water resistance:
                      </Text>{" "}
                      5 bar (50 metres / 167 feet){" "}
                    </ListItem>
                  </List>
                </Box>
              </Stack>

              <Button
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
                onClick={() => addItem(product)}
              >
                Add to cart
              </Button>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent={"center"}
              >
                <MdLocalShipping />
                <Text>2-3 business days delivery</Text>
              </Stack>
            </Stack>
          </SimpleGrid>
        </Container>
      )}
      <Footer />
    </>
  );
};

export default DetailProduct;
