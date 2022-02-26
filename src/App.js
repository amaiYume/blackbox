
import './App.css';
import './screens/registration/registraion'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Registration from './screens/registration/registraion';
import Login from './screens/login/login';
import ChangePass from './screens/changepassword/changepass';
import Home from './screens/home/home';


function App() {
  return (
    <div className="App">
       <h1>Black Box</h1>
      <Router>
        <Routes>
          <Route path = "/" element = {<Registration/>}  exact />
          <Route path = "/login" element = {<Login/>} exact />
          <Route path = "/changepassword" element = {<ChangePass/>} exact />
          <Route path = "/Home" element = {<Home />} exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
