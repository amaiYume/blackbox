const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('I\'m here!')
})

app.get('/games', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    axios.get(`https://api.rawg.io/api/games?key=${process.env.MY_API_KEY}&page_size=10`,
    {
    headers:{
        'Content-Type': 'application/json',
    } 
    }
    ).then(response => {
        //the game library appears here and assign codes using res.data.result
        res.json(response.data.results)
    }).catch(error =>console.log(error))
})

app.get('/genre', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    axios.get(`https://api.rawg.io/api/genres?key=${process.env.MY_API_KEY}&count=1`,
    {
    headers:{
        'Content-Type': 'application/json',
    } 
    }
    ).then(response => {
        //the game library appears here and assign codes using res.data.result
        res.json(response.data.results)
    }).catch(error =>console.log(error))
})


app.listen(process.env.SERVER_PORT, () => {
console.log(`Listening to ${process.env.SERVER_PORT}!`)
} )