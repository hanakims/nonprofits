import React from 'react';
import './App.css';

import OrgContentMaker from './OrgContentMaker';

const listOfOrgs = ["Red Cross", "Doctors Without Borders"];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {
          listOfOrgs.map((x) => {
            return <OrgContentMaker name={x} key={x} />
          })
        }
      </header>
    </div>
  );
}


export default App;
