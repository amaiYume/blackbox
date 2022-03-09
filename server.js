const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
const path = require('path');

// Serve static files from the React frontend app




app.get('/games/:game_id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    axios.get(`https://api.rawg.io/api/games/${req.params.game_id}?key=${process.env.MY_API_KEY}`,
    {
    headers:{
        'Content-Type': 'application/json',
    } 
    }
    ).then(response => {
        //the game library appears here and assign codes using res.data.result
        res.json(response.data)
        console.log( res.json(response.data))
    }).catch(error =>console.log(error))
})

app.get('/games/:game_id/screenshots', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    axios.get(`https://api.rawg.io/api/games/${req.params.game_id}/screenshots?key=${process.env.MY_API_KEY}`,
    {
    headers:{
        'Content-Type': 'application/json',
    } 
    }
    ).then(response => {
        //the game library appears here and assign codes using res.data.result
        res.json(response.data.results)
        console.log( res.json(response.data))
    }).catch(error =>console.log(error))
})


app.get('/games/:game_id/movies', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    axios.get(`https://api.rawg.io/api/games/${req.params.game_id}/movies?key=${process.env.MY_API_KEY}`,
    {
    headers:{
        'Content-Type': 'application/json',
    } 
    }
    ).then(response => {
        //the game library appears here and assign codes using res.data.result
        res.json(response.data.results)
        console.log( res.json(response.data))
    }).catch(error =>console.log(error))
})


app.get('/games/:game_id/achievements', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    axios.get(`https://api.rawg.io/api/games/${req.params.game_id}/achievements?key=${process.env.MY_API_KEY}`,
    {
    headers:{
        'Content-Type': 'application/json',
    } 
    }
    ).then(response => {
        //the game library appears here and assign codes using res.data.result
        res.json(response.data.results)
        console.log( res.json(response.data))
    }).catch(error =>console.log(error))
})

app.get('/games/genre/:genre', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    axios.get(`https://api.rawg.io/api/games?key=${process.env.MY_API_KEY}&genres=${req.params.genre.toLowerCase()}`,
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
        console.log(response.data.results)
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
        console.log(response.data.results)
    }).catch(error =>console.log(error))
})


app.use(express.static(path.join(__dirname, 'Client/build')))

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/Client/build/index.html'))
  })


app.get('/', (req, res) => {
    res.send('I\'m here!')
})

app.listen(process.env.PORT||8000, () => {
console.log(`Listening to ${process.env.PORT||8000}!`)
})




  
