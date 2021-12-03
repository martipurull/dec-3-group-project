import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { validationResult } from 'express-validator'
import { productValidation } from './productValidation.js'
import createHttpError from 'http-errors'
import { saveProducts, saveProductImage } from '../library/fs-tools.js'

const productsRouter = express.Router({ mergeParams: true })

productsRouter.post('/', productValidation, async (req, res, next) => {
    try {
        const errorList = validationResult(req)
        if (!errorList.isEmpty()) {
            next(createHttpError(400, "There some errors on your submission, namely: ", { errorList }))
        } else {
            const productsArray = await getBlogPosts()
            const newProduct = { ...req.body, id: uuidv4(), createdAt: new Date(), updatedAt: new Date() }
            productsArray.push(newProduct)
            await saveProducts(productsArray)
            res.status(201).send({ id: newProduct.id })
        }
    } catch (error) {
        next(error)
    }
})









export default productsRouter