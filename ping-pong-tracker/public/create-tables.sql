create table players (
	guid UNIQUEIDENTIFIER NOT NULL PRIMARY KEY default NEWID(),
	username varchar(50) NOT NULL ,
	password varchar(25),
	player_name varchar(255),
	created_at datetime NOT NULL default GETDATE(),
	updated_at datetime NOT NULL default GETDATE(),
	active bit NOT NULL default 0
)

create table rankings (
	user_id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY FOREIGN KEY REFERENCES players(guid),
	wins int,
	losses int,
	player_rating float,
	updated_at datetime default GETDATE()
)

create table matches (
	match_guid UNIQUEIDENTIFIER NOT NULL PRIMARY KEY default NEWID(),
	home_user_id UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES players(guid),
	away_user_id UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES players(guid),
	match_date datetime NOT NULL ,
	winner UNIQUEIDENTIFIER  NOT NULL FOREIGN KEY REFERENCES players(guid)
)

create table rounds (
	match_id UNIQUEIDENTIFIER FOREIGN KEY REFERENCES matches(match_guid),
	round_number INT NOT NULL,
	home_score int NOT NULL,
	away_score int NOT NULL,
	PRIMARY KEY (match_id, round)
)
