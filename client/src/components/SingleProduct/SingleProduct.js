import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Spinner from "../Spinner/Spinner";
import PageNotFound from "../PageNotFound/PageNotFound";
import { Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart } from "../../actions/UserActions";
import { AddToOrder } from "../../actions/OrderActions";

const SingleProduct = () => {
  const [product, setProduct] = useState();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { ProductId, category } = useParams();
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.authData);
  const cart = useSelector((state) => state.userReducer.cartData);
  const navigate=useNavigate()
  useEffect(() => {
    async function getData() {
      try {
        const data = await axios.get(
          `http://localhost:5000/products/${category}/${ProductId}`
        );
        setProduct(data.data.product);
        setLoaded(true);
      } catch (err) {
        setLoaded(true);
        setError(true);
        console.log(err);
      }
    }
    getData();
  }, [product, error, ProductId, category]);
  async function addToCartHandler() {
    dispatch(AddToCart({productId:product._id,token:user.token,cart:cart}));
  }
  function BuyNowHandler(e){
    const productId=[e.target.value]
    const cartId=null
    const obj = {
      productId,
      cartId,
    };
    console.log(obj);
    dispatch(AddToOrder(obj,navigate));
  }
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return loaded ? (
    error ? (
      <PageNotFound />
    ) : (
      <>
        {/* <p>{JSON.stringify(product)}</p> */}
        <center>
          <Carousel
            data-bs-theme="dark"
            activeIndex={index}
            onSelect={handleSelect}
            style={{ minHeight: "260px", marginTop: "10px" }}
          >
            {product.images.map((image) => (
              <Carousel.Item key={image}>
                <Image
                  fluid
                  style={{ height: "520px" }}
                  className="p-2"
                  src={image}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </center>
        <h2 className="m-4">{product.title}</h2>
        <p className="m-4">{product.description}</p>
        <span className="p-4" style={{ fontSize: "20px" }}>
          {product.rating}* rating
        </span>
        <br />
        <br />
        <div className=" d-grid gap-2" style={{ width: "100%" }}>
          <Button variant="success" size="lg"  onClick={BuyNowHandler} value={product._id}>
            Buy now
          </Button>
          <Button
            value={product._id}
            variant="warning"
            size="lg"
            onClick={addToCartHandler}
          >
            Add to cart
          </Button>
        </div>
      </>
    )
  ) : (
    <Spinner />
  );
};

export default SingleProduct;
