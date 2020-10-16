import React from 'react';

class OrgContentMaker extends React.Component {
    state = {
      boosts: 0
    }
    clickHandler = () => {
        this.setState({boosts: this.state.boosts + 1})
    }

    componentDidMount = () => {
      this.stopper = setInterval(() => {
        this.setState((prevState) => {return {boosts: prevState.boosts + 1}});
      } , 1000);
    }

    componentWillUnmount = () => {
      clearInterval(this.stopper);
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
          <button onClick={this.props.deleteFunc}> Delete Nonprofit</button>
        </div>
      )
    }
}

export default OrgContentMaker;
