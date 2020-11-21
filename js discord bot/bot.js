// require the discord.js module
const Discord = require('discord.js');
// require config
const config = require('./config.json');
// import fs module in which writeFile function is defined. 
const fsLibrary = require('fs')

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
	var guild = client.guilds.cache.get("732264415268700160");
	var members = guild.roles.cache.find(role => role.name === 'Member').members.map(m => m.user);
	console.log(members);

	// Data which will need to add in a file. 
	let data = JSON.stringify(members);

	// Write data in 'members.json' . 
	fsLibrary.writeFileSync('members.json', data);
});

// login to Discord with your app's token
client.login(config.token);
