import React from 'react'
import InputComponent from '../../components/input-component/input';
import'./registration.css'
import sideimage from  '../../assets/images/register-illustration.png';
import axios from 'axios';
import {Link} from 'react-router-dom';
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// const auth = getAuth();


class Registration extends React.Component{

    constructor() {
        super();
      
        this.setstate = {
          displayName: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmpassword:"",
        };
      }

      
      
      handleSubmit =  (event) => {
        event.preventDefault();
        const obj = {
          first_name:this.state.firstName,
          last_name:this.state.lastName,
          email:this.state.email,
          password:this.state.password,
          display_name:this.state.displayName,        
        };  
        
        if (!obj['password'].toUpperCase().includes(obj['first_name'].toUpperCase())){
          if (!obj['password'].toUpperCase().includes(obj['last_name'].toUpperCase())){
            if (!obj['password'].toUpperCase().includes(obj['display_name'].toUpperCase())){
              axios.post('http://localhost/register/createuser.php',obj)
              .then(res=> {
                alert("Registered Successfully!");
                console.log(res.data)
              })
              .catch(error => {
                console.log(error.response)
              });
            }else{
              alert('Password does not conform to the Password Policy!');
            }
          }else{
            alert('Password does not conform to the Password Policy!');
          }  
        }else{
          alert('Password does not conform to the Password Policy!');
        }


        this.setState ({
          displayName: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });

      };
    
      handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        
        this.setState({ [name]: value });
      };

      


render(){return(

    


    <div className='grid'>
        <div>
        <h1> Registration Page</h1>
        <form onSubmit={this.handleSubmit}>
        <h2>ACCOUNT</h2>
        <h3>DETAILS</h3>
        <div className='container'>
        <InputComponent label={'email'} placeholder={'i.e. JonnJonzz@email.com'} name={'email'} type={'email'} id={'email'} onChange={this.handleChange} value={this.email}/>
        <InputComponent label={'password'} placeholder={'Jonn#191281'} name={'password'} type={'password'} id={'password'} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$" onChange={this.handleChange} value={this.password}/>
        <InputComponent label={'confirm password'} placeholder={'confirm password must match initial password input'} name={'confirmPassword'} type={'password'} id={'confirm-password'} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$" onChange={this.handleChange} value={this.confirmPassword}/>
        </div>
       
        <h2>PERSONAL</h2>
        <h3>INFORMATION</h3>
        <div className='container'>
        <InputComponent label={'display name'} placeholder={'i.e. The07thBam'} name={'displayName'} type={'text'} id={'displayName'} onChange={this.handleChange} value={this.displayName}/>
        <InputComponent label={'first name'} placeholder={'i.e. Jonn'} name={'firstName'} type={'text'} id={'firstName'} onChange={this.handleChange} value={this.firstName}/>
        <InputComponent label={'last name'} placeholder={'i.e. Jonzz'} name={'lastName'} type={'text'} id={'lastName'} onChange={this.handleChange} value={this.lastName}/>
        <InputComponent label={'contact number'} placeholder={'i.e. 092398179763'} name={'contact-number'} type={'number'} id={'contact-number'} />
        </div>
   

        <input type={'submit'} className='submit' value={'Register'} />
        </form>
        </div>
        <div>
        
        <div className='container-fixed'>
            
        <img src={sideimage} alt='register illustration' />
        <Link to ={"/login"}>
          <h1 className='toSignInButton'>Already have an acccount? Sign in</h1>
        </Link>
        </div>
        </div>
       
        
    </div>
)}
}
export default Registration;