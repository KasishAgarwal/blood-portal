import React, { Component } from 'react'
import './Form.css'
import { Link } from 'react-router-dom'
class Sidebar extends Component {
    render() {
        return (
            <div className='sidebar'>
                <ul>
                    <Link to='/about'>
                        <li> <span role="img" aria-label="star">⭐️</span> About</li></Link>
                    <Link to='/home'>
                        <li> <span role="img" aria-label="star">🏡</span> Home</li></Link>
                    <Link to='/contact'>
                        <li> <span role="img" aria-label="star">📋</span> Contact</li></Link>
                    <Link to='/calender'>
                        <li> <span role="img" aria-label="star">🗓</span> Calender</li></Link>
                    <Link to='/help'>
                        <li> <span role="img" aria-label="star">❓</span> Help</li></Link>
                </ul>
            </div>
        )
    }
}

export default Sidebar