import React from 'react';
import './App.css';

import OrgContentMaker from './OrgContentMaker';

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
