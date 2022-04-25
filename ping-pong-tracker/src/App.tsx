import React from 'react';
import './App.css';
import Button from '../node_modules/@mui/material/Button';

class App extends React.Component <{}, any> {
  
  constructor(props) {
    super(props);
    this.state = {
      showRecordButton: true,
      showScheduleButton: true,
      recordMatch: false,
      scheduleMatch: false,
    };
  }
  
  _updateScreen = (event: string) => {
    if(event === 'record') return this.setState({showScheduleButton: false, recordMatch: true})
    if(event === 'schedule') return this.setState({showRecordButton: false, scheduleMatch: true})
    return this.setState({showScheduleButton: true, showRecordButton: true, recordMatch: false, scheduleMatch: false})
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
    console.log(body)
  };


  render() {
    return (
      <div>
        <h3>Ping Pong</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
          { this.state.showRecordButton && <Button  variant="contained" onClick={this._updateScreen.bind(null, 'record')}>Record a match</Button> } 
          </div>
          {
            this.state.recordMatch &&
            <p>hidy ho</p>
          }
          <div>
          { this.state.showScheduleButton && <Button variant="contained" onClick={this._updateScreen.bind(null, 'schedule')}>Schedule a match</Button> }
          </div>
          <div>
          <Button variant="contained" onClick={this._updateScreen.bind(null, 'back')}>Back</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
