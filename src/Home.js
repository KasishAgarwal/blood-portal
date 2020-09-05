import React, { Component } from 'react'
import Sidebar from './components/Sidebar'
import Logout from './components/Logout'
import { withRouter } from 'react-router-dom'
import './components/Form.css'
class Home extends Component {
    render() {
        return (
            <div><Sidebar /><Logout />
                <br /><br /> <br /><br />
                <h1 className='h1_tag'>Get here the details of users.</h1>
                <br /><br />
                <button className='button' onClick={this.getUsers} > Get All users </button>

            </div>
        )
    };
    getUsers = () => {
        const jwt = JSON.parse(localStorage.getItem('jwt'));
        return fetch('/demo/login/read', {
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
                // console.log(data)
                return (
                    this.props.history.push({
                        pathname: "/getSuccess",
                        state: { data }
                    })
                )
            })
            .catch(err => {
                console.log(err)
            })

    };

};
export default withRouter(Home)









