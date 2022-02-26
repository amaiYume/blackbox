import React from 'react'
import InputComponent from '../input-component/input'
import './header.css'

const Header = ()=>(
    <header className='header'>
        <ul>
            <li className='header-title'> 
              
                Black Box
            </li>
            <span className='header-search'>
            <li>
                <InputComponent type={'search'} placeholder={'search'} />
            </li>
            </span>
            <span className='header-page-navigation'>
           
            <li>
              
             Library
              
            </li>
            <li>
              
               Achievements
             
            </li>
            <li>
              
                Purchases
             
            </li>
            <li>
              
                Profile
             
            </li>
            </span>
           
           
        </ul>
       
      
     
     
     

    </header>
  
)

export default Header