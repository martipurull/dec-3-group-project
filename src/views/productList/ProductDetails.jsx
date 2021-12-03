import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();

  const [productDetails, setProductDetails] = useState({});

  const getProductDetail = async () => {
    const products = await fetch(`http://localhost:3001/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => setProductDetails(data));
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <div>
      <Container
        style={{
          border: "1px solid black",
          borderRadius: "20px",
          width: "38rem",
        }}
      >
        <h1>Details</h1>
        <hr />
        <p>Brand: {productDetails.brand}</p>
        <p>Category: {productDetails.category}</p>
        <img src={productDetails.imageUrl} alt="" />
        <p>Description: {productDetails.description}</p>
        <p>Price: {productDetails.price} $</p>
      </Container>
    </div>
  );
};

export default ProductDetails;
