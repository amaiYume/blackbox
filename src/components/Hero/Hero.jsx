import React from 'react'
import './Hero.css'
import heroImg from '../../assets/images/hero-illustration.png'
const Hero = ()=>(
    <div className='hero'>
        <div className='hero-text'>
        <h1 className='hero-title'> HERO TEXT</h1>
        <h1 className='hero-subtitle'> GOES MEOWZIEEER</h1>
        </div>
       
        <img src={heroImg} alt="hero img" className='hero-image' />
    </div>
)
export default Hero