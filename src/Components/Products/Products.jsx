import React, { useContext, useEffect, useState } from "react";
import "./Product.css";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Input,
  Grid,
  GridItem,
  Center,
  Button,
  Badge,
  Stack,
} from "@chakra-ui/react";
import { FiHome, FiMenu } from "react-icons/fi";
import { FaProductHunt } from "react-icons/fa";
import { ContextProvider } from "../../context/ContextAPI";
import LoadingSkeleton from "./LoadingSkeleton";
import { NavLink, useNavigate } from "react-router-dom";
import { RxMobile } from "react-icons/rx";
import {
  BsLaptop,
  BsLightbulb,
  BsFillHandbagFill,
  BsSunglasses,
} from "react-icons/bs";
import { TbPerfume } from "react-icons/tb";
import { MdHealthAndSafety } from "react-icons/md";
import { BiStoreAlt, BiChip } from "react-icons/bi";
import {
  GiDress,
  GiConverseShoe,
  GiSonicShoes,
  GiJewelCrown,
  GiSelfLove,
} from "react-icons/gi";
import { GoWatch } from "react-icons/go";
import { RiShirtLine, RiEBike2Line } from "react-icons/ri";
import Footer from "../Footer/Footer";
import { AddIcon } from "@chakra-ui/icons";

const LinkItems = [
  { name: "All", icon: FaProductHunt, type: "All" },
  { name: "Mobile", icon: RxMobile, type: "smartphones" },
  { name: "Laptops", icon: BsLaptop, type: "laptops" },
  { name: "Fragrances", icon: TbPerfume, type: "fragrances" },
  { name: "Skincare", icon: MdHealthAndSafety, type: "skincare" },
  { name: "Groceries", icon: BiStoreAlt, type: "groceries" },
  { name: "Home Decoration", icon: FiHome, type: "home-decoration" },
  { name: "Furniture", icon: FiHome, type: "furniture" },
  { name: "Womens Dresses", icon: GiDress, type: "womens-dresses" },
  { name: "Womens Shoes", icon: GiSonicShoes, type: "womens-shoes" },
  { name: "Womens Watches", icon: GoWatch, type: "womens-watches" },
  { name: "Womens Bags", icon: BsFillHandbagFill, type: "womens-bags" },
  { name: "Womens Jewellery", icon: GiJewelCrown, type: "womens-jewellery" },
  { name: "Mens Shirts", icon: RiShirtLine, type: "mens-shirts" },
  { name: "Mens Shoes", icon: GiConverseShoe, type: "mens-shoes" },
  { name: "Mens Watches", icon: GoWatch, type: "mens-watches" },
  { name: "Sunglasses", icon: BsSunglasses, type: "sunglasses" },
  { name: "Automotive", icon: BiChip, type: "automotive" },
  { name: "Motorcycle", icon: RiEBike2Line, type: "motorcycle" },
  { name: "Home Decor lights", icon: BsLightbulb, type: "lighting" },
  { name: "H", icon: "FiSettings", type: "" },
];

