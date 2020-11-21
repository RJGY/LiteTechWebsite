import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import DiscordOauth2 from 'discord-oauth2'

const SecondPage = () => (
  <Layout>
    <h1>Hi from the account page.</h1>
    <p>Account</p>
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

	let user = await oauth.getUser(result.access_token).then(console.log);

	
}

if (window.location.href.split('=', 2)[1] != null)
{
	getUser();
}


export default SecondPage
