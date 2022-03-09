import React from 'react'
import InputComponent from '../../components/input-component/input';
import'./login.css';
import sideimage from  '../../assets/images/login-illustration.png';
// import { getAuth} from "firebase/auth";
// import { render } from '@testing-library/react';
import {Link } from 'react-router-dom';
import {auth, gettingAuth} from '../../firebase/firebase';
import {Navigate} from 'react-router-dom'
import {handeEncryption} from '../../helper/crytography_helper'
import store from '../../redux/store';
import { UserActionTypes } from '../../redux/user/user-type';
class Login extends React.Component{

    constructor() {
        super();
        this.state = {
       
          email: "",
          password: "",
          notRoute: false,
          loginAttempts: 3,
          isDisabled: false,
        };
      }

      
      
      handleChange = async(event) => {
    
        await this.setState({ [event.target.name]: event.target.value });
            console.log(event.target.name+' '+event.target.value + ' state: '+this.state[event.target.name])
          
          };

  
          handleSubmit = async (event) => {
            event.preventDefault();
            if(this.state.loginAttempts > 0){
            const { email, password } = this.state;
            try {
              console.log(user)
              await auth.signInWithEmailAndPassword(email, password);
              const user = auth.currentUser
              console.log(user)
              // store.dispatch({
              //   type: UserActionTypes.SET_CURRENT_USER,
              //   payload:user
              // })
              console.log(user)
              if(user){
                this.setState({ email: "", password: "" });
                this.setState({notRoute: true});
              }

         
            } catch (error) {
              this.setState((prevState)=>({loginAttempts: prevState.loginAttempts-1}));
              alert("Login Failed. Please try again.");

            }
            this.setState({ email: "", password: "" });
          }else{
            this.setState({isDisabled: true});
                // Lock Login Button for 5 minutes and add 3 again to loginAttempts variable
                setTimeout(()=> {
                    this.setState({isDisabled: false})
                    this.setState({loginAttempts: 3})
                }, 30000);
                alert("Too many failed attempts, try again after 5 minutes.");
          }
      };
        
    
render(){return(

    


    <div className='grid'>
        <div>
        {this.state.notRoute && <Navigate to = '/' replace = {true}/>}
        <form  onSubmit={this.handleSubmit}>
        <h2>LOGIN</h2>
        <h3>PAGE</h3>

        <div className='container'>
        <InputComponent onChange={this.handleChange} label={'email'} placeholder={'i.e. JonnJonzz@email.com'} name={'email'} type={'email'} id={'email'} value = {this.state.email}/>
        <InputComponent onChange={this.handleChange} label={'password'} placeholder={'Jonn#191281'} name={'password'} type={'password'} id={'password'} value = {this.state.password}/>
     
        </div>
       
      
   

        <input type={'submit'} className='submit' value={'Login'} />
        </form>
        </div>
        <div>
        
        <div >
            
        <img src={sideimage} alt='register illustration' />
       
          <Link to='/register'>
          <h1 className='toSignInButton'>
          Don't have an account yet? Sign up
          
          </h1>
          </Link>
         
        </div>
        </div>
       
        
    </div>
)}
}
export default Login;