import React, { Component } from 'react'
import SignupForm from '../SignupForm.js'
import Leftside from './Leftside'

export class SignupNav extends Component {
    render() {
        return (
            <div>
                <Leftside />
                <div className='right-side'>
                    <SignupForm />
                </div>
            </div>
        )
    }
}

export default SignupNav

