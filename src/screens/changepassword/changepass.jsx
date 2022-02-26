import React from 'react'
import InputComponent from '../../components/input-component/input';
import'./changepass.css'
import sideimage from  '../../assets/images/login-illustration.png';
import axios from 'axios';
import {Navigate} from 'react-router-dom';



class ChangePass extends React.Component{


    constructor() {
        super();
        this.state = {
          email: "",
          password: "",
          notRoute: true,
          notRegister: true,

        };
      }

      handleSubmit = (e) => {
        e.preventDefault();
        const obj = {
            email:this.state.email,
            password: this.state.password,
        }

        axios.post('http://localhost/register/insertpassword.php', obj)
        .then(res => {
            console.log(res.data);
            if(res.data === '200'){
                alert('Success');
            }else if(res.data === '402'){
                alert('Fail, you already used this password');
            }else{
                alert('Fail');
                console.log(res.data);
            }
            this.setState({notRoute: false})
        })
        .catch(error => {
            console.log(error.response);
            alert("Error");
        })
      }

      changeHandler = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }



render(){
    return(




    <div className='grid'>
        <div>

        <form className='form' onSubmit={this.handleSubmit}>
        <h2>CHANGE</h2>
        <h3>PASSWORD</h3>
        <div className='container'>
        <InputComponent onChange = {this.changeHandler} label={'email'} placeholder={'i.e. JonnJonzz@email.com'} name={'email'} type={'email'} id={'email'}/>
        <InputComponent onChange = {this.changeHandler} label={'new password'} placeholder={'Jonn#191281'} name={'password'} type={'password'} id={'confirmpassword'}/>
        </div>




        <input type={'submit'} className='submit' value={'Change'}/>
        </form>
        </div>
        <div>

        <div className='container-fixed'>

        <img src={sideimage} alt='register illustration' />
        <h1 onClick = {()=>{this.setState({notRegister:false})}} className='toSignInButton'>Don't have an account yet? Sign up</h1>
        {!this.state.notRoute && <Navigate to="/login" replace ={true}/>}
        {!this.state.notRegister && <Navigate to="/" replace ={true}/>}
        </div>
        </div>


    </div>
)}
}
export default ChangePass; 