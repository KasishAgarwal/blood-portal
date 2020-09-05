import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class Logout extends Component {
    signout = (next) => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("jwt")
            localStorage.removeItem("userName")
        }
    }
    render() {
        const userName = JSON.parse(localStorage.getItem('userName'));
        return (
            <div className='logout'>
                <br></br>
                <p style={{ color: 'white' }}> {userName}</p>
                <Link to='/' onClick={this.signout}><button>Log out</button></Link>
            </div>
        )
    }
}
export default Logout



