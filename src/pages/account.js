import React from 'react'
import { Link } from 'gatsby'

import HeaderAccount from '../components/HeaderAccount'
import MainAccount from '../components/MainAccount'
import Footer from '../components/Footer'

import Layout from '../components/layout'
import DiscordOauth2 from 'discord-oauth2'
import data from '../../js discord bot/members.json'


class Account extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isArticleVisible: false,
      timeout: false,
      articleTimeout: false,
      article: '',
      loading: 'is-loading'
    }
    this.handleOpenArticle = this.handleOpenArticle.bind(this)
    this.handleCloseArticle = this.handleCloseArticle.bind(this)
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount () {
    this.timeoutId = setTimeout(() => {
        this.setState({loading: ''});
    }, 100);
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount () {
    if (this.timeoutId) {
        clearTimeout(this.timeoutId);
    }
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleOpenArticle(article) {

    this.setState({
      isArticleVisible: !this.state.isArticleVisible,
      article
    })

    setTimeout(() => {
      this.setState({
        timeout: !this.state.timeout
      })
    }, 325)

    setTimeout(() => {
      this.setState({
        articleTimeout: !this.state.articleTimeout
      })
    }, 350)

  }

  handleCloseArticle() {

    this.setState({
      articleTimeout: !this.state.articleTimeout
    })

    setTimeout(() => {
      this.setState({
        timeout: !this.state.timeout
      })
    }, 325)

    setTimeout(() => {
      this.setState({
        isArticleVisible: !this.state.isArticleVisible,
        article: ''
      })
    }, 350)

  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (this.state.isArticleVisible) {
        this.handleCloseArticle();
      }
    }
  }

  render() {
    return (
      <Layout location={this.props.location}>
        <div className={`body ${this.state.loading} ${this.state.isArticleVisible ? 'is-article-visible' : ''}`}>
          <div id="wrapper">
            <HeaderAccount onOpenArticle={this.handleOpenArticle} timeout={this.state.timeout} name={getCookie("username")}/>
            <MainAccount
              isArticleVisible={this.state.isArticleVisible}
              timeout={this.state.timeout}
              articleTimeout={this.state.articleTimeout}
              article={this.state.article}
              onCloseArticle={this.handleCloseArticle}
              setWrapperRef={this.setWrapperRef}
            />
            <Footer timeout={this.state.timeout} />
          </div>
          <div id="bg"></div>
        </div>
      </Layout>
    )
  }
}

export default Account

async function checkValidUser() {

	const oauth = new DiscordOauth2({
		clientId: "778425413654544385",
		clientSecret: "KUk30ciP8tPHovM4OoGn70HeSr2m6epC",
		redirectUri: "http://localhost:8000/callback",
	});

	let oauth2 = await oauth;

 	let result = getCookie("access_token");

 	if (result == null || result == "")
	{
	    alert("Please log in first.");
	    window.location.href = "http://localhost:8000/";
	}

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

	if (count == 0)
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
