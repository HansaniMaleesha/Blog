import React from 'react';
import edit from "../img/edit.png";
import Delete from "../img/delete.png";
import {Link,useLocation,useNavigate} from "react-router-dom";
import Menu from "../Components/Menu";
import moment from 'moment';
import axios from 'axios';
import { useState,useEffect,useContext } from 'react';
import { AuthContext } from '../context/authContext.jsx';



function Single() {
  const [post, setPost] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const {currentUser} = useContext(AuthContext);
  console.log(currentUser);

  useEffect(() => {
    const fetchPost = async () => {
      try{
      const res = await axios.get(`http://localhost:8800/api/posts/${postId}`,{
        withCredentials: true
      });
      setPost(res.data);
    } catch(err) {
      console.log(err);
    }
    };
    fetchPost();
  }, [postId]);

  const getText = (html) => {
    return html;
  }
  
  

  const handledelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/api/posts/${postId}`,{
        withCredentials: true
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='single'>
      <div className="content">
         <img 
        src={post?.img} 
        alt="" 
        />
        <div className="users">
        {post.userImg &&<img   src={post.userImg}  alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username == post.username && <div className="edit">
            <Link to="/write?edit" state={post}>
            <img src={edit} alt="" />
            </Link>
            <img onClick={handledelete} src={Delete} alt="" />
          </div>}
          </div>
          <h1>{post.title}</h1>
         
          <p dangerouslySetInnerHTML={{ __html: getText(post.desc) }}></p>
          
        </div>
      
      <Menu cat={post.cat}/>

    </div>
  )
}

export default Single;