import React from 'react'
import { Component } from 'react/cjs/react.production.min'
import GameCard from '../../components/game-card/game_card'
import GenreTile from '../../components/genre-tile/genre-tile'
import Hero from '../../components/Hero/Hero'
import './home.css'
import axios from 'axios';
import {Navigate} from 'react-router-dom';
import {database} from '../../firebase/firebase';

class Home extends Component {
    

    state = {
        games: [],
        genres:[],
        libraryL:[],
        authenticated: false,
      }

      
      fetchUpcoming() {

                axios.get(`https://secret-depths-46783.herokuapp.com/games` ||`http://localhost:8000/games`,
                    {
                    headers:{
                        'Content-Type': 'application/json',
                        
                    } 
                    }
                ).then(res => {
                    //the game library appears here and assign codes using res.data.result
                    this.setState({games:res.data})
                }).catch(error =>console.log(error))

                axios.get(`https://secret-depths-46783.herokuapp.com/genre` || `http://localhost:8000/genre`,
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
        const libraryRef = database;
        libraryRef.on('value',(snapshot)=> {
            const library = snapshot.val();
            const libraryList = []
            for (let id in library){
                if(id === "vYENHq0syIY1ssVjuK3v13bS3Nx2")libraryList.push(library[id])
            }
            console.log(libraryList)
            this.setState({libraryL: libraryList})
        })

        

        // if(this.state.authenticated)
        
        // else{
        //     return(<>{this.state.authenticaiton && <Navigate to="/login" replace ={true}/>}</>)
        // }
       
    }

    render(){
        return(
           
            <div className='home'>
            {/* {this.state.authentication && <Navigate to="/login" replace ={true}/>} */}
            <Hero/>         
            
               <h2>Featured</h2>
              
            {this.state.games != null?
            <>
             <h3>Games</h3>
           { this.state.games.map((game) => (
                <span key = {game.id}>
             <GameCard gameName={game.name} gameIMG={game.background_image} gameReleased={game.released} gameData={game} />           
                 </span>
            
         ))}
         </>
            :
            <div>
            <h3>Loading Please wait</h3>
            </div>
 
            
            }
              
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