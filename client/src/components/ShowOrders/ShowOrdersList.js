import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const ShowOrdersList = (props) => {
  const navigate = useNavigate();
  function ShowOrderHandler(e) {
    const id = e.target.value;
    navigate(`../myorder/${id}`);
  }
  return (
    <>
      <Container
        key={props.order._id}
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
              src={props.order.product[0].image}
            />
          </Col>
          <Col>
            <h3 className="mt-2">{props.order.product[0].title}</h3>
            {props.order.product.length > 1 && (
              <h4 className="mt-4">
                +({props.order.product.length - 1}) more item
              </h4>
            )}
            <h3 className="mt-2">Rs.{props.order.totalPrice}</h3>
            <h4 className="mt-2">status-{props.order.Status}</h4>
            <h4 className="mt-2">
              Date- {new Date(props.order.createdAt).toDateString()}
            </h4>
            <h4 className="mt-2">
              Time-{" "}
              {new Date(props.order.createdAt)
                .getUTCHours()
                .toString()
                .padStart(2, "0") +
                ":" +
                new Date(props.order.createdAt)
                  .getUTCMinutes()
                  .toString()
                  .padStart(2, "0") +
                ":" +
                new Date(props.order.createdAt)
                  .getUTCSeconds()
                  .toString()
                  .padStart(2, "0")}
            </h4>
            {props.order.Paymentstatus === "PENDING" ? (
              <h4 className="mt-2 text-danger">Payment- Failed</h4>
            ) : (
              <h4 className="mt-2 text-success">
                Payment-{props.order.Paymentstatus}
              </h4>
            )}

            <Button
              value={props.order._id}
              style={{
                marginLeft: "10px",
                marginTop: "20px",
                marginBottom: "20px",
              }}
              variant="outline-primary"
              size="md"
              onClick={ShowOrderHandler}
            >
              View More
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ShowOrdersList;
