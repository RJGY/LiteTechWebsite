import PropTypes from 'prop-types'
import React from 'react'

import pic01 from '../images/pic01.jpg'
import pic02 from '../images/pic02.jpg'
import pic03 from '../images/pic03.jpg'
import memberData from '../../js discord bot/members.json'
import key from '../../js discord bot/youtubekey.json'

class Main extends React.Component {
    state = {
        externalData: null,
    };

    componentDidMount() {
        this._asyncRequest = getYoutubeVideos().then(
          externalData => {
            this._asyncRequest = null;
            this.setState({externalData});
          }
        );
    }

    componentWillUnmount() {
        if (this._asyncRequest) {
          this._asyncRequest.cancel();
        }
    }

    render() {
        let close = (
            <div
                className="close"
                onClick={() => {
                    this.props.onCloseArticle()
                }}
            ></div>
        )
        var youtubeVideo;
        if (this.state.externalData === null) {
            youtubeVideo = (
                <div>Loading</div>
            )
        } else {
            youtubeVideo = (
            <div>
                {this.state.externalData.items.map(({ id, snippet = {} }) => {
                    const { title, thumbnails = {}, resourceId = {} } = snippet;
                    const { medium } = thumbnails;
                    return (
                      <div key={id}>
                        <a href={`https://www.youtube.com/watch?v=${resourceId.videoId}`}>
                          <p>
                            <img width={medium.width} height={medium.height} src={medium.url} alt="" />
                          </p>
                          <p>{ title }</p>
                        </a>
                      </div>
                    )
                })}
            </div>  

            )
        }

        return (
            <div
                ref={this.props.setWrapperRef}
                id="main"
                style={this.props.timeout ? { display: 'flex' } : { display: 'none' }}
            >
                <article
                    id="about"
                    className={`${this.props.article === 'about' ? 'active' : ''} ${
                        this.props.articleTimeout ? 'timeout' : ''
                        }`}
                    style={{ display: 'none' }}
                >
                    <h2 className="major">About LiteTech</h2>
                    <span className="image main">
                        <img src={pic01} alt="" />
                    </span>
                    <p>
                        LiteTech is a relatively new technical server, that will update to each major stable release of the game.
                        You can keep up to date with our progress over on http://youtube.litetech.cf/
                    </p>
                    <p>
                        Our members are a collection of players throughout the world who enjoy creating anything from efficient 
                        arms to cool contraptions. In the end, we're just a bunch of idiots trying to have a good time.
                    </p>

                    {close}
                </article>

                <article
                    id="members"
                    className={`${this.props.article === 'members' ? 'active' : ''} ${
                        this.props.articleTimeout ? 'timeout' : ''
                        }`}
                    style={{ display: 'none' }}
                >
                    <h2 className="major">Current Members</h2>

                    <MemberList/>

                    {close}
                </article>

                <article
                    id="youtube"
                    className={`${this.props.article === 'youtube' ? 'active' : ''} ${
                        this.props.articleTimeout ? 'timeout' : ''
                        }`}
                    style={{ display: 'none' }}
                >
                    <h2 className="major">Youtube Videos</h2>

                    {youtubeVideo}

                    {close}
                </article>

                <article
                    id="discord"
                    className={`${this.props.article === 'discord' ? 'active' : ''} ${
                        this.props.articleTimeout ? 'timeout' : ''
                        }`}
                    style={{ display: 'none' }}
                >
                    <h2 className="major">Discord</h2>
                    <div>
                        <iframe title="Discord iFrame" src="https://discord.com/widget?id=732264415268700160&theme=dark" width="100%" height="500" allowtransparency="true" frameBorder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
                    </div>
                    {close}
                </article>

                <article
                    id="login"
                    className={`${this.props.article === 'login' ? 'active' : ''} ${
                        this.props.articleTimeout ? 'timeout' : ''
                        }`}
                    style={{ display: 'none' }}
                >
                    <h2 className="major">Login</h2>
                    <div>
                        <ul className="actions">
                            <li>
                                <a href="https://discord.com/api/oauth2/authorize?client_id=778425413654544385&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fcallback&response_type=code&scope=identify">
                                    <input type="button" value="Login via Discord" className="special" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    {close}
                </article>
            </div>
        )
    }
}

Main.propTypes = {
    route: PropTypes.object,
    article: PropTypes.string,
    articleTimeout: PropTypes.bool,
    onCloseArticle: PropTypes.func,
    timeout: PropTypes.bool,
    setWrapperRef: PropTypes.func.isRequired,
}

function MemberList() {
    const listItems = memberData.map((member) =>
        <li key={member.username}>
            {member.username}
        </li>
    );
    return (
        <ul>{listItems}</ul>
    );
}

const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';

async function getYoutubeVideos() {
  const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=PLUDyUa7vgsQlEST5MYSqTmc03U0Mr_Ihc&key=${key.key}`)
  const data = await res.json();
  return data;
}


export default Main