import React from 'react'
import InputComponent from '../../components/input-component/input';
import'./registration.css'
import sideimage from  '../../assets/images/register-illustration.png';
import {auth,} from '../../firebase/firebase'
import {Link, Navigate} from 'react-router-dom'
import {AiFillCheckCircle, AiOutlineCheckCircle} from 'react-icons/ai'
import S from 'string';
import { handleFirebaseSet } from '../../helper/firebase_set';
import { handeEncryption } from '../../helper/crytography_helper';
import store from '../../redux/store';
import { UserActionTypes } from '../../redux/user/user-type';
class Registration extends React.Component{

 
  
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      displayName: '',
      contact_number:'',
      firstName: '',
      lastName: '',
      showPasswordRequirements: false,
      passwordChecksPassed: 0,
      isUpper: false,
      isLower: false,
      isNotContainFirstName: true,
      isNotContainLastName: true,
      isGreaterThan8: false,
      isContainSymbol: false,
      isContainsFromDictionary:true,
      isNumeric: false,
    }
  }


  


  handleChange = async(event) => {
    
    await this.setState({ [event.target.name]: event.target.value });
    // console.log(event.target.name+' '+event.target.value + ' state: '+this.state[event.target.name])
    
   if(event.target.name ==='password'){
    console.log(event.target.value)
    if(event.target.value.length === 8){
      this.setState({isGreaterThan8isGreaterThan8: true})
      // console.log(this.state)
    }
    if(!S(event.target.value.toUpperCase()).contains(this.state.firstName.toUpperCase())){
      this.setState({isNotContainFirstName: true})
      // console.log(this.state)
    }else if(S(event.target.value.toUpperCase()).contains(this.state.firstName.toUpperCase())){
      this.setState({isNotContainFirstName: false})
      // console.log(this.state)
    }

   if(!S(event.target.value.toLowerCase()).contains(this.state.lastName.toLowerCase())){
      this.setState({isNotContainLastName: true})
      // console.log(this.state)
    }else if(S(event.target.value.toLowerCase()).contains(this.state.lastName.toLowerCase())){
      this.setState({isNotContainLastName: false})
      // console.log(this.state)
    }
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(specialChars.test(event.target.value)){
      this.setState({isContainSymbol: true})
    }else if(!specialChars.test(event.target.value)){
      this.setState({isContainSymbol: false})
    }

    let uCheck = false;
    let lCheck = false;

    for(let check = 0; check < event.target.value.length; check++ ){
      if (S(event.target.value[check]).isUpper()){
        uCheck = true;
      }

      if (S(event.target.value[check]).isLower()){
        lCheck = true;
      }
    }

    !uCheck?this.setState({isUpper: false}):this.setState({isUpper: true})
    !lCheck?this.setState({isLower: false}):this.setState({isLower: true})


    if(S(event.target.value).contains(1||2||3||4||5||6||7||8||9||0)){
      this.setState({isNumeric: true})
      // console.log(this.state)
    }else if(!S(event.target.value).contains(1||2||3||4||5||6||7||8||9||0)){
      this.setState({isNumeric: false})
    }


   }
  };
  handleSubmit =  async(event) => {

  


    event.preventDefault();
    console.log(this.state.email + ' in submit');
    console.log(this.state.confirmPassword + ' in submit');
    console.log(this.state.password + ' in submit');
    console.log(this.state.displayName + ' in submit'); 
    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert("password dont match");
      return;
    }
 
    try {
      console.log(email+ 'in try catch')
      console.log(password+ 'in try catch')
      console.log(store.getState()+'store')
      console.log('contact number' + this.state.contact_number )
      const { user } = await auth.createUserWithEmailAndPassword(
       
        email,
        password
      );
      console.log(auth.getCurrentUser)
     console.log(user)
     console.log(store.getState()+'store')
    
      store.dispatch({
                type: UserActionTypes.SET_CURRENT_USER,
                payload:user
              })
    console.log(store+'store')
     const userData = {
       'first_name': handeEncryption(this.state.firstName, 'encryption key 123') ,
       'last_name': handeEncryption( this.state.lastName, 'encryption key 123'),
       'display_name': handeEncryption(this.state.displayName, 'encryption key 123') ,
       'email':  handeEncryption(this.state.email, 'encryption key 123') ,
       'contact_number': handeEncryption(this.state.contact_number, 'encryption key 123') 
     }
     handleFirebaseSet(`users/${user.uid}`,userData)
   
    } catch (error) {
      console.error(error);
    }
   
  }

