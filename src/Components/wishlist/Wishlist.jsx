import React, { useContext } from "react";
import { ContextProvider } from "../../context/ContextAPI";
import { Button, Image, Stack } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { MdShoppingCartCheckout } from "react-icons/md";
import "./wishlist.css";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

const Wishlist = () => {
  const cxtData = useContext(ContextProvider);
  const navigate = useNavigate();
  //console.log(cxtData.cart);
  const addItem = (product) => {
    cxtData.addToWishlist(product);
  };
  const removeItem = (product) => {
    cxtData.removeFromWishlist(product);
  };
  const totalPrice = cxtData.wishlist.reduce(
    (acc, cur) => acc + cur.price * cur.quantity,
    0
  );
  const onClickCheckoutForm = (product) => {
    cxtData.addToCheckout(product);
    navigate("/checkout-form");
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="row-col-12">
            <div className="cart">
              <div className="items">
                {cxtData.wishlist.map((product) => {
                  return (
                    <>
                      <div className="cartPlace" key={product.id}>
                        <div className="cartImageDetails">
                          <div className="cartImageDiv">
                            <Image
                              h={"100px"}
                              w={"100px"}
                              objectFit={"cover"}
                              src={product.thumbnail}
                            />
                          </div>
                          <div className="cartDetails">
                            <span style={{ fontWeight: "500" }}>
                              {product.title.toUpperCase()}
                            </span>
                            <span style={{ fontWeight: "300" }}>
                              Price: ${product.price}
                            </span>
                            <span style={{ fontWeight: "300" }}>
                              Rating: {product.rating}
                            </span>
                          </div>
                        </div>
                        <div className="cartButton">
                          <strong style={{ marginTop: "-10px" }}>
                            Quantity: {product.quantity}
                          </strong>
                          <Stack direction="row" spacing={4}>
                            <Button
                              colorScheme="teal"
                              variant="outline"
                              onClick={() => addItem(product)}
                            >
                              <AddIcon />
                            </Button>
                            <Button
                              colorScheme="teal"
                              variant="outline"
                              onClick={() => removeItem(product)}
                            >
                              <MinusIcon />
                            </Button>
                            <Button
                              rightIcon={<MdShoppingCartCheckout />}
                              colorScheme="teal"
                              variant="solid"
                              onClick={() => onClickCheckoutForm(product)}
                            >
                              Checkout
                            </Button>
                          </Stack>
                        </div>
                      </div>
                      <hr />
                    </>
                  );
                })}
              </div>
              <div className="cartTotal">Total: ${totalPrice}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
