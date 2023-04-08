import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import "./pay.css";
import React, { useContext, useEffect, useState } from "react";
import { MdOutlinePayment, MdShoppingCartCheckout } from "react-icons/md";
import { ContextProvider } from "../../context/ContextAPI";
import { useNavigate } from "react-router-dom";

const Pay = () => {
  const [upiId, setUpiId] = useState("");
  const [paymentAlertState, setPaymentAlertState] = useState(false);
  const [alertMsg, setAlertMsg] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const cxtData = useContext(ContextProvider);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const navigate = useNavigate();

  let regex = new RegExp(/[a-zA-Z0-9_]{2,}@[a-zA-Z]{2,}/);
  const onClickPay = (e) => {
    e.preventDefault();
    if (regex.test(upiId)) {
      console.log("true");
    } else {
      console.log(false);
    }
  };
  console.log("payemet--------", cxtData.checkoutUserDetails);
  const onChangeHandler = (event) => {
    setUpiId(event.target.value);
    if (regex.test(event.target.value)) {
      setPaymentAlertState(true);
      setAlertMsg(false);
    } else {
      setPaymentAlertState(false);
      setAlertMsg(true);
    }
  };
  const onClickYes = () => {
    console.log("yes");
    setPaymentAlertState(false); // for payment alert
    setTimeout(() => {
      setAlertSuccess(true);
    }, 2000); // for success alert
  };
  const onClickYesSuccess = () => {
    setAlertSuccess(false);
    setUpiId("");
    cxtData.setCart(() =>
      cxtData.cart.filter((item) => item.id !== cxtData.checkout.id)
    );
    cxtData.setWishList(() =>
      cxtData.wishlist.filter((item) => item.id !== cxtData.checkout.id)
    );
    cxtData.addToOrders(cxtData.checkout);

    navigate("/products");
  };
  const onClickYesOrders = () => {
    setAlertSuccess(false);
    setUpiId("");
    cxtData.setCart(() =>
      cxtData.cart.filter((item) => item.id !== cxtData.checkout.id)
    );
    cxtData.setWishList(() =>
      cxtData.wishlist.filter((item) => item.id !== cxtData.checkout.id)
    );
    cxtData.addToOrders(cxtData.checkout);
    cxtData.setCheckoutUserDetails({});
    cxtData.setCheckout({});

    navigate("/orders");
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Center>
            <Heading>Payment</Heading>
          </Center>
          <Box>
            <Text color={"gray.900"} fontWeight={500} fontSize={"2xl"}>
              Delivery Details
            </Text>
            <Text color={"gray.900"} fontWeight={300}>
              Name: {cxtData.checkoutUserDetails.values?.name.toUpperCase()}
            </Text>
            <Text color={"gray.900"} fontWeight={300}>
              Email: {cxtData.checkoutUserDetails.values?.email.toUpperCase()}
            </Text>
            <Text color={"gray.900"} fontWeight={300}>
              Phone: {cxtData.checkoutUserDetails.values?.phone}
            </Text>

            <Text color={"gray.900"} fontWeight={300}>
              Address:{" "}
              {cxtData.checkoutUserDetails.values?.address.toUpperCase()},
              {cxtData.checkoutUserDetails.values?.area.toUpperCase()},
              {cxtData.checkoutUserDetails.values?.street.toUpperCase()},
              {cxtData.checkoutUserDetails.values?.state.toUpperCase()}
            </Text>
            <Text color={"gray.900"} fontWeight={300}>
              Pincode: {cxtData.checkoutUserDetails.values?.pincode}
            </Text>
          </Box>
          <Box>
            <Text color={"gray.900"} fontWeight={300} fontSize={"2xl"}>
              Total Amount: ${cxtData.checkout?.price}.00 USD
            </Text>
          </Box>
          <Text color={"gray.900"} fontWeight={500} fontSize={"2xl"}>
            Payment Methods
          </Text>
          <Accordion allowToggle mt={5}>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    UPI
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <form onSubmit={onClickPay}>
                  <Container>
                    <FormControl>
                      <Input
                        disabled
                        required
                        type="text"
                        name="amount"
                        variant="filled"
                        bg={"yellow.100"}
                        placeholder="Enter UPI Id"
                        value={`$${cxtData.checkout.price}.00 USD`}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Upi Id</FormLabel>
                      <Input
                        required
                        type="text"
                        name="upi"
                        variant="filled"
                        placeholder="Enter UPI Id"
                        value={upiId}
                        onChange={onChangeHandler}
                      />
                    </FormControl>
                    <Button
                      mt={2}
                      type="submit"
                      rightIcon={<MdOutlinePayment />}
                      colorScheme="teal"
                      variant="solid"
                      onClick={paymentAlertState || alertMsg ? onOpen : onClose}
                    >
                      Pay
                    </Button>
                  </Container>
                </form>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Debit cards
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Under process will get in next patch..
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Credit cards
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>credit card</AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Paypal / Supercharge
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Under process will get in next patch..
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    NSR Pay
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <form onSubmit={onClickPay}>
                  <Container>
                    <FormControl>
                      <Input
                        disabled
                        required
                        type="text"
                        name="amount"
                        variant="filled"
                        bg={"whatsapp.100"}
                        color={"black"}
                        placeholder="Enter UPI Id"
                        value={`$${cxtData.checkout.price}.00 USD`}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>NSR Pay Id</FormLabel>
                      <Input
                        required
                        type="text"
                        name="upi"
                        variant="filled"
                        placeholder="Enter NSR pay Id"
                        onChange={onChangeHandler}
                      />
                    </FormControl>
                    <Button
                      mt={2}
                      type="submit"
                      rightIcon={<MdOutlinePayment />}
                      colorScheme="whatsapp"
                      variant="solid"
                      onClick={paymentAlertState || alertMsg ? onOpen : onClose}
                    >
                      NSR Pay
                    </Button>
                  </Container>
                </form>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          {/* payment alert box starts */}
          {paymentAlertState && (
            <AlertDialog
              closeOnOverlayClick={false}
              motionPreset="slideInBottom"
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              isOpen={isOpen}
              isCentered
            >
              <AlertDialogOverlay />
              <AlertDialogContent>
                <AlertDialogHeader>Payment Details</AlertDialogHeader>
                {/* <AlertDialogCloseButton /> */}
                <AlertDialogBody>
                  We have send an payment link to your UPI ID{" "}
                  <strong>{upiId}</strong> pay through it.
                </AlertDialogBody>
                <AlertDialogFooter>
                  {/* <Button ref={cancelRef} onClick={onClose}>
                    No
                  </Button> */}
                  <Button colorScheme="red" onClick={onClickYes} ml={3}>
                    Ok
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          {/* payment alert box starts */}

          {/* for error starts  */}
          {alertMsg && (
            <AlertDialog
              closeOnOverlayClick={false}
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Invalid UPI ID
                  </AlertDialogHeader>

                  <AlertDialogBody>Please Enter Correct Upi Id</AlertDialogBody>

                  <AlertDialogFooter>
                    {/* <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button> */}
                    <Button colorScheme="red" onClick={onClose} ml={3}>
                      Ok
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          )}
          {/* for error ends */}

          {/* payment alert Success box starts */}
          {alertSuccess && (
            <AlertDialog
              closeOnOverlayClick={false}
              motionPreset="slideInBottom"
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              isOpen={isOpen}
              isCentered
            >
              <AlertDialogOverlay />
              <AlertDialogContent>
                <AlertDialogHeader>Payment Success</AlertDialogHeader>
                {/* <AlertDialogCloseButton /> */}
                <AlertDialogBody>
                  Your Payment has been Successful, Order has been placed <br />
                  You can check in Orders for updates....🤩
                </AlertDialogBody>
                <AlertDialogFooter>
                  {/* <Button ref={cancelRef} onClick={onClose}>
                    No
                  </Button> */}
                  <Button colorScheme="red" onClick={onClickYesSuccess} ml={3}>
                    Ok
                  </Button>
                  <Button colorScheme="red" onClick={onClickYesOrders} ml={3}>
                    Orders
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          {/* payment alert Success box starts */}
        </div>
      </div>
    </div>
  );
};

export default Pay;
