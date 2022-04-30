import React from 'react';
import * as dotenv from 'dotenv'
import './App.css';
import Button from '../node_modules/@mui/material/Button';
import TextField from '../node_modules/@mui/material/TextField'

class App extends React.Component <{}, any> {
  
  default = {
    showRecordButton: true,
    showScheduleButton: true,
    recordMatch: false,
    scheduleMatch: false,
    rounds: []
  }

  constructor(props) {
    super(props);
    this.state = this.default;
  }
  
  _updateScreen = (event: string) => {
    if(event === 'record') return this.setState({showScheduleButton: false, recordMatch: true})
    if(event === 'schedule') return this.setState({showRecordButton: false, scheduleMatch: true})
    return this.setState(this.default)
  }

  _handleSubmit = async e => {
    const players = {
      home_player: (document.getElementById('home-user') as HTMLTextAreaElement).value,
      away_player: (document.getElementById('away-user') as HTMLTextAreaElement).value,
    }

    const rounds = [
      [(document.getElementById('home-score-r1') as HTMLTextAreaElement).value, (document.getElementById('away-score-r1') as HTMLTextAreaElement).value],
      [(document.getElementById('home-score-r2') as HTMLTextAreaElement).value, (document.getElementById('away-score-r2') as HTMLTextAreaElement).value],
      [(document.getElementById('home-score-r3') as HTMLTextAreaElement).value, (document.getElementById('away-score-r3') as HTMLTextAreaElement).value]
    ]

    const matchRequestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        home_user: players.home_player,
        away_user: players.away_player,
        match_date: new Date()
      })
    };

    let response: any = await fetch('/match', matchRequestOptions)

    if (response.status != 201) {
      console.log('Error')
      return this.setState(this.default)
    }

    let json = await response.json()

    let matchGuid = json['guid']
    let home_player = json['home_user']
    let away_player = json['away_user']
    
    console.log(matchGuid)
    console.log(home_player)
    console.log(away_player)
    let roundRequestOptions
    
    for(let round_number=0; round_number<rounds.length; round_number++) {
      if(rounds[round_number][0] && rounds[round_number][1]){
        roundRequestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            round_number: round_number+1,
            home_score: Number(rounds[round_number][0]),
            away_score: Number(rounds[round_number][1])
          })
        };
        let roundResponse: any = await fetch(`/match/${matchGuid}/round`, roundRequestOptions)
      }
    }

    function getWinner(rounds){
      let home_count = 0
      let away_count = 0
      rounds.forEach(round => {
        if(round[0]>round[1]){
          home_count+=1
        } else {
          away_count+=1
        }
      });
      return (home_count > away_count) === true ? home_player : away_player
    }

    const getWinnerRequestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    let winner: any = await fetch(`/user/${getWinner(rounds)}`)
    winner = await winner.json()
    let winnerGuid = winner['guid']

    const winnerUpdateRequestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        winner: winnerGuid,
        match_date: new Date()
      })
    };

    let winnerResponse: any = await fetch(`/match/${matchGuid}`, winnerUpdateRequestOptions)


    return this.setState(this.default)

  }

  callApi = async e => {
    e.preventDefault();
    const response = await fetch('/user');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  // handleSubmit = async e => {
  //   e.preventDefault();
  //   const response = await fetch('/user', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ post: "Post" }),
  //   });
  //   const body = await response.text();
  //   console.log(body)
  // };


  render() {
    return (
      <div>
        <h3>Ping Pong</h3>
        <form onSubmit={this._handleSubmit}>
          <div>
          { this.state.showRecordButton && <Button  variant="contained" onClick={this._updateScreen.bind(null, 'record')}>Record a match</Button> } 
          </div>
          {
            (this.state.recordMatch) &&
            <div>
              <TextField id="home-user" label="Home Player" variant="standard" required />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <TextField id="away-user" label="Away Player" variant="standard" required />
            <div>
              <TextField id="home-score-r1" label="Round 1 Home Score" variant="standard" required />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <TextField id="away-score-r1" label="Round 1 Away Score" variant="standard" required />
            </div>
            <div>
              <TextField id="home-score-r2" label="Round 2 Home Score" variant="standard" required />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <TextField id="away-score-r2" label="Round 2 Away Score" variant="standard" required />
            </div>
            <div>
              <TextField id="home-score-r3" label="Round 3 Home Score" variant="standard" />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <TextField id="away-score-r3" label="Round 3 Away Score" variant="standard" />
            </div>
            <Button variant="contained" onClick={this._handleSubmit}>Submit Match</Button>
            </div>
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
