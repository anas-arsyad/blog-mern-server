const { validationResult } = require("express-validator")
const BlogPost = require("../models/blogModels")
const path= require("path")
const fs= require("fs")


const removeImage = (filePath)=>{
   filePath= path.join(__dirname,'../..',filePath)
    fs.unlink(filePath,err=>console.log(err))
}

module.exports = {
    createBlogPost: async (req, res, next) => {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            const err = new Error("Invalid Value")
            err.errorStatus = 400
            err.data = errors.array()
            throw err
        }
        if (!req.file) {
            const err = new Error('image harus di upload')
            err.errorStatus = 422
            err.data = errors.array()
            throw err
        }
        const title = req.body.title
        const image = req.file.path
        const body = req.body.body

        const Posting = new BlogPost({
            title,
            body,
            image,
            author: {
                uid: 1,
                name: "Lord",

            }
        })

        Posting.save()
            .then(result => {
                res.status(201).send({
                    message: "Create Blog Post Success",
                    data: result
                })
            })
            .catch(err => console.log(err))

    },
    getAllBlogPost: async(req, res, next) => {
        try {
            const currentPage=parseInt(req.query.page) || 1
            const perPage= parseInt(req.query.perPage) || 5

            const count= await BlogPost.find().countDocuments()
            
            const result=await BlogPost.find().skip((currentPage - 1)* perPage).limit(perPage)

            res.status(200).send({
                message:"berhasil dapat blog",
                data:result,
                totol_data:count,
                per_page:perPage,
                current_page:currentPage
            })



        } catch (error) {
            console.log(error);
            next(error)
        }   
    },
    getBlogPostById: async (req, res, next) => {
        try {
            const postId = req.params.postId
            const result = await BlogPost.findById(postId)
            if (!result) {
                const err = new Error("blog tidak di temukan")
                err.errorStatus = 404
                err.data = errors.array()
                throw err
            }

            res.status(200).send({
                message: "Data berhasil di dapat",
                data: result
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    },
    updateBlogPost: async (req, res, next) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                const err = new Error("Invalid Value")
                err.errorStatus = 400
                err.data = errors.array()
                throw err
            }
            if (!req.file) {
                const err = new Error('image harus di upload')
                err.errorStatus = 422
                err.data = errors.array()
                throw err
            }
            const title = req.body.title
            const image = req.file.path
            const body = req.body.body
            const postId = req.params.postId
            const post =await BlogPost.findById(postId)

            if (!post) {
                const err = new Error("Blog tidak di temukan")
                err.errorStatus = 404
                err.data = errors.array()
                throw err
            }

            post.title=title
            post.body= body
            post.image= image

            const result=await post.save()
            res.status(200).send({
                message:"berhasil update",
                data:result
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    },
    deleteBlogPostById:async(req,res,next)=>{
        try {
            const postId= req.params.postId

            const post=await BlogPost.findById(postId)
            if (!post) {
                const err = new Error("Blog tidak di temukan")
                err.errorStatus = 404
                throw err
            }

            removeImage(post.image)
            const result =await BlogPost.findByIdAndRemove(postId)

            res.status(200).send({
                message:"Berhasil delete",
                data:result
            })


        } catch (error) {
            console.log(error);
        }
    }
}