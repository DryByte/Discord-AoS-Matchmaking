# Ace of Spades Matchmaking Bot
### Brief introduction
A discord bot for managing competitive matches, where you are able to create a clan, play for better rankings, and make some friends while playing.

### Support
We are running an instance of this bot on FL's discord, where you will be able to play and test the bot with us.
* https://discord.gg/BJkMA49UQt

### Contributing
You can help with matchmaking development reporting bugs, making pull requests, giving new ideas or giving feedback. We are always looking for help.

### How to run your own instance
Its pretty easy to run your own instance for testing or for your own competitive servers.
What you will need:
1. A [MySQL server](https://mariadb.org/).
2. NodeJS.
3. Any text editor.

Copy **example.config.json** to **config.json**, and start editing the file. First you need a [discord bot token](https://discord.com/developers/applications/), then you need your database credentials, the server ip (if running on local machine leave it as localhost), username, password and database name.
Config example:
```json
{
	"DISCORD_TOKEN": "", // Your bot's token

	"DB_HOST": "localhost", // MySQL server IP
	"DB_PORT": 3306, // MySQL server Port - default 3306
	"DB_DATABASE": "aosdb", // MySQL database name
	"DB_USER": "aosuser", // MySQL user with access to the database
	"DB_PASSWORD": "", // Password for your MySQL user

	"SERVER_TYPES": { // Modes players will be able to play on
		"ctf5v5": { // Name used to show in discord
			"max_players": 10, // Max players for the queue
			"scripts": ["piqueserver.scripts.afk"], // Scripts enabled
			"game_mode": "ctf" // Gamemode that will be used for the game
		},
		"arena": {
			"max_players": 6,
			"scripts": [],
			"game_mode": "arena"
		}
	}
}
```

Place the gamemodes and scripts that will be used by your servers, into **server_scripts/** folder.

Copy **example.servers.json** to **servers.json**, and edit the file to setup the servers available to play.
```json
[
	{
		"identifier": "", // Server folder/id identifier
		"port_range": [25565, 32887], // Ports range supported by this server
		"proxy_port": 45000, // Proxy server port that will show on serverlist
	}
]
```