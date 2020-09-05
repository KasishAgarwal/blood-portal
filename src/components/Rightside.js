import React, { Component } from 'react'
import './Form.css'
import SignupForm from '../SignupForm'

class Rightside extends Component {
    render() {
        return (
            <div className='right-side'>
                <div className='register-image'>
                <SignupForm />
                </div>
            </div>
        )
    }
}

export default Rightside
