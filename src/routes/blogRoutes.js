const router=require('express').Router()
const blogControllers=require('../controllers/blogControllers')
const {body}=require('express-validator')

const applyValidatorBlog=[
    body('title')
    .isLength({min:8})
    .withMessage("Input Tidak Sesuai"),
    body('body')
    .isLength({min:5})
    .withMessage("Input Body Tidak Sesuai")
]

router.post("/post",applyValidatorBlog,blogControllers.createBlogPost)


module.exports=router