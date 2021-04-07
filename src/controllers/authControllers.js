
module.exports={
    register: (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    const result = {
        message: "Success Register",
        data: {
            uid: 1,
            name,
            email
        }
    }

    res.status(201).send(result)
},


}