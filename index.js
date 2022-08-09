require('dotenv').config()
const express = require('express')
const axios = require('axios')
const app = express()
const baseUrl = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}`

app.get('/:from/:to/', async (req, res) => {
    const {from, to} = req.params
    console.log(from, to)
    const price = req.params
    axios.get(`${baseUrl}/pair/${from}/${to}`)
         .then(response => {
            console.log(response.data)
            //send response to client
            res.send({...response.data, status:true, from, to})
         })
         .catch(errors => {
                console.log(errors)
                // send a json respond with a status of 500 and the error message
                res.status(500).send({error: errors.message, status:false})
        })
                

})

app.listen(process.env.PORT || 3000, () => {
    console.log(`app listening at port ${process.env.PORT || 3000}`)
})