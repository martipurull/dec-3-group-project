import React, { Component } from 'react'
import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useParams } from "react-router";
import SingleProductBackOffice from './SingleProductBackOffice'
import './ProductsBackOffice.css'


const ProductsBackOffice = () => {
    const [products, setProducts] = useState([])
    const params = useParams()

    const loadProducts = async () => {
        try {
            const response = await fetch('http://localhost:3001/products')
            console.log(response)
            if (response.ok) {
                const productArray = await response.json()
                console.log(productArray)
                setProducts(productArray)
            } else {
                throw new Error("failed to fetch!")
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => loadProducts(), [])

    return (
        <Container id="mainBackOfficeContainer">
            <Row>
                {products.map(product => (
                    <Col md={4} style={{ marginBottom: 50 }}>
                        <SingleProductBackOffice key={product.id} prodDetails={product} />
                    </Col>
                ))}
            </Row>
        </Container>
    )

}

export default ProductsBackOffice