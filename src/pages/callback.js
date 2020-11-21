import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import DiscordOauth2 from 'discord-oauth2'
import data from '../../js discord bot/members.json'

const SecondPage = () => (
  <Layout>
    <h1>Hi from the callback page.</h1>
    <p>Callback</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

async function getUser() {

	const oauth = new DiscordOauth2({
		clientId: "778425413654544385",
		clientSecret: "KUk30ciP8tPHovM4OoGn70HeSr2m6epC",
		redirectUri: "http://localhost:8000/callback",
	});

	console.log("Code: " + window.location.href.split('=', 2)[1]);

	let oauth2 = await oauth;

  	const request = oauth2.tokenRequest({
		code: window.location.href.split('=', 2)[1], 
		scope: "identify",
		grantType: "authorization_code",
	})

 	let result = await request; // wait until the promise resolves (*)

  	console.log("access_token: " + result.access_token)
  	setCookie("access_token", result.access_token, 1)
	const user = oauth2.getUser(result.access_token);

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
		window.location.href = "http://localhost:8000/account";
	}
	else
	{
		window.location.href = "http://localhost:8000/";
		alert("Sorry, your account is not a member of LiteTech");
	}

}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

if (window.location.href.split('=', 2)[1] != null && window.location.href.includes("callback"))
{
	getUser();
}


export default SecondPage
