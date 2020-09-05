import React, { Component } from 'react'
import Sidebar from './components/Sidebar'
import Logout from './components/Logout'
import { withRouter } from 'react-router-dom'
// import { Link } from 'react-router-dom'

class Help extends Component {
    constructor() {
        super()
        this.state = {
            username: '', password: '', commonError: ''
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value, commonError: ''
        })
    }
    validate = () => {
        let commonError = '';
        if (!this.state.username && !this.state.password) {
            commonError = "*Please enter all the fields.";
            this.setState({ commonError });
            return false
        }
        else return true
    };
    handleSubmit = (event) => {
        const { username, password } = this.state;
        event.preventDefault()
        const data = { username, password }
        const isValid = this.validate();
        if (isValid) {
            this.delete(data).then((data) => {
                if (!data.error) {
                    return (
                        this.props.history.push("/")
                    )
                }
                else {
                    console.log(data.error)
                    this.setState({ commonError: "*Username or password does not match." })
                }
            })
        }
    };
    delete = user => {
        const { username, password } = user;
        const jwt = JSON.parse(localStorage.getItem('jwt'));
        // console.log(jwt);
        // console.log("Bearer " + jwt)
        return fetch('/demo/login/delete/' + username, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + jwt
            },
            body: JSON.stringify({ "userName": username, "password": password })
        })
            .then(response => {
                return response.json()
            })
            .catch(err => {
                console.log(err)
            })

    };

    render() {
        return (
            <div><Sidebar /><Logout />
                <br></br><br></br>
                <h2 className='h1_tag'>Want to delete your account ?</h2>
                <br></br>
                <h3>If yes, Click Enter Details and Delete.</h3>
                <br></br>
                <form onSubmit={this.handleSubmit}>

                    <div style={{ color: 'red' }} className='error'>{this.state.commonError}</div>
                    <div>
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="username"
                            value={this.state.username}
                            onChange={this.handleChange}></input>
                        <div style={{ color: 'red' }} className='error'>{this.state.usernameError}</div>
                    </div>
                    <br />
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            value={this.state.password}
                            onChange={this.handleChange}></input>
                        <div style={{ color: 'red' }} className='error'>{this.state.passwordError}</div>
                    </div>
                    <br />
                    <br />
                    <button className='button' > Delete </button>
                </form>
            </div>
        )
    }
}

export default withRouter(Help)









