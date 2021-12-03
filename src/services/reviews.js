import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { validationResult } from 'express-validator'
import { reviewsValidation } from './reviewsValidation.js'
import createHttpError from 'http-errors'
import striptags from 'striptags'
import { getReviews, postReviews } from '../library/fs-tools.js'

const reviewsRouter  = express.Router()

//endpoints
reviewsRouter .post('/', reviewsValidation , async (req, res, next) => {
    try {
        const errorList = validationResult(req)
        if (!errorList.isEmpty()) {
            next(createHttpError(400, "There some errors on your submission, namely: ", { errorList }))
        } else {const reviews = await getReviews()
            const currentReview = reviews.find(review => review.id === req.params.productId)
            const newComment = { ...req.body, createdAt: new Date(), id: uuidv4() }
            if (currentReview.comments) {
                currentReview.comments.push(newComment)
            } else {
                currentReview.comments = []
                currentReview.comments.push(newComment)
            }
            reviews.push(currentReview)
            await postReviews(reviews)
            res.status(201).send(`Comment added successfully to blog post with id ${ req.params.productId }`)
           
        }
    } catch (error) {
        next(error)
    }
})

reviewsRouter .get('/', async (req, res, next) => {
    try {
        const reviewsArray = await getReviews()
        if (req.query && req.query.comment) {
            const filteredReviews = reviewsArray.filter(review=> review.comment.includes(req.query.comment))
            res.send(filteredReviews)
        } else {
            res.send(reviewsArray)
        }
        res.send(reviewsArray)
    } catch (error) {
        next(error)
    }
})

reviewsRouter .get('/:productId', async (req, res, next) => {
    try {
        const reviewsArray = await getReviews()
        const reviewFound = reviewsArray.find(review => review.id === req.params.productId)
        if (reviewFound) {
            res.send(reviewFound)
        } else {
            next(createHttpError(404, `Review with id ${ req.params.productId } does not exist or has been deleted.`))
        }
    } catch (error) {
        next(error)
    }
})

reviewsRouter .put('/:productId', async (req, res, next) => {
    try {
        const reviewsArray = await getReviews()
        const reviewToEditIndex = reviewsArray.findIndex(review => review.id === req.params.productId)
        const editedReview = { ...reviewsArray[reviewToEditIndex], ...req.body, updatedAt: new Date() }
        reviewsArray[reviewToEditIndex] = editedReview
        await postReviews(reviewsArray)
        res.send(editedReview)
    } catch (error) {
        next(error)
    }
})

reviewsRouter .delete('/:productId', async (req, res, next) => {
    try {
        const reviewsArray = await getReviews()
        const remainingReviewsArray = reviewsArray.filter(review => review.id !== req.params.productId)
        await postReviews(remainingReviewsArray)
        res.status(204).send()
    } catch (error) {
        next(error)
    }
})



export default reviewsRouter 