import React from 'react'
import { Component } from 'react/cjs/react.production.min'
import GameCard from '../../components/game-card/game_card'
import GenreTile from '../../components/genre-tile/genre-tile'
import Header from '../../components/header/header'
import Hero from '../../components/Hero/Hero'
import './home.css'
import axios from 'axios';

class Home extends Component {
    

    state = {
        games: [],
        genres:[]
      }

      
      fetchUpcoming() {

                axios.get(`http://localhost:8000/games`,
                    {
                    headers:{
                        'Content-Type': 'application/json',
                        
                    } 
                    }
                ).then(res => {
                    //the game library appears here and assign codes using res.data.result
                    this.setState({games:res.data})
                }).catch(error =>console.log(error))

                axios.get(`http://localhost:8000/genre`,
                        {
                        headers:{
                            'Content-Type': 'application/json',
                        } 
                        }
                    ).then(res => {
                        //the game library appears here and assign codes using res.data.result
                        this.setState({genres:res.data})
                    }).catch(error =>
                            console.log(error)) 

    }

    componentDidMount(){
        this.fetchUpcoming();
       
    }

    render(){
        return(
            <div className='home'>
            <Header/>
            <Hero/>         
            
               <h2>Featured</h2>
               <h3>Games</h3>
               { this.state.games.map((game) => (
                   <span key = {game.id}>
                <GameCard gameName={game.name} gameIMG={game.background_image} gameReleased={game.released}/>           
                    </span>
               
            ))}
               <h2>Genres</h2>
                <div className='genre-list'>
                { this.state.genres.map((genre) => (
    


    <span key = {genre.id}>
        <GenreTile genreName={genre.name} genreIMG={genre.image_background} gamesCount={genre.games_count}/>
    </span>



))}
                </div>
            </div>
        )
    }
}
export default Home 