import React,{ useContext }  from 'react'
import axios from 'axios';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext.jsx';


export const Menu = ({cat}) => {

  const [posts,setposts] = useState([]);
  const { currentUser } = useContext(AuthContext); // Access the current user from Auth context
  const navigate = useNavigate();


  useEffect(()=>{
    const fetchData = async () => {
    try{
      const res = await axios.get(`http://localhost:8800/api/posts/?cat=${cat}`);
      setposts(res.data);
    } catch(err) {
      console.log(err);
    }
  };
  fetchData();
  },[cat]);

  const handleReadMore = (postId) => {
    if (!currentUser) {
      // If the user is not logged in, redirect to the login page
      navigate('/login');
    } else {
      // If logged in, navigate to the post page
      navigate(`/post/${postId}`);
    }
  };
  return (
    <div className='menu'>
        <h1>Other posts you may like</h1>

        {posts.map(post => (
          <div className="post" key={post.id}>
            <img src={post.image} alt="" />
            <h2>{post.title}</h2>
            <button onClick={() => handleReadMore(post.idpost)}>Read More</button>
          </div>
        ))}
    </div>
  )
}

export default Menu;