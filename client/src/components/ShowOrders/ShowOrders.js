import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShowOrdersList from "./ShowOrdersList";
import Spinner from "../../components/Spinner/Spinner";
import EmptyOrderMessage from "./EmptyOrderMessage";
import Pagination from "react-bootstrap/Pagination";

const ShowOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = useSelector((state) => state.authReducer.authData.token);
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 2;
  const [totalPage, setTotalPage] = useState([]);
  useEffect(() => {
    async function getdata() {
      try {
        setLoaded(false);
        const config = {
          url: `http://localhost:5000/features/getOrders?page=${currentPage}&limit=${limit}`,
          method: "GET",
          headers: {
            Authorization: token,
          },
        };
        const data = await axios(config);
        setOrders(data.data.orders);
        setLoaded(true);
        const total = Array.from(
          { length: data.data.totalPage },
          (_, index) => index + 1
        );
        setTotalPage(total);
      } catch (err) {
        setLoaded(false);

      }
    }
    getdata();
  }, [currentPage]);
  return loaded ? (
    orders.length != 0 ? (
      <>
      {orders.map((item) => <ShowOrdersList key={item._id} order={item} />)}
      <Pagination className="justify-content-center mt-3">
        {currentPage>=3&&<Pagination.First onClick={() => setCurrentPage(1)} />}
        {currentPage>=2&&<Pagination.Prev onClick={() => setCurrentPage((prev) => prev - 1)} />}
        {totalPage.map((pageNumber) => (
          <Pagination.Item
            key={pageNumber}
            active={pageNumber === currentPage}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </Pagination.Item>
        ))}
        {currentPage<totalPage.length&&<Pagination.Next onClick={() => setCurrentPage((prev) => prev + 1)} />}
        {currentPage+1<totalPage.length&&<Pagination.Last onClick={() => setCurrentPage(totalPage.length)} />}
      </Pagination>

      </>
      
      
    ) : (
      <EmptyOrderMessage />
    )
  ) : (
    <Spinner />
  );
};

export default ShowOrders;
