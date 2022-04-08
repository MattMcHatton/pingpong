import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.getOpponent = this.getOpponent.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
  }

  render() {
    return (
      <div>
        <h3>Ping Pong</h3>
        <PingPongInfo users={this.state.users} />
        <form onSubmit={this.handleSubmit}>
          <div>
          <label>
            Who should you battle?
          </label>
          <button onclick="getOpponent()">
            Get Opponent
          </button>
          </div>
          <div>
          <label htmlFor="new-player">
            Add Opponents
          </label>
          <input
            id="new-player"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button onclick="hitExpress()">
            Add Opponent
          </button>
          </div>
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  getOpponent(e) {
    e.preventDefault();
    return
  }

  addPlayer(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newUser = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      users: state.users.concat(newUser),
      text: ''
    }));
  }
}

class PingPongInfo extends React.Component {
  render() {
    return (
      <ul>
        {this.props.users.map(user => (
          <li key={user.id}>{user.text}</li>
        ))}
      </ul>
    );
  }
}

export default App;
