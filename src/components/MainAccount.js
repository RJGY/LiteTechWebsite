import PropTypes from 'prop-types'
import React from 'react'

import pic01 from '../images/pic01.jpg'
import pic02 from '../images/pic02.jpg'
import pic03 from '../images/pic03.jpg'

class Main extends React.Component {
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
                    id="backup"
                    className={`${this.props.article === 'backup' ? 'active' : ''} ${
                        this.props.articleTimeout ? 'timeout' : ''
                        }`}
                    style={{ display: 'none' }}
                >
                    <h2 className="major">Backup Downloads</h2>
                    <span className="image main">
                        <img src={pic01} alt="" />
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
                    id="home"
                    className={`${this.props.article === 'home' ? 'active' : ''} ${
                        this.props.articleTimeout ? 'timeout' : ''
                        }`}
                    style={{ display: 'none' }}
                >
                    <h2 className="major">Home</h2>
                    <span className="image main">
                        <img src={pic01} alt="" />
                    </span>
                    <p>You are being redirected back to the home page. Please wait...</p>

                    {close}
                </article>
                <article
                    id="logout"
                    className={`${this.props.article === 'logout' ? 'active' : ''} ${
                        this.props.articleTimeout ? 'timeout' : ''
                        }`}
                    style={{ display: 'none' }}
                >
                    <h2 className="major">Logout</h2>
                    <div>
                        <ul className="actions">
                            <li>
                                <p>You are being logged out. Redirecting...</p>
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