const Products = ({ children }) => {
  //context
  const navigate = useNavigate();
  const cxtData = useContext(ContextProvider);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loadProducts, setLoadProducts] = useState(12);
  const [filtering, setFiltering] = useState("");

  //displaying 10 products at first
  //const slicedProducts = cxtData.productTypeRes.slice(0, loadProducts);

  //loading 10 moew products
  const loadMore = () => {
    setLoadProducts(loadProducts + 10);
  };

  const onClickProductType = (type) => {
    cxtData.setLoad(true);
    cxtData.setProductTypeRes([]);
    cxtData.setProductTypes(type);
    cxtData.setOutlet(false);
  };

  const onClickView = () => {};
  useEffect(() => {
    if (cxtData.productTypes === "") cxtData.setProductTypes("All");
  });
  const addItem = (product) => {
    if (cxtData.logState) {
      cxtData.addToWishlist(product);
    } else {
      navigate("/sign-in");
    }
  };

  if (cxtData.errors) {
    alert("No server response");
  }

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      {/* SidebarContent*/}

      <Box
        display={{ base: "none", md: "block" }}
        transition="3s ease"
        bg={useColorModeValue("white", "gray.900")}
        borderRight="1px"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
        w={{ base: "full", md: 60 }}
        overflow={"scroll"}
        pos="fixed"
        h="full"
        // {...rest}
      >
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Products
          </Text>
          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
        </Flex>
        {LinkItems.map((link, index) => (
          <Link
            onClick={() => onClickProductType(link.type)}
            key={link.name}
            style={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none" }}
          >
            <Flex
              align="center"
              p="4"
              mx="4"
              borderRadius="lg"
              role="group"
              cursor="pointer"
              _hover={{
                bg: "cyan.400",
                color: "white",
              }}
            >
              {link.icon && (
                <Icon
                  mr="4"
                  fontSize="16"
                  _groupHover={{
                    color: "white",
                  }}
                  as={link.icon}
                />
              )}
              {link.name}
            </Flex>
          </Link>
        ))}
      </Box>

      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          {/* SidebarContent */}
          <Box
            transition="3s ease"
            bg={useColorModeValue("white", "gray.900")}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
          >
            <Flex
              h="20"
              alignItems="center"
              mx="8"
              justifyContent="space-between"
            >
              <Text
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold"
              ></Text>
              <CloseButton
                display={{ base: "flex", md: "none" }}
                onClick={onClose}
              />
            </Flex>
            {/* navItems */}
            {LinkItems.map((link, index) => (
              <NavLink to={`/products`} key={link.type}>
                <Link
                  onClick={() => onClickProductType(link.type)}
                  style={{ textDecoration: "none" }}
                  _focus={{ boxShadow: "none" }}
                >
                  <Flex
                    align="center"
                    p="4"
                    mx="4"
                    borderRadius="lg"
                    role="group"
                    cursor="pointer"
                    _hover={{
                      bg: "cyan.400",
                      color: "white",
                    }}
                  >
                    {link.icon && (
                      <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                          color: "white",
                        }}
                        as={link.icon}
                      />
                    )}

                    {link.name}
                  </Flex>
                </Link>
              </NavLink>
            ))}
          </Box>
        </DrawerContent>
      </Drawer>

      {/* MobileNav search bar */}
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue("white", "gray.900")}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        justifyContent={{ base: "space-between", md: "flex-end" }}
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />
        <HStack spacing={{ base: "0", md: "6" }}>
          <form autoComplete="off">
            <Input
              size="lg"
              variant="filled"
              aria-label="open menu"
              placeholder="Search"
              value={filtering}
              onChange={(e) => setFiltering(e.target.value)}
            />
          </form>
        </HStack>
      </Flex>

      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>

      {/* listing out products */}
      <Box
        //overflowX={'scroll'}
        pl={{ lg: "250px", md: "250px", sm: "0" }}
        p={{ sm: 3 }}
      >
        {cxtData.productTypeRes.length !== 0 ? (
          <Grid
            templateRows={{
              sm: "repeat(1, 1fr)",
              md: "repeat(1, 1fr)",
              lg: "repeat(1, 1fr)",
            }}
            templateColumns={{
              sm: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={6}
          >
            {cxtData.productTypeRes &&
              cxtData.productTypeRes
                .filter((product) =>
                  product.title.toLowerCase().includes(filtering.toLowerCase())
                )
                .map((product, index) => {
                  return (
                    <GridItem w="100%" h={350} key={product.id}>
                      {/* product card starts maxW="sm" */}
                      {/* card design-3 */}
                      <div class="card">
                        <div class="img-card">
                          <img
                            className="image"
                            src={product.thumbnail}
                            alt=""
                          />
                        </div>
                        <NavLink
                          to={`/products/${product.id}`}
                          onClick={onClickView}
                        >
                          <Button
                            className="add-cart"
                            color={"white"}
                            bg={"black"}
                            _hover={{
                              bg: "white",
                              color: "black",
                              transform: "translateY(2px)",
                            }}
                            onClick={loadMore}
                          >
                            View
                          </Button>
                        </NavLink>
                        <div class="info-card">
                          <Center>
                            <Text as="b">{product.title}</Text> <br />
                          </Center>

                          <Center>
                            <Text as="b">Price :${product.price}</Text>
                            <Text ml={2} as="b">
                              Discount :
                              <Badge
                                ml="1"
                                fontSize="0.8em"
                                colorScheme="green"
                                color={"blackAlpha.900"}
                              >
                                {product?.discountPercentage}%
                              </Badge>
                            </Text>
                          </Center>
                          <Stack
                            mt={2}
                            justify={"space-evenly"}
                            direction="row"
                            spacing={4}
                          >
                            <Button
                              onClick={() => addItem(product)}
                              colorScheme="teal"
                              variant="solid"
                            >
                              <GiSelfLove />
                            </Button>
                          </Stack>
                        </div>
                      </div>
                      {/* product card ends */}
                    </GridItem>
                  );
                })}
          </Grid>
        ) : (
          <LoadingSkeleton />
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default Products;
