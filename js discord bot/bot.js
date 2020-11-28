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
const weeklyBackupFolder = 'weekly/';
const manualBackupFolder = 'manual/';

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
	// declare arrays.
	let arrayOfDailyBackups = [];
	let arrayOfManualBackups = [];
	let arrayOfWeeklyBackups = [];

	// loop through items in daily backup folder.
	fsLibrary.readdirSync(backupFolder).forEach(file => {
	  	let stats = fsLibrary.statSync(backupFolder + file)
	  	// Check if it is file or directory

	  	if (stats.isDirectory())
	  	{
	  		return;
	  	}

	    // The timestamp when the file 
	    // is last modified and parse it into a json.   
	    let fileData = "{ \"name\": \"" + file + "\", \"date_modified\": \"" + stats.mtime.getTime() + "\" }";
	    let data = JSON.parse(fileData);
	   	arrayOfDailyBackups.push(data);
	});

	// loop through items in manual backup folder.
	fsLibrary.readdirSync(backupFolder + manualBackupFolder).forEach(file => {
	  	let stats = fsLibrary.statSync(backupFolder + manualBackupFolder + file)
	  	// Check if it is file or directory

	  	if (stats.isDirectory())
	  	{
	  		return;
	  	}

	    // The timestamp when the file 
	    // is last modified and parse it into a json.   
	    let fileData = "{ \"name\": \"" + file + "\", \"date_modified\": \"" + stats.mtime.getTime() + "\" }";
	    let data = JSON.parse(fileData);
	   	arrayOfManualBackups.push(data);
	});

	// loop through items in weekly backup folder.
	fsLibrary.readdirSync(backupFolder + weeklyBackupFolder).forEach(file => {
	  	let stats = fsLibrary.statSync(backupFolder + weeklyBackupFolder + file)
	  	// Check if it is file or directory

	  	if (stats.isDirectory())
	  	{
	  		return;
	  	}

	    // The timestamp when the file 
	    // is last modified and parse it into a json.   
	    let fileData = "{ \"name\": \"" + file + "\", \"date_modified\": \"" + stats.mtime.getTime() + "\" }";
	    let data = JSON.parse(fileData);
	   	arrayOfWeeklyBackups.push(data);
	});


	//sort array
	arrayOfDailyBackups.sort(function(a, b){return b.date_modified-a.date_modified});
	arrayOfManualBackups.sort(function(a, b){return b.date_modified-a.date_modified});
	arrayOfWeeklyBackups.sort(function(a, b){return b.date_modified-a.date_modified});

	// Get first 5 results.
	let latestDailyBackups = arrayOfDailyBackups.slice(0,5);
	let latestManualBackups = arrayOfManualBackups.slice(0,5);
	let latestWeeklyBackups = arrayOfWeeklyBackups.slice(0,5);

	// convert data to string
	let dailyData = "{ \"daily\" : " + JSON.stringify(latestDailyBackups) + ",\n";
	let manualData = " \"manual\" : " + JSON.stringify(latestManualBackups) + ",\n";
	let weeklyData = " \"weekly\" : " + JSON.stringify(latestWeeklyBackups) + "}";

	// merge all data
	let data = dailyData + manualData + weeklyData;

	fsLibrary.writeFileSync('backups.json', data);
}

// login to Discord with your app's token
client.login(config.token);
