import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const getProductList = async () => {
    const products = await fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    getProductList();
  }, []);
  useEffect(() => {}, [products]);
  console.log(products);
  return (
    <div>
      {products.map((product) => (
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={product.imageUrl} />
          <Card.Body>
            <Card.Title>
              {product.brand} {product.name}
            </Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Button
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `/product/${product.id}`;
              }}
            >
              Details
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;
