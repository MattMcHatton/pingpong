import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: '',
      responseToPost: ''
    };
  }
  
  callApi = async e => {
    e.preventDefault();
    const response = await fetch('/user');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: "Post" }),
    });
    const body = await response.text();
  };


  render() {
    return (
      <div>
        <h3>Ping Pong</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
          <label>
            Who should you battle?
          </label>
          <button onClick={this.callApi}>
            Get Opponent
          </button>
          </div>
          <div>
          <label htmlFor="new-player">
            Add Opponents
          </label>
          <input
            id="new-player"
          />
          <button onClick={this.callApi}>
            Add Opponent
          </button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
