import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { RemoveFromCart } from "../../actions/UserActions";
import { AddToOrder } from "../../actions/OrderActions";
import Spinner from "../../components/Spinner/Spinner";
import EmptyCartMessage from "./EmptyCartMessage"
const DisplayCartItem = () => {
  let originalprice = 0;
  let totalPrice = 0;
  let Delivery = 40;
  const cart = useSelector((state) => state.userReducer.cartData);
  const loading = useSelector((state) => state.userReducer.loading);
  const cartlength = useSelector((state) => state.userReducer.cartLength);
  const token = useSelector((state) => state.authReducer.authData).token;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function BuyNowHandler() {
    const productId = cart.map((item) => item.productId);
    const cartId = cart.map((item) => item._id);
    const obj = {
      productId,
      cartId,
      token,
    };
    dispatch(AddToOrder(obj, navigate));
  }
  function RemoveItemFromCartHandler(e) {
    const cartId = e.target.value;
    const obj = {
      cart,
      cartId,
      token,
    };
    dispatch(RemoveFromCart(obj));
  }
  return !loading ? (
    cartlength > 0 ? (
      <Container fluid className="container mt-4">
        <Row>
          <Col md={8}>
            {cart.map((products) => {
              totalPrice += products.price / 1;
              originalprice += products.original_price / 1;
              return (
                <Row
                  key={products._id}
                  className="m-3"
                  style={{ minHeight: "220px", border: "2px solid black" }}
                >
                  <Col style={{ borderRight: "2px solid black" }} md={4}>
                    <center>
                      <Image
                        fluid
                        className="mt-2"
                        style={{ height: "220px" }}
                        src={products.image}
                      />
                    </center>
                  </Col>
                  <Col>
                    <NavLink
                      to={`/store/${products.category}/${products.productId}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <h3 className="mt-2">{products.title}</h3>
                    </NavLink>
                    <hr />
                    <h3>Rs.{products.price}</h3>{" "}
                    <h5>
                      <s>Rs.{products.original_price}</s>
                    </h5>
                    <div className="mb-4">
                      <span style={{ fontSize: "20px" }}>
                        {products.rating}* rating
                      </span>
                      <Button
                        style={{ marginLeft: "50px" }}
                        value={products._id}
                        onClick={RemoveItemFromCartHandler}
                        variant="warning"
                        size="md"
                      >
                        Remove
                      </Button>
                    </div>
                  </Col>
                </Row>
              );
            })}
          </Col>
          <Col className="p-4">
            <Container
              className="p-4"
              fluid
              style={{ border: "2px solid black" }}
            >
              <h4>Price details</h4>
              <hr />
              <span style={{ float: "right" }}>Rs. {originalprice}</span>
              <p> Price ( {cart.length} items )</p>
              <b style={{ float: "right", color: "green" }}>
                -Rs. {originalprice - totalPrice}
              </b>
              <p> Discount items </p>
              <span style={{ float: "right" }}>
                {totalPrice >= 499 ? (
                  <s style={{ fontWeight: "bold" }}>Rs. {Delivery}</s>
                ) : (
                  <b style={{ fontWeight: "bold" }}>Rs. {Delivery}</b>
                )}
              </span>
              <p> Delivery Charges items </p>
              <hr />
              <b style={{ float: "right", fontSize: "20px" }}>
                Rs. {totalPrice >= 499 ? totalPrice : totalPrice + 40}
              </b>
              <h4>Total Amount</h4>
            </Container>
            <Button
              style={{ width: "100%" }}
              onClick={BuyNowHandler}
              className="mt-3"
              variant="success"
              size="lg"
            >
              Buy Now
            </Button>
          </Col>
        </Row>
      </Container>
    ) : (
      <EmptyCartMessage/>
    )
  ) : (
    <Spinner />
  );
};

export default DisplayCartItem;
