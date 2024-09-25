import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function Write() {
  const state = useLocation().state;
  // Correct state initialization
  const [title, setTitle] = useState(state?.title || "");
  const [value, setValue] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate();

  // Function to upload image
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("http://localhost:8800/api/upload", formData);
      return res.data; // Return the image URL
    } catch (err) {
      console.log(err);
    }
  };

  // Handle post creation or update
  const handleClick = async (e) => {
    e.preventDefault();
    const imgurl = file ? await upload() : "";

    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      const config = {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
        },
      };

      if (state) {
        // Update post
        await axios.put(`http://localhost:8800/api/posts/${state.id}`, {
          
          title,
          desc: value,
          cat,
          img: imgurl || state.img, // Keep existing image if none is uploaded
          idpost:state.id
        }, config);
      } else {
        // Create new post
         await axios.post('http://localhost:8800/api/posts', {
          title,
          desc: value,
          cat,
          img: imgurl,
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        }, config);
      }

      // Navigate to home after publishing
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='add'>
      <div className="content">
        {/* Input for title */}
        <input type="text" value={title} placeholder="Title" onChange={e => setTitle(e.target.value)} />
        <div className="editorContainer">
          {/* Rich text editor for the description */}
          <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          {/* Input for file upload */}
          <input style={{ display: "none" }} type="file" id="file" onChange={e => setFile(e.target.files[0])} />
          <label className="file" htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          {/* Category selection */}
          <div className="cat">
            <input type="radio" checked={cat === "art"} name='cat' value='art' id='art' onChange={e => setCat(e.target.value)} />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "cinema"} name='cat' value='cinema' id='cinema' onChange={e => setCat(e.target.value)} />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input type="radio" name='cat' checked={cat === "design"} value='design' id='design' onChange={e => setCat(e.target.value)} />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input type="radio" name='cat' checked={cat === "economy"} value='economy' id='economy' onChange={e => setCat(e.target.value)} />
            <label htmlFor="economy">Economy</label>
          </div>
          <div className="cat">
            <input type="radio" name='cat' checked={cat === "technology"} value='technology' id='technology' onChange={e => setCat(e.target.value)} />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input type="radio" name='cat' value='food' checked={cat === "food"} id='food' onChange={e => setCat(e.target.value)} />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Write;
