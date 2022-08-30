require('dotenv').config()
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
// const baseUrl = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}`
const getRate = (from, to, API_KEY = process.env.API_KEY) => {
    const baseUrl = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}`
    return axios.get(baseUrl)
        .then(res => {
            return { ...res.data, status: true, from, to, msg: 'success' }
        }).catch(err => {
            return { status: false, err , msg: `Something went wrong ${err.message}`}
        }
        )

}

app.use(cors())
app.get('/:from/:to/', async (req, res) => {
    const {from, to} = req.params
    console.log(from, to)
    const price = req.params
    let rate = await getRate(from, to)
    console.log(rate)
    if(!rate.status){
        rate = await getRate(from, to, process.env.API_KEY_2)
        console.log(rate.err, "running")
    }
    console.log(rate.msg)
    res.send(rate)
                

})

app.listen(process.env.PORT || 3000, () => {
    console.log(`app listening at port ${process.env.PORT || 3000}`)
})