const express =require('express')
const bodyParser= require('body-parser')
const mongoose= require("mongoose")
const app=express()

const authRoutes=require("./src/routes/authRoutes")
const blogRoutes=require("./src/routes/blogRoutes")


app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Origin','Content-Type,Authorization')
    next()
})


app.use("/v1/auth",authRoutes)
app.use("/v1/blog",blogRoutes)


app.use((error,req,res,next)=>{

    const status= error.errorStatus || 500
    const message=error.message
    const data =error.data

    res.status(status).send({message,data})
})

mongoose.connect("mongodb://localhost:27017/mern-blog",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
.then(()=>{
    app.listen(4000,()=> console.log('berjalan di 4000'))

})
.catch(err => console.log(err))