handleFocusOnPassword = () => (
  this.setState({showPasswordRequirements: true})
)

handleEscapePassword = () => {
  this.setState({showPasswordRequirements: false})
}

render(){return(

    


    <div className='grid'>
        <div>
  
      
        <form onSubmit={this.handleSubmit}>

        <h2>PERSONAL</h2>
        <h3>INFORMATION</h3>
        <div className='container'>
        <InputComponent label={'display name'} placeholder={'i.e. The07thBam'} name={'displayName'} type={'text'} id={'displayName'} onChange={this.handleChange} value={this.displayName}/>
        <InputComponent label={'first name'} placeholder={'i.e. Jonn'} name={'firstName'} type={'text'} id={'firstName'} onChange={this.handleChange} value={this.firstName}/>
        <InputComponent label={'last name'} placeholder={'i.e. Jonzz'} name={'lastName'} type={'text'} id={'lastName'} onChange={this.handleChange} value={this.lastName}/>
        <InputComponent label={'contact number'} placeholder={'i.e. 092398179763'} name={'contact_number'} type={'number'} id={'contact-number'} value={this.contact_number} onChange={this.handleChange} />
        </div>
   



        <h2>ACCOUNT</h2>
        <h3>DETAILS</h3>
        <div className='container'>
        <InputComponent label={'email'} placeholder={'i.e. JonnJonzz@email.com'} name={'email'} type={'email'} id={'email'} onChange={this.handleChange} value={this.email}/>
        <InputComponent onChange={this.handleChange} onBlur={this.handleEscapePassword} label={'password'} placeholder={'Jonn#191281'} onFocus={this.handleFocusOnPassword}  name={'password'} type={'password'} id={'password'}    value={this.password}/>
       
        {this.state.showPasswordRequirements? 
           <div>
           <progress value={this.state.passwordChecksPassed} max="8"> 32% </progress>
           <ul>
             <li> {this.state.isUpper? <AiFillCheckCircle className='icon'/> : <AiOutlineCheckCircle className='icon'/>} Contains capital letters</li><br/>
             <li>{this.state.isLower? <AiFillCheckCircle className='icon'/> : <AiOutlineCheckCircle className='icon'/>} Contains non-capital letters</li><br/>
             <li>{this.state.isContainSymbol? <AiFillCheckCircle className='icon'/> : <AiOutlineCheckCircle className='icon'/>} Contains symbols</li><br/>
             <li>{this.state.isNumeric? <AiFillCheckCircle className='icon'/> : <AiOutlineCheckCircle className='icon'/>}Contains numbers</li><br/>
             <li>{this.state.isNotContainFirstName? <AiFillCheckCircle className='icon'/>:<AiOutlineCheckCircle className='icon'/> } Must not contain first name</li><br/>
             <li>{this.state.isNotContainLastName? <AiFillCheckCircle className='icon'/>: <AiOutlineCheckCircle className='icon'/> } Must not contain last name</li><br/>
             <li>{this.state.isGreaterThan8isGreaterThan8? <AiFillCheckCircle className='icon'/> : <AiOutlineCheckCircle className='icon'/>}More than 8 characters long</li><br/>
             <li>{this.state.isContainsFromDictionary? <AiFillCheckCircle className='icon'/> : <AiOutlineCheckCircle className='icon'/>} Doest not contain a word from dictionary</li><br/>
           </ul>
           </div>  
           :
           null
      }
       
        <InputComponent label={'confirm password'} placeholder={'confirm password must match initial password input'} name={'confirmPassword'} type={'password'} id={'confirm-password'} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$" onChange={this.handleChange} value={this.confirmPassword}  onFocus={this.handleFocusOnPassword}  onBlur={this.handleEscapePassword} />
          
        {this.state.showPasswordRequirements? 
           <div>
           <progress value={this.state.passwordChecksPassed} max="8"> 32% </progress>
           <ul>
             <li> {this.state.password == this.state.confirmPassword? <AiFillCheckCircle className='icon'/> : <AiOutlineCheckCircle className='icon'/>} Is the same with password</li><br/>
          
           </ul>
           </div>  
           :
           null
      }
        </div>
       
     

        <input type={'submit'} className='submit' value={'Register'} />
        </form>
        </div>
        <div>
        
        <div >
            
        <img src={sideimage} alt='register illustration' />
        <Link to='/login'>

        <h1 className='toSignInButton'>Already have an acccount? Sign in</h1>
        </Link>
       
        </div>
        </div>
       
        
    </div>
)}
}
export default Registration;