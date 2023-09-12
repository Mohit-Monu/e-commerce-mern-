import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShowOrdersList from "./ShowOrdersList";
import Spinner from "../../components/Spinner/Spinner";

const ShowOrders = () => {
  const [orders, setOrders] = useState();
  const token = useSelector((state) => state.authReducer.authData.token);
  useEffect(() => {
    async function getdata() {
      const config = {
        url: "http://localhost:5000/features/getOrders",
        method: "GET",
        headers: {
          Authorization: token,
        },
      };
      const data = await axios(config);
      setOrders(data.data.orders);
    }
    getdata();
  }, []);
  return orders ? orders.map((item) => <ShowOrdersList key={item._id} order={item}/>):<Spinner/>
};

export default ShowOrders;
