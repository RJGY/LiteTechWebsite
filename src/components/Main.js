import PropTypes from 'prop-types'
import React from 'react'
import data from '../../js discord bot/members.json'
import pic01 from '../images/pic01.jpg'
import pic02 from '../images/pic02.jpg'
import pic03 from '../images/pic03.jpg'

class Main extends React.Component {
    getMembers() {
        const newData = data.forEach(db => {
            console.log(`${db.id}: ${db.tag}`);
            return (
                <p>
                    {db.id}
                </p>
            )
        });
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
                    <span className="image main">
                        <img src={pic02} alt="" />
                    </span>
                    <p>
                        Members here
                        <button
                            onClick={() => {
                              this.getMembers()
                            }}
                        >
                        </button>
                    </p>
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
                    <span className="image main">
                        <img src={pic03} alt="" />
                    </span>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur et adipiscing elit. Praesent
                        eleifend dignissim arcu, at eleifend sapien imperdiet ac. Aliquam
                        erat volutpat. Praesent urna nisi, fringila lorem et vehicula
                        lacinia quam. Integer sollicitudin mauris nec lorem luctus ultrices.
                        Aliquam libero et malesuada fames ac ante ipsum primis in faucibus.
                        Cras viverra ligula sit amet ex mollis mattis lorem ipsum dolor sit
                        amet.
                    </p>
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

export default Main