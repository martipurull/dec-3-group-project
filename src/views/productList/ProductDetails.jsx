import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();

  const [product, setProduct] = useState({});

  const getProductDetail = async () => {
    const products = await fetch(
      `http://localhost:3001/products/${params.id}/reviews`
    )
      .then((res) => res.json())
      .then((data) => setProduct(data));
  };
  useEffect(() => {
    getProductDetail();
  }, []);

  console.log(product);
  return <div>pproductDetails</div>;
};

export default ProductDetails;
