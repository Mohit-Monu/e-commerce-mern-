import React from "react";
import appliances from "./appliances.webp";
import electronics from "./electronics.webp";
import fashion from "./fashion.webp";
import grocery from "./grocery.webp";
import homeandfurniture from "./homeandfurniture.png";
import mobile from "./mobile.webp";
import toys from "./toys.webp";
import twowheeler from "./twowheeler.webp";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Category = () => {
  return (
    <div className="mt-4 ">
      <h1 className="text-center">Select Category</h1>
      <Container fluid>
        <center>
          <Row>
            {[
              [appliances, "Appliances", "appliances"],
              [electronics, "Electronics", "electronics"],
              [fashion, "Fashion", "fashion"],
              [grocery, "Grocery", "grocery"],
              [homeandfurniture, "Home & Furniture", "homeandfurniture"],
              [mobile, "Mobile", "mobile"],
              [toys, "Toys", "toys"],
              [twowheeler, "Two Wheeler", "twowheeler"],
            ].map((image) => (
              <Col
                key={image}
                style={{
                  boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Image style={{ height: "300px" }} src={image[0]} />
                <NavLink
                  to={`/store/${image[2]}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <h2 style={{cursor:"pointer"}}>{image[1]}</h2>
                </NavLink>
              </Col>
            ))}
          </Row>
        </center>
      </Container>
    </div>
  );
};

export default Category;
