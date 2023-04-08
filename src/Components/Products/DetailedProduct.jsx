import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Footer from '../Footer/Footer'
import { useParams } from "react-router-dom";
import {
  Grid,
  GridItem,
  Box,
  Heading,
  Text,
  Progress,
  Stack,
  SkeletonText,
  Button,
  Badge,
  SkeletonCircle,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { GiSelfLove } from "react-icons/gi";
import { ContextProvider } from "../../context/ContextAPI";
const DetailedProduct = () => {
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
    cxtData.addToCart(product);
  };

  return (
    <>
    <div className="container mt-3">
      <div className="row">
        <div className="row-col-12">
          <>
            {load ? (
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
                      noOfLines={14}
                      spacing="4"
                      skeletonHeight="3"
                    />
                  </Box>
                </GridItem>
                <GridItem>
                  <Box padding="6" boxShadow="lg" bg="white">
                    <SkeletonCircle size="10" />
                    <SkeletonText
                      mt="4"
                      noOfLines={14}
                      spacing="4"
                      skeletonHeight="3"
                    />
                  </Box>
                </GridItem>
              </Grid>
            ) : (
              <Box>
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
                  </GridItem>
                  <GridItem p={5}>
                    <Box>
                      <Heading>{product?.title.toUpperCase()}</Heading>
                      <Text color="gray.600">Brand: {product?.brand}</Text>
                      <Text color="gray.600">
                        Category: {product?.category.toUpperCase()}
                      </Text>

                      <Text fontSize="20px" color="black.200">
                        Price: ${product?.price}
                      </Text>
                      <Text fontSize="20px" color="black.200">
                        Discount Percentage:{" "}
                        <Badge
                          ml="1"
                          fontSize="0.8em"
                          colorScheme="green"
                          color={"blackAlpha.900"}
                        >
                          {product?.discountPercentage}%
                        </Badge>
                      </Text>
                      <Text fontSize="20px" color="black.200">
                        Rating: {product?.rating}/5
                      </Text>

                      <Progress
                        hasStripe
                        value={product?.rating * 20}
                        size="md"
                        colorScheme="green"
                      />
                      <Text mt={4} fontSize="20px" color="blue.500">
                        <Badge
                          ml="1"
                          fontSize="0.8em"
                          colorScheme="red"
                          color={"blackAlpha.700"}
                        >
                          Description
                        </Badge>
                        &nbsp;:{product?.description}
                      </Text>
                      <Stack direction="row" spacing={4}>
                        <Button
                          leftIcon={<AddIcon />}
                          colorScheme="teal"
                          variant="solid"
                          onClick={() => addItem(product)}
                        >
                          Add to Cart
                        </Button>
                        <Button colorScheme="teal" variant="solid">
                          <GiSelfLove />
                        </Button>
                      </Stack>
                    </Box>
                  </GridItem>
                </Grid>
              </Box>
            )}
          </>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default DetailedProduct;
