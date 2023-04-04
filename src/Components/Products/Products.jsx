import React, { ReactNode, useContext, useEffect, useState } from "react";
import "./Product.css";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Input,
  SkeletonCircle,
  SkeletonText,
  Grid,
  GridItem,
  SimpleGrid,
  Center,
  Divider,
  CardFooter,
  Button,
  ButtonGroup,
  Heading,
  Stack,
  CardBody,
  Image,
  Card,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import { FaProductHunt } from "react-icons/fa";
import { IconType } from "react-icons";
import { ReactText } from "react";
import axios from "axios";
import { ContextProvider } from "../../context/ContextAPI";
import LoadingSkeleton from "./LoadingSkeleton";
import { NavLink, Outlet } from "react-router-dom";

const LinkItems = [
  { name: "All Products", icon: FaProductHunt, type: "products" },
  { name: "Home", icon: FiHome, type: "product1" },
  { name: "Trending", icon: FiTrendingUp, type: "product2" },
  { name: "Explore", icon: FiCompass },
  { name: "Favourites", icon: FiStar },
  { name: "Settings", icon: FiSettings },
  { name: "Electrical Light's", icon: FiSettings, type: "lighting" },
];

const Products = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productItems, setProductItems] = useState([]);
  const [loadProducts, setLoadProducts] = useState(12);

  //displaying 10 products at first
  const slicedProducts = productItems.slice(0, loadProducts);

  //loading 10 moew products
  const loadMore = () => {
    setLoadProducts(loadProducts + 10);
  };
  //context
  const cxtData = useContext(ContextProvider);

  //loading products
  useEffect(() => {
    let timer;
    const fetchData = async () => {
      const productResponse = await axios.get(
        "https://dummyjson.com/products?limit=100"
      );
      console.log("productResponse", productResponse.data.products);
      timer = setTimeout(() => {
        setProductItems(productResponse.data.products);
      }, [2000]);
    };
    fetchData();
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
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
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
      {/* listing out products */}
      <Box
        //overflowX={'scroll'}
        pl={{ lg: "250px", md: "250px", sm: "0" }}
        p={{ sm: 3 }}
      >
        {cxtData.productTypes === "product1" && <h1>1</h1>}
        {cxtData.productTypes === "product2" && <h1>2</h1>}
        {cxtData.productTypes === "lighting" &&
          (cxtData.productTypeRes.length !== 0 ? (
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
              {cxtData.productTypeRes.map((product) => {
                return (
                  <GridItem w="100%" h={300}>
                    {/* product card starts maxW="sm" */}
                    <div className="card">
                      <Box>
                        <Center>
                          <Image
                            // objectFit={"cover"}
                            src={product.thumbnail}
                            h={150}
                          />
                        </Center>
                      </Box>
                      <Text fontSize="xl">{product.title}</Text>
                      <div>{product.description}</div>
                      <Text>price:${product.price}</Text>
                    </div>
                    {/* product card ends */}
                  </GridItem>
                );
              })}
            </Grid>
          ) : (
            <LoadingSkeleton />
          ))}

        {cxtData.productTypes === "products" ? (
          slicedProducts.length !== 0 ? (
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
              {slicedProducts.map((product) => {
                return (
                  <GridItem w="100%" h={300}>
                    {/* product card starts maxW="sm" */}
                    <NavLink to={`/product/${product.id}`}>
                      <div className="card">
                        <Box>
                          <Center>
                            <Image
                              // objectFit={"cover"}
                              src={product.thumbnail}
                              h={150}
                            />
                          </Center>
                        </Box>
                        <Text fontSize="xl">{product.title}</Text>
                        <div>{product.description}</div>
                        <Text>price:${product.price}</Text>
                      </div>
                    </NavLink>
                    <Outlet />
                    {/* product card ends */}
                  </GridItem>
                );
              })}
            </Grid>
          ) : (
            <LoadingSkeleton />
          )
        ) : (
          ""
        )}
        {cxtData.productTypes === "products" && (
          <Center mt={10}>
            <Button
              color={"blackAlpha.900"}
              bg={"blackAlpha.100"}
              _hover={{
                bg: "black",
                color: "white",
                transform: "translateY(2px)",
              }}
              onClick={loadMore}
            >
              Load more
            </Button>
          </Center>
        )}
      </Box>
      <Outlet />
    </Box>
  );
};

const SidebarContent = ({ onClose, ...rest }) => {
  const cxtData = useContext(ContextProvider);
  const onClickProductType = (type) => {
    cxtData.setProductTypes(type);
  };
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold"></Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          onClick={() => onClickProductType(link.type)}
          key={link.name}
          icon={link.icon}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
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
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      // pos="fixed"
      // w={'100%'}
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
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
          />
        </form>
        {/* <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex> */}
      </HStack>
    </Flex>
  );
};

export default Products;
