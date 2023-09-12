import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner/Spinner";
import axios from "axios";
import useRazorpay from "react-razorpay";
import Form from "react-bootstrap/Form";
import {
  OrderPlace,
  OrderSuccess,
  OrderPlacePending,
  OrderFail,
} from "../../actions/OrderActions";
import { RemoveFromCarts } from "../../actions/UserActions";
import { useNavigate } from "react-router-dom";

const EnterAddress = () => {
  const [formData, setFormData] = useState({
    country: "",
    pincode: "",
    address: "",
    name: "",
    phone: "",
    terms: false,
  });
  const [methodtype, setMethodType] = useState("");
  const dispatch = useDispatch();
  const userdetailload = useSelector(
    (state) => state.authReducer.authData.user
  );
  const token = useSelector((state) => state.authReducer.authData).token;
  const products = useSelector((state) => state.orderReducer);
  const [Razorpay] = useRazorpay();
  const navigate = useNavigate();
  if (products.Products == null) {
    navigate("../");
  }
  useEffect(() => {
    if (userdetailload.profilePic) {
      setFormData({
        ...formData,
        name: userdetailload.name,
        country: userdetailload.Country,
        pincode: userdetailload.pincode,
        address: userdetailload.Address,
        phone: userdetailload.Phone,
      });
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(OrderPlacePending());
    const config = {
      method: "POST",
      url: "http://localhost:5000/purchase/membership",
      data: {
        product: products.Products,
        Address: formData.address,
        Country: formData.country,
        Pincode: formData.pincode,
        Phone: formData.phone,
        name: formData.name,
        method: methodtype,
        cartId: products.cartId,
      },
      headers: {
        Authorization: token,
      },
    };
    await axios(config).then((result) => {
      dispatch(OrderPlace());
      if (result.data.order) {
        var options = {
          key: result.data.key_id,
          order_id: result.data.order.id,
          handler: async function (result) {
            await axios.post(
              "http://localhost:5000/purchase/updatetransaction",
              {
                order_id: options.order_id,
                payment_id: result.razorpay_payment_id,
              },
              { headers: { Authorization: token } }
            );
            alert("Order Placed Success");
            if (products.cartId != null) {
              dispatch(RemoveFromCarts());
            }
            dispatch(OrderSuccess(navigate, products.Products.cartId));
          },
        };

        const rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault();
        rzp1.on("payment.failed", function (response) {
          console.log(response);
          alert("something went wrong");
          dispatch(OrderFail());
        });
      } else {
        alert("Order Placed Success");
        if (products.cartId != null) {
          dispatch(RemoveFromCarts());
        }
        dispatch(OrderSuccess(navigate, products.Products.cartId));
      }
    });
  };
  return products.loading ? (
    <Spinner />
  ) : (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="profile-form-container">
            <h3 className="text-center mb-3">Enter Address</h3>
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Country:</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Pincode:</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Address:</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              <Form.Check
                className="mb-3"
                required
                name="terms"
                label="Agree to terms and conditions"
                onChange={handleChange}
                feedbackType="invalid"
                id="validationFormik0"
              />
              <p className="text-danger">
                {" "}
                For Orders above Rs.25000 please select Cash On Delevery
              </p>
              <button
                type="submit"
                className="btn btn-success"
                onClick={() => {
                  setMethodType("Online");
                }}
              >
                Pay Online
              </button>
              <button
                type="submit"
                className="btn btn-primary mt-2"
                onClick={() => {
                  setMethodType("COD");
                }}
              >
                Cash On Delevery
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EnterAddress;
