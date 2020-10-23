import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

import OrgContentMaker from './OrgContentMaker';

function App() {
  const [org, setOrg] = useState("");
  const [post, setPost] = useState("");
  const [postList, setPostList] = useState([])
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:5000/api/get").
      then((response) => {
        setPostList(response.data);
      });
  }, []);

  const submitPost = () => {
    console.log(postList);
    Axios.post("http://localhost:5000/api/insert", {
      org: org, 
      post: post,
    }) ;
    setPostList([
        ...postList, 
        {org: org, post: post}
      ]);
  }

  const deletePost = (org) => {
    Axios.delete(`http://localhost:5000/api/delete/${org}`);
  }

  const updatePost = (org) => {
    Axios.put('http://localhost:5000/api/update', {
      org: org, 
      post: newPost,
    });
    setNewPost("");
  }

  return (
    <div className="App">
      <div className="nav">
        <span className="title">Nonproft Network</span>
      </div>
      <div className="subheading">
        <p className="desc">No fluff, real change!</p>
      </div>
        <div className="Form">
          <label>Nonprofit:</label>
          <input 
            className="nonprofit-form"
            type="text" 
            name="org" 
            onChange={(input) => {
              setOrg(input.target.value);
            }}
          />
          <label>Post:</label>
          <textarea 
            className="post-form" 
            cols="40" 
            rows="5"
            onChange={(input) => { 
              setPost(input.target.value);
            }}
          />

          <button onClick={submitPost}>add the nonprofit post</button>

          {postList.map((x) => {
            return (
              <div className="post-card">
                <div className="header">{x.org}</div>
                <div className="post-text">{x.post}</div>
                <div className="timestamp">{x.date_updated}</div>
                <button className="delete-button round-button" onClick={() => {(deletePost(x.org))}}>X</button>
                <div className="update-card">
                  <input
                    className="update-form"
                    type="text" 
                    onChange={(input) => {setNewPost(input.target.value);
                  }}
                  />
                  <button className="update-button" onClick={() => {(updatePost(x.org))}}>update</button>
                </div>
              </div>
            );
          })}
          
        </div>
    </div>
  );
}

export default App;