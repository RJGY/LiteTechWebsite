import PropTypes from 'prop-types'
import React from 'react'

import pic01 from '../images/pic01.png'
import pic02 from '../images/pic02.png'
import pic03 from '../images/pic03.png'

import backup from '../../js discord bot/backups.json'
import FileSaver from 'file-saver'

const dailyPath = 'Z:/gatsby-projects/litetechwebsite/backups/';
const manualPath = 'Z:/gatsby-projects/litetechwebsite/backups/manual/';
const weeklyPath = 'Z:/gatsby-projects/litetechwebsite/backups/weekly/';

class Main extends React.Component {
    downloadFile(file, path) {
        FileSaver.saveAs(path + file, file);
    }

    render() {
        let backups = (
            <div>
                <h3 className="major">Manual Backups</h3>
                {backup.manual.map(file => {
                    return (
                        <div key={file.date_modified}>
                            <button
                                onClick={() => {
                                  this.downloadFile(file.name, manualPath)
                                  console.log(manualPath + file.name)
                                }}
                            >
                                {file.name}
                            </button>
                        </div>
                    )
                })}
                <p></p>

                <h3 className="major">Daily Backups</h3>
                {backup.daily.map(file => {
                    return (
                        <div key={file.date_modified}>
                            <button
                                onClick={() => {
                                  this.downloadFile(file.name, dailyPath)
                                  console.log(dailyPath + file.name)
                                }}
                            >
                                {file.name}
                            </button>
                        </div>
                    )
                })}
                <p></p>

                <h3 className="major">Weekly Backups</h3>
                {backup.weekly.map(file => {
                    return (
                        <div key={file.date_modified}>
                            <button
                                onClick={() => {
                                  this.downloadFile(file.name, weeklyPath)
                                  console.log(weeklyPath + file.name)
                                }}
                            >
                                {file.name}
                            </button>
                        </div>
                    )
                })}
                <p></p>
            </div>
        )

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
                    {backups}

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