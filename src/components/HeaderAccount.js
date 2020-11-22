import PropTypes from 'prop-types'
import React from 'react'
import DiscordOauth2 from 'discord-oauth2'
import data from '../../js discord bot/members.json'
const Header = props => (
  <header id="header" style={props.timeout ? { display: 'none' } : {}}>
    <div className="logo">
      <span className="icon fa-diamond"></span>
    </div>
    <div className="content">
      <div className="inner">
        <h1>LiteTech</h1>
        <p>
          Welcome #name
        </p>
      </div>
    </div>
    <nav>
      <ul>
        <li>
          <button
            onClick={() => {
              props.onOpenArticle('backup')
            }}
          >
            Backup Downloads
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              props.onOpenArticle('home')
              home()
            }}
          >
            Home
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              props.onOpenArticle('logout')
              logout()
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  </header>
)

Header.propTypes = {
  onOpenArticle: PropTypes.func,
  timeout: PropTypes.bool,
}

// delete cookies then redirect to index
function logout() {
  document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  home();
}

function home() {
  window.location.href = "http://localhost:8000/";
}

export default Header
