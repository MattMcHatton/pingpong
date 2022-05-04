import * as React from 'react'
import { Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';

class UserDropdown extends React.Component <{ type: String }, { type: String, home_user: String, away_user: String }> {
    
    default = {
        type: this.props.type,
        home_user: '',
        away_user: ''
    }

    constructor(props) {
        super(props);
        this.state = this.default
    }

    _handleHomeUserChange = (event: SelectChangeEvent) => {
        console.log(event.target.value)
        this.setState({home_user: event.target.value})
        console.log(this.state.away_user)
        return
      };
    
    _handleAwayUserChange = (event: SelectChangeEvent) => {
        return this.setState({away_user: event.target.value})
    };

    render(){
        if(this.props.type === 'away'){
            return (
                <FormControl sx={{ m: 1, minWidth: 160 }}>
                    <InputLabel id="away-user">Away Player</InputLabel>
                        <Select
                        labelId="away-user-label"
                        id="away-user"
                        value={this.state.home_user}
                        onChange={this._handleAwayUserChange}
                        >
                            <MenuItem value={'matt.mchatton@dialexa.com'}>Matt McHatton</MenuItem>
                            <MenuItem value={'matt.tucker@dialexa.com'}>Matt Tucker</MenuItem>
                            <MenuItem value={'brandon.harper@dialexa.com'}>Brandon Harper</MenuItem>
                        </Select>
                </FormControl>
            )
        }
        return (
            <FormControl sx={{ m: 1, minWidth: 160 }}>
                <InputLabel id="home-user">Home Player</InputLabel>
                    <Select
                    labelId="home-user-label"
                    id="home-user"
                    value={this.state.away_user}
                    onChange={this._handleHomeUserChange}
                    >
                        <MenuItem value={'matt.mchatton@dialexa.com'}>Matt McHatton</MenuItem>
                        <MenuItem value={'matt.tucker@dialexa.com'}>Matt Tucker</MenuItem>
                        <MenuItem value={'brandon.harper@dialexa.com'}>Brandon Harper</MenuItem>
                    </Select>
            </FormControl>
        )
    }
}

export default UserDropdown
