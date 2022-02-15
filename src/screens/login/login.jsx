import React from 'react'
import InputComponent from '../../components/input-component/input';
import'./login.css'
import sideimage from  '../../assets/images/login-illustration.png';
import axios from 'axios';
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { render } from '@testing-library/react';



class Login extends React.Component{

    constructor() {
        
        super();
        this.changeHandler = this.changeHandler.bind(this);
        this.state = {
          email: "",
          password: "",

        };
      }

      
    handleSubmit = (e) => {
        e.preventDefault();
        const obj = {
            email:this.state.email,
            password: this.state.password,
        }
        axios.post('http://localhost/register/login.php', obj)
        .then(res => {console.log(res.data)
            let date = new Date(res.data);
            let curdate = new Date();
            date.setDate(date.getDate()-10);
            if(curdate.getYear() === date.getYear() && curdate.getMonth() === date.getMonth() && curdate.getDay() === date.getDay()){
                if(curdate.getTime()>=date.getTime()){
                    alert("You have 10 days left");
                }
            }
 
        })
        .catch(error => {
            console.log(error.response);
            alert("Login failed");
        })
        
    }

    changeHandler = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
      
      


render(){return(

    


    <div className='grid'>
        <div>
      
        <form className='form' onSubmit={this.handleSubmit}>
        <h2>LOGIN</h2>
        <h3>PAGE</h3>
        <div className='container'>
        <InputComponent label={'email'} placeholder={'i.e. JonnJonzz@email.com'} onChange = {this.changeHandler} name={'email'} type={'email'} id={'email'}/>
        <InputComponent label={'password'} placeholder={'Jonn#191281'} name={'password'} onChange = {this.changeHandler} type={'password'} id={'password'}/>
     
        </div>
       
      
   

        <input type={'submit'} className='submit' value={'Login'}/>
        </form>
        </div>
        <div>
        
        <div className='container-fixed'>
            
        <img src={sideimage} alt='register illustration' />
        <h1 className='toSignInButton'>Don't have an account yet? Sign up</h1>
        </div>
        </div>
       
        
    </div>
)}
}
export default Login;
