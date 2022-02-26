import React from 'react'
import './genre-tile.css'
const GenreTile = ({genreName, genreIMG, gamesCount}) => (
    <div key ={'genreName'} className='genre-tile' 
    style={{
    backgroundImage: `url(${genreIMG})`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundBlendMode:'lighten',
    backgroundSize:'100%'
       }} 
       >
            <img src={genreIMG} alt={genreName+ ' name'} className='genre-thumbnail'/>
           <div className='genre-card'>
          
        <div className='genre-text'>
        <h1 className='genre-name'>{genreName}</h1>
        <div className='explore-button'>
            <h5>Explore | {gamesCount}+ games</h5>
        </div>
        </div>
           </div>
      
       
    </div>
)
export default GenreTile