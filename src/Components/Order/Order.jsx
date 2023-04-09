import React, { useContext } from "react";
import { ContextProvider } from "../../context/ContextAPI";
import { Center, Heading, Image, Link } from "@chakra-ui/react";

const Order = () => {
  const cxtData = useContext(ContextProvider);
  console.log(cxtData.orderedList);
  const dateTime = new Date();
  dateTime.setDate(dateTime.getDate() + 3);
  const formatDate = dateTime.toLocaleDateString();
  return (
    <div className="container">
      <div className="row">
        <div className="row-col-12">
          <Center>
            <Heading>Orders</Heading>
          </Center>
          <div className="cart">
            <div className="items">
              {cxtData.orderedList.map((product) => {
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
                            <strong>{product.title.toUpperCase()}</strong>
                          </span>
                          <span style={{ fontWeight: "300" }}>
                            Price: ${product.price}
                          </span>
                          <span style={{ fontWeight: "300" }}>
                            Rating: {product.rating}
                          </span>
                        </div>
                      </div>
                      <div>
                        <Link color={"blue.500"}>Tracking</Link>
                      </div>
                      <div className="cartButton">
                        <br />
                        Expected Delivery By <strong>{formatDate}</strong>
                      </div>
                    </div>
                    <hr />
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
