import React from 'react';

class OrgContentMaker extends React.Component {
    state = {
      boosts: 0
    }
    clickHandler = () => {
        this.setState({boosts: this.state.boosts + 1})
    }
    render = () => {
      return (
        <div>
          <hr />
          {this.props.name}
          <p>
            boosts: {this.state.boosts}
          </p>
          <button onClick={this.clickHandler}> Boost this NonProfit!</button>
        </div>
      )
    }
}

export default OrgContentMaker;
