import express from 'express'
import multer from 'multer'
import createHttpError from 'http-errors'
import { saveBlogCover, getBlogPosts } from '../library/fs-tools.js'

const blogCoversRouter = express.Router({ mergeParams: true })

const coverUploader = multer({
    fileFilter: (req, file, multerNext) => {
        if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/gif" && file.mimetype !== "image/png") {
            multerNext(createHttpError(400, "File type not supported: please try with a jpeg, gif or png."))
        } else if (file.size > 3000000) {
            multerNext(createHttpError(400, "The image is too large: please upload an image under 3MB."))
        } else {
            multerNext(null, true)
        }
    }
}).single("blogCover")

blogCoversRouter.post('/', coverUploader, async (req, res, next) => {
    try {
        const blogPosts = await getBlogPosts()
        const currentBlogPost = blogPosts.find(post => post.id === req.params.postId)
        console.log("Req params", req.params)
        await saveBlogCover(`${ req.params.postId }.${ req.file.mimetype.slice(6) }`, req.file.buffer)
        res.send("Image uploaded")
    } catch (error) {
        next(error)
    }
})











export default blogCoversRouter