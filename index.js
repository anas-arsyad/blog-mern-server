const express =require('express')
const bodyParser= require('body-parser')
const mongoose= require("mongoose")
const multer = require("multer")
const path = require("path")
const cors= require('cors')
const app=express()

const authRoutes=require("./src/routes/authRoutes")
const blogRoutes=require("./src/routes/blogRoutes")

const fileStorage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images')
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().getTime() +'-'+file.originalname)
    }
})


const fileFilter=(req,file,cb)=>{
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);

    if(mimeType){
        cb(null,true)
    }else{
        cb(null,false)

    }
}

app.use(bodyParser.json())
app.use(cors())
app.use('/images',express.static(path.join(__dirname,'images')))
app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('image'))




// app.use((req,res,next)=>{
//     res.setHeader('Access-Control-Allow-Origin','*')
//     res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE,OPTIONS')
//     res.setHeader('Access-Control-Allow-Origin','Content-Type,Authorization')
//     next()
// })


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


