import React from 'react';
import '../style.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext.jsx';
import { useContext } from 'react';
function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const {login}= useContext(AuthContext);
  
  
  const handleChange=e=>{
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}))

  }

  const handleSubmit=async (e)=>{
    e.preventDefault();

    if(!inputs.username || !inputs.password){
      setErr("Please fill username and password!");
      return;
    }

    try{
      const res = await login(inputs);
      console.log(res);
      navigate("/");
    
  } catch(err){
    const errorMessage = err.response && err.response.data ? err.response.data : "An unexpected error occurred.";
    setErr(errorMessage);
   
  }
}
  return (
    <div className='auth'>
    <h1>
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold',fontSize: '50px',color: 'white' }}>Blog</span>
        &nbsp;
      <span style={{ fontFamily: 'Courier New, monospace', fontStyle: 'italic',fontSize: '50px',color: '#f4eded' }}>Quotes</span>
    </h1>


      <form>
      <h1>
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold',fontSize: '20px',color: '#f39c12' }}>Login on</span>
        &nbsp;
      <span style={{ fontFamily: 'Courier New, monospace', fontStyle: 'italic',fontSize: '15px',color: '#f4eded' }}>Quotes</span>
    </h1>
        <input required type="text" placeholder='user name'name='username' style={{color: '#f4eded', textAlign: 'center'}} onChange={handleChange}  />
        <input required type="password" placeholder='password'name='password'style={{color: '#f4eded', textAlign: 'center'}} onChange={handleChange} />
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span style={{ fontSize: '12px',color: 'white' }}>Don't have an account? <Link to="/register">Sign up</Link></span>
        
      </form>

    </div>
  )
}

export default Login