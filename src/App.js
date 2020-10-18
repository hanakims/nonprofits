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
    Axios.post("http://localhost:5000/api/insert", {
      org: org, 
      post: post
    }) ;
    setPostList([
        ...postList, 
        {org: org, post: post},
      ]);
  }

  const deletePost = (org) => {
    Axios.delete(`http://localhost:5000/api/delete/${org}`);
  }

  const updatePost = (org) => {
    Axios.put('http://localhost:5000/api/update', {
      org: org, 
      post: newPost
    });
    setNewPost("");
  }

  return (
    <div className="App">
        <div className="Form">
          <label>Nonprofit:</label>
          <input 
            type="text" 
            name="org" 
            onChange={(input) => {
              setOrg(input.target.value);
            }}
          />
          <label>Post:</label>
          <input 
            type="text" 
            name="post" 
            onChange={(input) => {
              setPost(input.target.value);
            }}
          />

          <button onClick={submitPost}>add the nonprofit</button>

          {postList.map((x) => {
            return (
              <div>
                <div>Nonprofit: {x.org} | Post: {x.post}</div>
                <button onClick={() => {(deletePost(x.org))}}>delete</button>
                <input 
                  type="text" 
                  onChange={(input) => {setNewPost(input.target.value);
                }}
                />
                <button onClick={() => {(updatePost(x.org))}}>update</button>
              </div>
            );
          })}
          
        </div>
    </div>
  );
}

export default App;
/*

class App extends React.Component {
  state = {
    currentInput: "",
    listOfOrgs: ["Red Cross", "Doctors Without Borders"]
  }
  inputHandler = (event) => {
    this.setState({currentInput: event.target.value});
  }
  submitHandler = () => {
    let newCopy = this.state.listOfOrgs;
    newCopy.push(this.state.currentInput);
    this.setState({listOfOrgs: newCopy});
  }

  deleteOrg = (index) => {
    let newCopy = this.state.listOfOrgs;
    newCopy.splice(index, 1);
    this.setState({listOfOrgs: newCopy})
  }

  render = () => {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            add a nonprofit
          </p>
          <input value={this.state.currentInput} onChange={this.inputHandler}/>
          <button onClick={this.submitHandler}>add the nonprofit</button>
          {
            this.state.listOfOrgs.map((x, index) => {
              return <OrgContentMaker name={x} key={x} deleteFunc={() => {this.deleteOrg(index)}}/>
            })
          }
        </header>
      </div>
    );
  }
}

export default App;
*/