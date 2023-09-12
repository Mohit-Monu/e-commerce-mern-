import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductList from "../ProductList/ProductList";
import Spinner from "../Spinner/Spinner";
import Pagination from "react-bootstrap/Pagination";
const AllProducts = () => {
  const [product, setProduct] = useState();
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const limit= 5;
  const [totalPage, setTotalPage] = useState([]);

  useEffect(() => {
    async function getdata() {
      try {
        setLoaded(false);
        const data = await axios.get(
          `http://localhost:5000/products/getProducts?page=${currentPage}&limit=${limit}`
        );
        setProduct(data.data.product);
        const total = Array.from(
          { length: data.data.totalPage },
          (_, index) => index + 1
        );
        setTotalPage(total);
        setLoaded(true);
      } catch (err) {
        setLoaded(false);
        console.log(err);
      }
    }
    getdata();
  }, [currentPage]);
  return loaded ? (
    <>
      {product.map((item) => (
        <>
          <ProductList key={item._id} products={item} />
        </>
      ))}
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
    <Spinner />
  );
};

export default AllProducts;
