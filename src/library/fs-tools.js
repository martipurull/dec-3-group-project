import fs from 'fs-extra'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const { readJSON, writeJSON, writeFile } = fs


const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")
const blogCoversPublicFolderPath = join(process.cwd(), "./public/blog-covers")
const authorAvatarsPublicFolderPath = join(process.cwd(), "./public/author-avatars")
const productImagesPublicFolderPath = join(process.cwd(), "./public/product-images")

const blogPostsJSONPath = join(dataFolderPath, "blogPosts.json")
const authorsJSONPath = join(dataFolderPath, "authors.json")
const productsJSONPath = join(dataFolderPath, "products.json")


export const getBlogPosts = () => readJSON(blogPostsJSONPath)
export const getAuthors = () => readJSON(authorsJSONPath)
export const postBlogPost = (content) => writeJSON(blogPostsJSONPath, content)
export const createAuthors = (content) => writeJSON(authorsJSONPath, content)
export const saveBlogCover = (fileName, fileContentAsBuffer) => writeFile(join(blogCoversPublicFolderPath, fileName), fileContentAsBuffer)
export const saveAuthorAvatar = (fileName, fileContentAsBuffer) => writeFile(join(authorAvatarsPublicFolderPath, fileName), fileContentAsBuffer)

//product & review tools
export const saveProducts = (content) => writeJSON(productsJSONPath, content)
export const saveProductImage = (fileName, fileContentAsBuffer) => writeFile(join(productImagesPublicFolderPath, fileName), fileContentAsBuffer)
export const getProducts = () => readJSON(productJSONPath)
