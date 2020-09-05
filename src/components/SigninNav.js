import React, { Component } from 'react'
import Signin from '../Signin'
import Leftside from './Leftside'

export class SigninNav extends Component {
    render() {
        return (
            <div>
                <Leftside />
                <div className='right-side'>
                    <Signin />
                </div>
            </div>
        )
    }
}

export default SigninNav
