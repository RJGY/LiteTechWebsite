import PropTypes from 'prop-types'
import React from 'react'
import DiscordOauth2 from 'discord-oauth2'
import data from '../../js discord bot/members.json'
import icon from '../images/icon.png'
const Header = props => (
  <header id="header" style={props.timeout ? { display: 'none' } : {}}>
    <div className="logo">
      <span className="icon">
        <img src={icon} alt="" height="100%" width="100%"/>
      </span>
    </div>
    <div className="content">
      <div className="inner">
        <h1>LiteTech</h1>
        <p>
          Welcome to LiteTech
        </p>
      </div>
    </div>
    <nav>
      <ul>
        <li>
          <button
            onClick={() => {
              props.onOpenArticle('about')
            }}
          >
            About
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              props.onOpenArticle('members')
            }}
          >
            Members
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              props.onOpenArticle('youtube')
            }}
          >
            Youtube
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              props.onOpenArticle('discord')
            }}
          >
            Discord
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              autoLogin();
            }}
          >
            Login
          </button>
        </li>
      </ul>
    </nav>
  </header>
)

async function autoLogin() {

  let result = getCookie("access_token");

  if (result == null || result == "")
  {
    window.location.href = "https://discord.com/api/oauth2/authorize?client_id=778425413654544385&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fcallback&response_type=code&scope=identify";
  }

  const oauth = new DiscordOauth2({
    clientId: "778425413654544385",
    clientSecret: "KUk30ciP8tPHovM4OoGn70HeSr2m6epC",
    redirectUri: "http://localhost:8000/callback",
  });

  let oauth2 = await oauth;

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
    window.location.href = "http://localhost:8000/account";
  }
  else
  {
    window.location.href = "https://discord.com/api/oauth2/authorize?client_id=778425413654544385&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fcallback&response_type=code&scope=identify";
    alert("Sorry, your account is not a member of LiteTech. Try login to an account with LiteTech");
  }
}

function getCookie(cname) {
    const name = cname + "=";
    const ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
  return "";
}

//https://discord.com/api/oauth2/authorize?client_id=778425413654544385&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fcallback&response_type=code&scope=identify

Header.propTypes = {
  onOpenArticle: PropTypes.func,
  timeout: PropTypes.bool,
}

export default Header
