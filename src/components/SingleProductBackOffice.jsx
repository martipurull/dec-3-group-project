import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'
import './SingleProductBackOffice.css'


const SingleProductBackOffice = ({ prodDetails }) => {


    return (
        <Card className="mt-5 singleProductCard">
            <Card.Body>
                <Card.Title>{prodDetails.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{prodDetails.brand}</Card.Subtitle>
                <Card.Img className="productImg" variant="top" src={prodDetails.imageUrl} />
                <Card.Text>
                    {prodDetails.description}
                </Card.Text>
                <div className="d-flex justify-content-end">
                    <Button size="sm" variant="warning">Edit</Button>
                    <Button size="sm" variant="danger">Delete</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default SingleProductBackOffice