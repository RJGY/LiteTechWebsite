import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import DiscordOauth2 from 'discord-oauth2'
import data from '../../js discord bot/members.json'
const Account = () => (
  <Layout>
    <h1>Hi from the account page.</h1>
    <p>Account</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

async function checkValidUser() {

	const oauth = new DiscordOauth2({
		clientId: "778425413654544385",
		clientSecret: "KUk30ciP8tPHovM4OoGn70HeSr2m6epC",
		redirectUri: "http://localhost:8000/callback",
	});

	console.log("Code: " + window.location.href.split('=', 2)[1]);

	let oauth2 = await oauth;

 	let result = getCookie("access_token");

  	console.log("access_token: " + result);

	const user = oauth2.getUser(result);

	let userData = await user; // wait until the promise resolves (*)

	console.log("user data: " + userData.username + "#" + userData.discriminator);

	let count = 0;
	data.forEach(user => {
    	if (user.id == userData.id)
    	{
    		count = 1;
    	}
    });

	if (count == 1)
	{
		alert("Yea it works");
	}
	else
	{
		window.location.href = "http://localhost:8000/";
		alert("Sorry, your account is not a member of LiteTech");
	}
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

if (window.location.href.includes("account"))
{
	checkValidUser();
}

export default Account
