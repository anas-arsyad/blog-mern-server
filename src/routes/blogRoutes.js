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
router.get("/posts",blogControllers.getAllBlogPost)
router.get("/post/:postId",blogControllers.getBlogPostById)
router.put("/post/:postId",applyValidatorBlog,blogControllers.updateBlogPost)
router.delete("/post/:postId",blogControllers.deleteBlogPostById)



module.exports=router