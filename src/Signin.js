import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
class Signin extends Component {
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
        const user = { username, password }
        const isValid = this.validate();
        if (isValid) {
            this.signin(user).then((data) => {
                if (!data.error) {
                    localStorage.setItem("jwt", JSON.stringify(data.token));
                    localStorage.setItem("userName", JSON.stringify(data.userName));
                    return (
                        this.props.history.push("/dashboard")
                    )
                }
                else {
                    this.setState({ commonError: "*User does not exist." })
                }
            })
        }
    };

    signin = user => {
        const { username, password } = user;
        return fetch('/demo/login/login', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
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
            <div className= "register-image">
            <form onSubmit={this.handleSubmit}>
                <br />
                <h1 className='h1_tag'>Login</h1>
                <br />
                <br />
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
                <button className='button' > Sign In </button>
            </form>
            </div>
        )
    }
}
export default withRouter(Signin)

// import React, { Component } from 'react'

// class Signin extends Component {

//     constructor()
//     {
//         super()
//         this.state = { 
//             username:'',
//             password:''

//         }
//     }

//     handleUsernameChange = (event) => {
//         this.setState ({
//             username : event.target.value
//         })
//     }
//     handlePasswordChange = (event) => {
//         this.setState ({
//             password : event.target.value
//         })
//     }

//     handleSubmit = (event) => {
//         event.preventDefault();
//     }

//     render() {
//         return(
//             <form onSubmit = {this.handleSubmit}>
//                 <br/>
//                  <h1 className='h1_tag'>Login</h1>
//                  <br/>
//                  <br/>

//             <div>
//                 <label>Username</label>
//                 <input 
//                 type="text" 
//                 placeholder="username"
//                 value={this.state.username}
//                 onChange={this.handleUsernameChange}></input>

//             </div>
//             <br/>

//             <div>
//                 <label>Password</label>
//                 <input 
//                 type="password" 
//                 placeholder="password"
//                 value={this.state.password}
//                 onChange={this.handlePasswordChange}></input>

//             </div>
//             <br/>
//             <br/>

//             <button className='button'> Sign In </button>
//             </form>
//                 )
//     }
// }
// export default Signin