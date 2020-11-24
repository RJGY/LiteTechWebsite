// require the discord.js module
const Discord = require('discord.js');
// require config
const config = require('./config.json');
// import fs module in which writeFile function is defined. 
const fsLibrary = require('fs');

// create a new Discord client
const client = new Discord.Client();

// path to backup folder
const backupFolder = '../backups/';

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');

	getMembers();

	getBackups();
});

function getMembers() {
	// Get members from LiteTech with Member role.
	let guild = client.guilds.cache.get("732264415268700160");
	let members = guild.roles.cache.find(role => role.name === 'Member').members.map(m => m.user);
	//console.log(members);

	// Data which will need to add in a file. 
	let data = JSON.stringify(members);

	// Write data in 'members.json' . 
	fsLibrary.writeFileSync('members.json', data);
}

function getBackups() {
	// declare array.
	let arrayOfBackups = []
	// loop through items in backup folder.
	fsLibrary.readdirSync(backupFolder).forEach(file => {
	  	stats = fsLibrary.statSync(backupFolder + '/' + file)
	    // The timestamp when the file 
	    // is last modified and parse it into a json.   
	    const fileData = "{ \"name\": \"" + file + "\", \"date_modified\": \"" + stats.mtime.getTime() + "\" }";
	    const data = JSON.parse(fileData);
	   	arrayOfBackups.push(data);
	});

	//console.log(arrayOfBackups);

	//sort array
	arrayOfBackups.sort(function(a, b){return b.date_modified-a.date_modified})

	//console.log(arrayOfBackups);

	let latestBackups = arrayOfBackups.slice(0,5);

	// convert data to string
	let data = JSON.stringify(latestBackups);

	fsLibrary.writeFileSync('backups.json', data);
}

// login to Discord with your app's token
client.login(config.token);
