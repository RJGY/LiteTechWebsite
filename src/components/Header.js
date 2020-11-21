import PropTypes from 'prop-types'
import React from 'react'

const Header = props => (
  <header id="header" style={props.timeout ? { display: 'none' } : {}}>
    <div className="logo">
      <span className="icon fa-diamond"></span>
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
          <a href="https://discord.com/api/oauth2/authorize?client_id=778425413654544385&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fcallback&response_type=code&scope=identify">
            <button
              onClick={() => {
                props.onOpenArticle('login')
              }}
            >
              Login
            </button>
          </a>
        </li>
      </ul>
    </nav>
  </header>
)

Header.propTypes = {
  onOpenArticle: PropTypes.func,
  timeout: PropTypes.bool,
}

export default Header
