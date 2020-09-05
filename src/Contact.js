import React, { Component } from 'react'
import Sidebar from './components/Sidebar'
import Logout from './components/Logout'
import { withRouter } from 'react-router-dom'

class Contact extends Component {
    constructor() {
        super()
        this.state = {
            firstname: '', lastname: '', email: '', contact: '', blood_group: '', skill: '',
            username: '', password: '', firstnameError: '', lastnameError: '', emailError: '', skillError: '',
            contactError: '', blood_groupError: '', usernameError: '', passwordError: '', commonError: ''
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value, firstnameError: '', lastnameError: '', emailError: '', skillError: '',
            contactError: '', blood_groupError: '', usernameError: '', passwordError: '', commonError: ''
        })
    }
    validate = () => {
        let firstnameError = ''; let lastnameError = ''; let emailError = ""; let contactError = '';
        let blood_groupError = ''; let skillError = ''; let usernameError = ''; let passwordError = ''; let commonError = '';
        if (!this.state.firstname && !this.state.lastname && !this.state.email && !this.state.contact && !this.state.skill && !this.state.username && !this.state.password) {
            commonError = "*Please enter all the fields.";
            this.setState({ commonError });
            return false
        }
        else if (this.state.firstname.length < 3) {
            firstnameError = "*Less than 3 characters not allowed.";
            this.setState({ firstnameError });
            return false
        }
        else if (this.state.lastname.length < 3) {
            lastnameError = "*Less than 3 characters not allowed.";
            this.setState({ lastnameError });
            return false
        }
        else if (!this.state.email.match(/^([a-zA-Z0-9_.]+)@([a-zA-Z0-9]+).([a-zA-Z]{2,5})$/)) {
            emailError = "*Please enter valid email-ID.";
            this.setState({ emailError });
            return false
        }
        else if (!this.state.contact.match(/^[0-9]{10}$/)) {
            contactError = "*Please enter valid mobile no.";
            this.setState({ contactError });
            return false
        }
        else if (!this.state.blood_group.match(/^(A|B|AB|O)[-+]$/)) {
            blood_groupError = "*Please enter valid Blood Group.";
            this.setState({ blood_groupError });
            return false
        }
        else if (!this.state.skill) {
            skillError = "*Please enter valid Skill.";
            this.setState({ skillError });
            return false
        }
        else if (!this.state.username.match(/^[a-zA-Z]{3,15}$/)) {
            usernameError = "*Please enter alphabet characters only.";
            this.setState({ usernameError });
            return false
        }
        else if (!this.state.password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
            passwordError = "*Please enter secure and strong password.";
            this.setState({ passwordError });
            return false
        }
        else return true
    };
    handleSubmit = (event) => {
        const { firstname, lastname, email, contact, blood_group, skill, username, password } = this.state;
        event.preventDefault()
        const data = {
            firstname, lastname, email, contact, blood_group, skill, username, password
        }
        const isValid = this.validate();
        if (isValid) {
            this.update(data).then((data) => {
                if (!data.error) {
                    return (
                        this.props.history.push({
                            pathname: "/updatesuccess",
                            state: { firstname, lastname, email, contact, blood_group, skill, username, password }
                        })
                    )
                }
                else {
                    console.log(data.error);
                    this.setState({ commonError: "*No changes are being made, or Email-id or Username incorrect." });
                }
            })
        }
    }
    update = data => {
        const { firstname, lastname, email, contact, blood_group, skill, username, password } = data;
        const jwt = JSON.parse(localStorage.getItem('jwt'));
        console.log(JSON.stringify({ firstname, lastname, email, contact, blood_group, skill, username, password }));
        console.log(this.state);
        return fetch('/demo/login/update/' + username, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + jwt
            },
            body: JSON.stringify({ "firstName": firstname, "lastName": lastname, "emailid": email, "contact": contact, "bloodGroup": blood_group, "skill": skill, "userName": username, "password": password })
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
                <h5 className='h1_tag'>Want to update your account ?</h5>
                <h6>If yes, Click Enter Details and Update.</h6>
                <h6>*NOTE : Email id and Username can't be updated. So enter it same as during Create Account.</h6>
                <form onSubmit={this.handleSubmit}>
                    <h1>Update Account</h1>
                    <div style={{ color: 'red' }} className='error'>{this.state.commonError}</div>
                    <div>
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstname"
                            placeholder="FirstName"
                            value={this.state.firstname}
                            onChange={this.handleChange}></input>
                        <div style={{ color: 'red' }} className='error'>{this.state.firstnameError}</div>
                    </div>
                    <br />
                    <div>
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lastname"
                            placeholder="LastName"
                            value={this.state.lastname}
                            onChange={this.handleChange}></input>
                        <div style={{ color: 'red' }} className='error'>{this.state.lastnameError}</div>
                    </div>
                    <br />
                    <div>
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleChange}></input>
                        <div style={{ color: 'red' }} className='error'>{this.state.emailError}</div>
                    </div>
                    <br />
                    <div>
                        <label>Contact</label>
                        <input
                            type="text"
                            name="contact"
                            placeholder="Contact"
                            value={this.state.contact}
                            onChange={this.handleChange}></input>
                        <div style={{ color: 'red' }} className='error'>{this.state.contactError}</div>
                    </div>
                    <br />
                    <div>
                        <label>Blood Group</label>
                        <input
                            type="text"
                            name="blood_group"
                            placeholder="Blood Group"
                            value={this.state.blood_group}
                            onChange={this.handleChange}></input>
                        <div style={{ color: 'red' }} className='error'>{this.state.blood_groupError}</div>
                    </div>
                    <br />
                    <div>
                    <label>Occupation</label>
                    <select name="skill" placeholder="Occupation" onChange={this.handleChange}>
                        <option>Select</option>
                        <option value="React">Student</option>
                        <option value="Angular">Job</option>
                        <option value="Node">Business</option>
                        <option value="Vue">Research</option>
                        <option value="js">Phd</option>
                    </select>
                        <div style={{ color: 'red' }} className='error'>{this.state.skillError}</div>
                    </div>
                    <br />
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
                    <div style={{ color: 'green' }}><input type="checkbox" required />*Accept that all the provided details are genuine.</div>
                    <br />
                    <button className='button' onClick={this.update}> Update </button>
                </form>
            </div>
        )
    }
}


export default withRouter(Contact)



