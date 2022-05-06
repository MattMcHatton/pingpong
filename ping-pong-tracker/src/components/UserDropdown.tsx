import * as React from 'react'
import { Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material'
import { useState } from 'react'
import useAsyncEffect from 'use-async-effect'

export default function UserDropdown(props) {
    
    const [users, set_users] = useState([])
    const [home_user, set_home_user] = useState("")
    const [away_user, set_away_user] = useState("")
    
    useAsyncEffect(async () => await getUsers(), [])

    async function getUsers() {
        let users = await fetch('/user')
        let users_json = await users.json()
        return set_users(users_json)
    }

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
                        <MenuItem>
                            { users.map( (x,y) => 
                                <option key={y}>{x}</option> )
                            }
                        </MenuItem> 
                        {/* <MenuItem value={'matt.mchatton@dialexa.com'}>Matt McHatton</MenuItem>
                        <MenuItem value={'matt.tucker@dialexa.com'}>Matt Tucker</MenuItem>
                        <MenuItem value={'brandon.harper@dialexa.com'}>Brandon Harper</MenuItem> */}
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

