import React, { useContext } from 'react'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { AuthContext } from '../context/authContext.jsx';


function Home() {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(AuthContext); // Access the current user from Auth context
  const navigate = useNavigate();

  const cat = useLocation().search;

  useEffect(() => {
    const fetchPosts = async () => {
      try{
      const res = await axios.get(`http://localhost:8800/api/posts${cat}`);
      setPosts(res.data);
    } catch(err) {
      console.log(err);
    }
    };
    fetchPosts();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const textContent = doc.body.textContent || '';
    const words = textContent.split(' ').slice(0, 100).join(' ');
    return words + (words.length >= 100 ? '...' : '');
    
  }
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
    <div className='home'>
     <div className="posts">
      {posts.map(post => (
       <div className="post" key={post.id}>
        <div className="img">
          <img src={`./../upload/${post.img}`} alt="" />
          <div className="bg"></div>
        </div>
        <div className="content">
         
          <h1>{post.title}</h1>
          
          <p>{getText(post.desc)}</p>
          {/* <Link className='link' to={`/post/${post.idpost}`}> */}
          <button onClick={() => handleReadMore(post.idpost)}>Read More</button>
          {/* </Link> */}
        </div>
       </div> 
     )) }
      
    
     </div>
    </div>
  )
}

export default Home