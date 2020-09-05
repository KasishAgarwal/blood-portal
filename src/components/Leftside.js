import React, { Component } from 'react'
import './Form.css'
import { Link } from 'react-router-dom';

class Leftside extends Component {

    render() {
        return (
            <div className='left-side'>
                <div className="hero-image">
                        <h1 className="welcome">Welcome !!!</h1>
                        <Link to="signup">
                            <button className='sign-up-btn'>SignUp </button>
                        </Link>
                        <Link to="signin">
                            <button className='sign-in-btn'>SignIn </button>
                        </Link>
                </div>
            </div>
        )
    }
}

export default Leftside
