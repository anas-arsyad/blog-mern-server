const {validationResult} =require("express-validator")


module.exports={
    createBlogPost:(req,res,next)=>{
        const title=req.body.title
        // const image=req.body.image
        const body=req.body.body

        const errors=validationResult(req)

        if(!errors.isEmpty()) {
                const err= new Error("Invalid Value")
                err.errorStatus = 400
                err.data=errors.array()
                throw err
        }


        const result={
            message:"Create Blog Post Succes",
            data:{
                post_id:1,
                title:"Title Blog",
                image:"image",
                body:"asd",
                created_at:"12/12/2020",
                author:{
                    uid:1,
                    name:"test"
                }
            }
        }

        res.status(201).send(result)
    }
}