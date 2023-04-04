import React from "react";
import { GrCart } from "react-icons/gr";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Link,
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
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { color, transform } from "framer-motion";
import { FiBell, FiChevronDown } from "react-icons/fi";

//logic imports
import { ContextProvider } from "../../context/ContextAPI";
import { useContext } from "react";


const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
const cxtData=useContext(ContextProvider)
  return (
    <Box >
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
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("white", "white")}
            _hover={{
              color: "gray",
            }}
          >
            <NavLink to={"/"}>Logo</NavLink>
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
          >
            <NavLink to={"/sign-in"}>Sign In</NavLink>
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
          >
            <NavLink to={"/sign-up"}>Sign Up</NavLink>
          </Button>
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
          >
            <NavLink to={"/cart-items"}>
              <GrCart />
            </NavLink>
          </Button>
          {/* profile start */}
          {
            cxtData.logState ?  <Flex alignItems={"center"}>
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
                  {/* <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">Justina Clark</Text>
                </VStack> */}
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                //bg={useColorModeValue("white", "gray.900")}
                //borderColor={useColorModeValue("gray.200", "gray.700")}
              >
                <Text fontSize="md" textAlign={'center'}>Justina Clark</Text>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Billing</MenuItem>
                <MenuDivider />
                <MenuItem>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex> : ''
          }
         
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

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                <NavLink to={navItem.path}>{navItem.label}</NavLink>
              </Link>
            </PopoverTrigger>

            {/* {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )} */}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

// const DesktopSubNav = ({ label, subLabel }) => {
//   return (
//     <Link
//       role={"group"}
//       display={"block"}
//       p={2}
//       rounded={"md"}
//       _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
//     >
//       <Stack direction={"row"} align={"center"}>
//         <Box>
//           <Text
//             transition={"all .3s ease"}
//             _groupHover={{ color: "pink.400" }}
//             fontWeight={500}
//           >
//             {label}
//           </Text>
//           <Text fontSize={"sm"}>{subLabel}</Text>
//         </Box>
//         <Flex
//           transition={"all .3s ease"}
//           transform={"translateX(-10px)"}
//           opacity={0}
//           _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
//           justify={"flex-end"}
//           align={"center"}
//           flex={1}
//         >
//           <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
//         </Flex>
//       </Stack>
//     </Link>
//   );
// };

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

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
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
          <NavLink to={path}>{label}</NavLink>
        </Text>
        {/* {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )} */}
      </Flex>

      {/* <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} >
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse> */}
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Home",
    path: "/home",
    // children: [
    //   {
    //     label: "Explore Design Work",
    //     subLabel: "Trending Design to inspire you",
    //   },
    //   {
    //     label: "New & Noteworthy",
    //     subLabel: "Up-and-coming Designers",
    //   },
    // ],
  },
  {
    label: "Products",
    path: "/products",
    children: [
      {
        label: "Mobile",
        subLabel: "Find your dream design job",
      },
      {
        label: "Laptop",
        subLabel: "An exclusive list for contract work",
      },
    ],
  },
  {
    label: "About",
  },
  {
    label: "",
  },
];

export default Navbar;
