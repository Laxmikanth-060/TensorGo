import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Login.css';

const Login = () => {
  const [status, setStatus] = useState('login');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const loginHanlder=(e)=>{

  }

  const registerHanlder=(e)=>{

  }

  return (
    <div className="container">
      <div>
        {status === 'login' ? (
          <img src="/login.png" alt="login" className="img" />
        ) : (
          <img src="/register.png" alt="register" className="img" />
        )}
      </div>

      <div className='dataDiv'>
        <h4 id='title'>Welcome to AbhiTrainings..!</h4>
        <div className="buttonsDiv">
          <button
            className={status === 'login' ? 'button highlighted' : 'button'}
            onClick={() => setStatus('login')}
          >
            Login
          </button>
          <button
            className={status === 'register' ? 'button highlighted' : 'button'}
            onClick={() => setStatus('register')}
          >
            Register
          </button>
        </div>

        {status === 'login' ? (
          <div className="inputsDiv">
            <h5 className='subHeading'>login here with your existing credentials</h5>

            <form onSubmit={loginHanlder}>
            <div>
            <h4 className='inputTitle'>Username</h4>
              <input placeholder="Username" className="input" />
            </div>

            {/* <div>
            <h4 className='inputTitle'>Password</h4>
            <input type={passwordVisible ? 'text' : 'password'} className="input"/>
            <button  onClick={togglePasswordVisibility} className="password-toggle-button">
            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
             </button>
            </div> */}
        <h4 className='inputTitle'>Password</h4>
    <div className="password-toggle">
      <input type={passwordVisible ? 'text' : 'password'}  className="password-input" placeholder='Password'/>
      <button  onClick={togglePasswordVisibility} className="password-toggle-button" type='button'>
        <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
      </button>
    </div>

            <div className='bottomDiv'>
              <div><input type='checkbox' id='checkbox'/><h7>Remember me</h7></div>
              <div><h7>Forget Password?</h7></div>
            </div>

            <div className='LoginSignupButton'>
            <button className='button2'>Login</button>
            </div>

            </form>
          </div>
        ) : (
          <div className="inputsDiv">
            <h5 className='subHeading'>Register into the website with your credentials</h5>

            <form onSubmit={registerHanlder}>   
            <div>
              <h4 className='inputTitle'>Email</h4>
              <input placeholder="Email" className="input" />
            </div>
            <div>
            <h4 className='inputTitle'>Username</h4>
              <input placeholder="Username" className="input" />
            </div>

            {/* <div>
            <h4 className='inputTitle'>Password</h4>
              <input placeholder="Password" className="input" />
            </div> */}

<h4 className='inputTitle'>Password</h4>
    <div className="password-toggle">
      <input type={passwordVisible ? 'text' : 'password'}  className="password-input" placeholder='Password'/>
      <button  onClick={togglePasswordVisibility} className="password-toggle-button" type='button'>
        <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
      </button>
    </div>
          
            <div className='LoginSignupButton'>
            <button className='button2'>Register</button>
            </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
