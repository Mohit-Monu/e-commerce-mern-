import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart } from "../../actions/UserActions";


const ProductList = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.authData);
  const cart = useSelector((state) => state.userReducer.cartData);
  async function addToCartHandler(e) {
    const id=e.target.value
    dispatch(AddToCart({productId:id,token:user.token,cart:cart}));
  }
  return (
    <Container
      fluid
      className="container mt-4"
      style={{ minHeight: "320px", border: "2px solid black" }}
    >
      <Row>
        <Col style={{ borderRight: "2px solid black" }} md={4}>
          <Image
            fluid
            className="m-2"
            style={{ height: "300px" }}
            src={props.products.images[0]}
          />
        </Col>
        <Col>
          <NavLink
            to={`/store/${props.products.category}/${props.products._id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <h3 className="mt-2">{props.products.title}</h3>
          </NavLink>
          <hr />
          <p className="mt-2">{props.products.description} </p>
          <h3>Rs.{props.products.price}</h3>{" "}
          <h5>
            <s>Rs.{props.products.original_price}</s>
          </h5>
          <div className="mb-4">
          <span style={{ fontSize: "20px" }}>
            {props.products.rating}* rating
          </span>
          <Button value={props.products._id} style={{marginLeft:"50px"}} onClick={addToCartHandler} variant="warning" size="md">
            Add to cart
          </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductList;
