import React, { useState } from "react";
import { GrCart } from "react-icons/gr";
import "./Navbar.css";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Popover,
  PopoverTrigger,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  HStack,
  MenuButton,
  Menu,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  PopoverContent,
  Icon,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { color, transform } from "framer-motion";
import { FiBell, FiChevronDown, FiHome } from "react-icons/fi";
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

//logic imports
import { ContextProvider } from "../../context/ContextAPI";
import { useContext } from "react";
import Login from "../Body/Login/Login";
import { FaProductHunt } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import logoImage from "../../assets/profile-pic(1).png";

const Navbar = () => {
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();
  const cxtData = useContext(ContextProvider);
  const onClickSignUp = () => {
    navigate("/sign-up");
  };
  const onClickSignIn = () => {
    navigate("/sign-in");
  };
  const onClickCart = () => {
    navigate("/cart-items");
  };
  const onClickWishlist = () => {
    navigate("/wishlist");
  };
  const OnClickOrders = () => {
    navigate("/orders");
  };
  const onClickSignOut = async () => {
    try {
      const signingOut = await signOut(auth);
      console.log(signingOut);
      cxtData.setLogState(false);
      navigate("/");
      cxtData.setUserName("");
    } catch (error) {
      console.log(error.message);
    }
  };
  const onClickLogo = () => {
    navigate("/");
  };
  return (
    <Box>
      <Flex
        bg={useColorModeValue("black", "white")}
        color={useColorModeValue("gray.600", "white")}
        minH={"80px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            cursor={"pointer"}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("white", "white")}
            _hover={{
              color: "gray",
            }}
            fontSize={20}
            onClick={onClickLogo}
          >
            <Image h={10} src={logoImage} />
            <span style={{ marginTop: "5px" }}>NSR</span>
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {!cxtData.logState && (
            <>
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                _hover={{
                  cursor: "pointer",
                  color: "white",
                  transform: "translateY(2px)",
                }}
                onClick={onClickSignIn}
              >
                Sign In
              </Button>
              <Button
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"green.400"}
                _hover={{
                  bg: "white.300",
                  cursor: "pointer",
                  transform: "translateY(2px)",
                }}
                onClick={onClickSignUp}
              >
                Sign Up
              </Button>
            </>
          )}
          {cxtData.logState && (
            <>
              <Button
                className="orderButton"
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                _hover={{
                  cursor: "pointer",
                  color: "white",
                  transform: "translateY(2px)",
                }}
                onClick={OnClickOrders}
              >
                Orders
              </Button>
            </>
          )}
          <Button
            as={"a"}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            backgroundColor={"white"}
            _hover={{
              cursor: "pointer",
              color: "white",
              bg: "green.400",
              transform: "translateY(2px)",
            }}
            onClick={onClickCart}
          >
            <GrCart />
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
              {cxtData.cart.length ? cxtData.cart.length : 0}
            </span>
          </Button>
          {cxtData.logState && (
            <>
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                backgroundColor={"white"}
                _hover={{
                  cursor: "pointer",
                  color: "white",
                  bg: "green.400",
                  transform: "translateY(2px)",
                }}
                onClick={onClickWishlist}
              >
                <GiSelfLove />{" "}
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                  {cxtData.wishlist.length ? cxtData.wishlist.length : 0}
                </span>
              </Button>
            </>
          )}

          {/* profile start */}
          {cxtData.logState ? (
            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  py={2}
                  transition="all 0.3s"
                  _focus={{ boxShadow: "none" }}
                >
                  <HStack>
                    <Avatar
                      size={"sm"}
                      src={
                        "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                      }
                    />
                    <Box display={{ base: "none", md: "flex" }}>
                      <FiChevronDown />
                    </Box>
                  </HStack>
                </MenuButton>
                <MenuList bg={"white"} borderColor={"gray.200"}>
                  <Text fontSize="md" textAlign={"center"}>
                    <strong>{cxtData.userName.name?.toUpperCase()}</strong>
                  </Text>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem onClick={OnClickOrders}>Orders</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={onClickSignOut}>Sign out</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ) : (
            ""
          )}

          {/* profile end */}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

const DesktopNav = () => {
  const linkColor = useColorModeValue("white", "white");
  const linkHoverColor = useColorModeValue("gray", "red");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const cxtData = useContext(ContextProvider);
  return (
    <Stack direction={"row"} spacing={4} mt={{ lg: "2" }} color={"white"}>
      {NAV_ITEMS.map((navItem) => (
        <Box
          key={navItem.label}
          _hover={{
            color: "gray",
          }}
        >
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <NavLink
                to={navItem.path}
                onClick={() =>
                  navItem.path === "/products"
                    ? cxtData.setProductTypes("All")
                    : ""
                }
                p={2}
                fontSize={"sm"}
                fontWeight={500}
                color={"white"}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </NavLink>
            </PopoverTrigger>
            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
                w={520}
              >
                <Stack h={500} w={500} display={"flex"} flexWrap={"wrap"}>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};
const DesktopSubNav = ({ label, type }) => {
  const cxtData = useContext(ContextProvider);
  const onClickNavItemSub = (type) => {
    cxtData.setProductTypes(type);
    cxtData.setProductTypeRes([]);
  };
  return (
    <NavLink
      onClick={() => onClickNavItemSub(type)}
      to={"/products"}
      role={"group"}
      p={1}
      rounded={"md"}
      _hover={{ bg: "pink.50" }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "blue.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"blue.400"} w={5} h={3} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </NavLink>
  );
};
const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, path }) => {
  const { isOpen, onToggle } = useDisclosure();
  const cxtData = useContext(ContextProvider);
  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          <NavLink
            to={path}
            onClick={() =>
              label === "Products" ? cxtData.setProductTypes("All") : ""
            }
          >
            {label}
          </NavLink>
        </Text>
      </Flex>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Products",
    path: "/products",
    children: [
      { label: "All", icon: <FaProductHunt />, type: "All" },
      { label: "Mobile", icon: <RxMobile />, type: "smartphones" },
      { label: "Laptops", icon: <BsLaptop />, type: "laptops" },
      { label: "Fragrances", icon: <TbPerfume />, type: "fragrances" },
      { label: "Skincare", icon: <MdHealthAndSafety />, type: "skincare" },
      { label: "Groceries", icon: <BiStoreAlt />, type: "groceries" },
      { label: "Home Decoration", icon: <FiHome />, type: "home-decoration" },
      { label: "Furniture", icon: <FiHome />, type: "furniture" },
      { label: "Womens Dresses", icon: <GiDress />, type: "womens-dresses" },
      { label: "Womens Shoes", icon: <GiSonicShoes />, type: "womens-shoes" },
      { label: "Womens Watches", icon: <GoWatch />, type: "womens-watches" },
      {
        label: "Womens Bags",
        icon: <BsFillHandbagFill />,
        type: "womens-bags",
      },
      {
        label: "Womens Jewellery",
        icon: <GiJewelCrown />,
        type: "womens-jewellery",
      },
      { label: "Mens Shirts", icon: <RiShirtLine />, type: "mens-shirts" },
      { label: "Mens Shoes", icon: <GiConverseShoe />, type: "mens-shoes" },
      { label: "Mens Watches", icon: <GoWatch />, type: "mens-watches" },
      { label: "Sunglasses", icon: <BsSunglasses />, type: "sunglasses" },
      { label: "Automotive", icon: <BiChip />, type: "automotive" },
      { label: "Motorcycle", icon: <RiEBike2Line />, type: "motorcycle" },
      { label: "Home Decor lights", icon: <BsLightbulb />, type: "lighting" },
    ],
  },
  {
    label: "Help",
    path: "/contact",
  },
];

export default Navbar;
