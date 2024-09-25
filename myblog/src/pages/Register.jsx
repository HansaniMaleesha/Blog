import React, { useState } from 'react';
import '../style.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check to ensure all fields are filled
    if (!inputs.username || !inputs.email || !inputs.password) {
      setErr("All fields are required.");
      return; // Stop the function if validation fails
    }

    try {
      const res = await axios.post("http://localhost:8800/api/auth/register", inputs);
      console.log(res);

      // Only navigate if the response indicates success
      if (res.status === 200) { // or another success status code as per your API
        navigate("/login");
      }
    } catch (err) {
      // Check if error is due to user already existing
      if (err.response && err.response.status === 409) { // Assuming 409 is the status code for conflict (user already exists)
        setErr("User already exists. Please try a different username or email.");
      } else {
        setErr(err.response?.data || "An error occurred during registration.");
      }
    }
  };

  return (
    <div className='auth'>
      <h1>
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold',fontSize: '50px',color: 'white' }}>Blog</span>
        &nbsp;
      <span style={{ fontFamily: 'Courier New, monospace', fontStyle: 'italic',fontSize: '50px',color: '#f4eded' }}>Quotes</span>
    </h1>
      <form onSubmit={handleSubmit}>
      <h1>
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold',fontSize: '20px',color: '#f39c12' }}>Sign up </span>
        &nbsp;
      <span style={{ fontFamily: 'Courier New, monospace', fontStyle: 'italic',fontSize: '15px',color: '#f4eded' }}>Quotes</span>
    </h1>
        <input required type="text" placeholder='username' name='username'style={{color: '#f4eded', textAlign: 'center'}} onChange={handleChange} />
        <input required type="email" placeholder='email' name='email' style={{color: '#f4eded', textAlign: 'center'}} onChange={handleChange} />
        <input required type="password" placeholder='password' name='password'style={{color: '#f4eded', textAlign: 'center'}} onChange={handleChange} />
        <button type="submit">Sign up</button>
        {err && <p>{err}</p>}
        <span style={{ fontSize: '12px',color: 'white' }}>Do you have an account? <Link to="/login">Login</Link></span>
      </form>
    </div>
  );
}

export default Register;
