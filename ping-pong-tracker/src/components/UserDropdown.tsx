import * as React from 'react'
import { Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

export default function UserDropdown(props) {
    
    const [home_user, set_home_user] = useState("")
    const [away_user, set_away_user] = useState("")

    if(props.type === 'away'){
        return (
            <FormControl sx={{ m: 1, minWidth: 160 }}>
                <InputLabel id="away-user">Away Player</InputLabel>
                    <Select
                    labelId="away-user-label"
                    id="away-user"
                    value={ home_user }
                    onChange={(e) => set_home_user(e.target.value)}
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
                value= { away_user }
                onChange={(e) => set_away_user(e.target.value)}
                >
                    <MenuItem value={'matt.mchatton@dialexa.com'}>Matt McHatton</MenuItem>
                    <MenuItem value={'matt.tucker@dialexa.com'}>Matt Tucker</MenuItem>
                    <MenuItem value={'brandon.harper@dialexa.com'}>Brandon Harper</MenuItem>
                </Select>
        </FormControl>
    )
}

