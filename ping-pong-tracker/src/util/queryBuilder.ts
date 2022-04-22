class buildQuery {

    getUsers(username) {
        if (!username) return 'select * from players'
        //console.log('select * from players where username = ' + "'" + username + "'")
        return `select * from players where username = '${username}'`
    }

    addUser(username, active, player_name) {
        //add error handling
        //protect agains SQL injections / libraries and valid formatting
        return `insert into players () values ('${username}','${active}','${player_name}')`
    }

    getMatches(){
        return ''
    }

    insertMatch(){
        return ''
    }
    
}

function getGuid(username) {
    //get guid for queries
    return
}


module.exports = buildQuery;
