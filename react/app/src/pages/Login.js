import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import config from "./config";
import { useNavigate } from "react-router-dom";
import './css/LoginForm.css';
import { FaUserAlt, FaLock } from "react-icons/fa";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSingIn = async () => {
    try {
      const payload = {
        usr: username,
        pwd: password
      }
      const result = await axios.post(config.apiPath + '/api/user/login', payload);
      console.log(result);

      if (result.data.token !== undefined) {
        const token = result.data.token.access_token;
        localStorage.setItem('Lotto_token', token)
        navigate('/home')

        // const _config = {
        //   headers:{
        //     Authorization: 'Bearer '+ token
        //   }
        // }
        // const react2 = await axios.get(config.apiPath + '/api/user/info',_config );
        // console.log(react2.data);

      } else {
        Swal.fire({
          title: 'Login',
          text: result.data.message,
          icon: 'info'
        })
      }

    } catch (e) {
      Swal.fire({
        title: 'error',
        text: e,
        icon: 'error'
      })
    }

  }

  return (
    <>
      <div className='backcard'>
        <div className='wrapper'>
            <h1>Login to Backoffice</h1>
            <div className="input-box ">
              <input type='text' required onChange={(e) => setUsername(e.target.value)}  ></input><label>Username</label><FaUserAlt className='icon'/>
            </div>
            <div className="input-box">
              <input type='password' required  onChange={(e) => setPassword(e.target.value)}></input><label>Password</label><FaLock className='icon'/>
            </div>
            <div className='remember-forgot'>
              <label><input type='checkbox'></input>Remember me</label>
              <a href='#'>forgot password?</a>
            </div>
            <div className="bn" >
              <button onClick={handleSingIn}><span className="bn31span">Login</span> </button>
              
            </div>
            <div className='register-link'>
              <p>Don't have an account? <a href='#'>Register</a></p>
            </div>
        </div>
      </div>
    </>
  );
}
export default Login;
