import React, { Component } from 'react'
import Sidebar from './components/Sidebar'
import Logout from './components/Logout'
import { withRouter } from 'react-router-dom'
import './components/Form.css'

class About extends Component {
    render() {
        const userName = JSON.parse(localStorage.getItem('userName'));
        return (
            <div><Sidebar /><Logout />
                <div className='success'>
                    <br /><br />
                    <h1 style={{ color: 'white' }}>Welcome</h1>
                    <br /><br />
                </div>
                <br /><br /><br /><br />
                <h2>According to a Survey</h2>
                <br />
                <h6>While about 38% of the population qualifies to give blood, </h6>
                <h6>according to Red Cross less than 10% are actually donating. </h6>
                <h6>Numbers are even lower in the rest of the world,  </h6>
                <h6>with some countries relying mostly on blood from people that ask money for their gesture. </h6>
                <h6>Because of the constant need for blood and the fact that supply can be at alarming low levels more often then not,</h6>
                <h6>blood collecting organizations are trying to reach as many possible donors they can.</h6>
                <br /><br />
                <h2> Hello {userName} !!!</h2>
                <br /><br />
                <button className='button' onClick={this.getImage} > See Your Profile Pic </button>

            </div>
        )
    }
    getImage = () => {
        const jwt = JSON.parse(localStorage.getItem('jwt'));
        return fetch('/demo/login/image', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + jwt
            }
        })
            .then(response => {
                return response.json()

            })
            .then(data => {
                console.log(data)
                return (
                    this.props.history.push({
                        pathname: "/seeProfile",
                        state: { data }
                    })
                )
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export default withRouter(About)