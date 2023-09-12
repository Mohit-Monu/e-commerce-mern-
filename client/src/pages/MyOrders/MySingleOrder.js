import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { NavLink, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner/Spinner";

import axios from "axios";
export const MySingleOrder = () => {
  const [order, setOrder] = useState();
  const token = useSelector((state) => state.authReducer.authData.token);
  const [loading, setLoading] = useState(true);
  const id = useParams().orderId;
  console.log(id);
  useEffect(() => {
    async function getData() {
      const config = {
        url: "http://localhost:5000/features/getOrderbyId/" + id,
        method: "GET",
        headers: {
          Authorization: token,
        },
      };
      const data = await axios(config);
      setOrder(data.data.orders);
      setLoading(false);
    }
    getData();
  }, []);
  console.log(order);
  return loading ? (
    <Spinner />
  ) : (
    <>
      <Header />
      {order.product.map((item) => (
        <Container
          key={item._id}
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
                src={item.image}
              />
            </Col>
            <Col>
              <NavLink
                to={`/store/${item.category}/${item._id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <h3 className="mt-2 p-2">{item.title}</h3>
              </NavLink>
              <h3 className="mt-2 p-2">Rs.{item.price}</h3>
              <h3 className="mt-2 p-2">Category- {item.category}</h3>
            </Col>
          </Row>
        </Container>
      ))}
      <Container
        key={order._id}
        fluid
        className="container mt-4"
        style={{ minHeight: "320px", border: "2px solid black" }}
      >
        <h4 className="mt-4 text-center">Order Details</h4>
        <h4 className="mt-4">status-{order.Status}</h4>
        {order.Paymentstatus === "PENDING" ? (
          <h4 className="mt-2 text-danger">Payment- Failed</h4>
        ) : (
          <h4 className="mt-2 text-success">Payment-{order.Paymentstatus}</h4>
        )}
        <h4 className="mt-2">
          Date- {new Date(order.createdAt).toDateString()}
        </h4>
        <h4 className="mt-2">
          Time-{" "}
          {new Date(order.createdAt).getUTCHours().toString().padStart(2, "0") +
            ":" +
            new Date(order.createdAt)
              .getUTCMinutes()
              .toString()
              .padStart(2, "0") +
            ":" +
            new Date(order.createdAt)
              .getUTCSeconds()
              .toString()
              .padStart(2, "0")}
        </h4>
        <h4 className="mt-2">Order Id-{order.orderid}</h4>
        <h4 className="mt-2">Payment Id-{order.payment_id}</h4>
        <h4 className="mt-2">Name -{order.name}</h4>
        <h4 className="mt-2">Total Price -{order.totalPrice}</h4>
        <h4 className="mt-2">Address -{order.Address}</h4>
        <h4 className="mt-2">Country -{order.Country}</h4>
        <h4 className="mt-2">Pincode -{order.Pincode}</h4>
        <h4 className="mt-2">Phone -{order.Phone}</h4>
      </Container>
    </>
  );
};
export default MySingleOrder;
