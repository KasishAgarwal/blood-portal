import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
class SignupForm extends Component {
    constructor() {
        super()
        this.state = {
            firstname: '', lastname: '', email: '', contact: '', blood_group: '', skill: '',
            username: '', password: '', myImage: '', firstnameError: '', lastnameError: '', emailError: '', skillError: '',
            contactError: '', blood_groupError: '', usernameError: '', passwordError: '', commonError: '', myImageError: ''
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value, firstnameError: '', lastnameError: '', emailError: '', skillError: '',
            contactError: '', blood_groupError: '', usernameError: '', passwordError: '', commonError: '', myImageError: ''
        })
    }
    handleimageChange = (event) => {
        this.setState({
            myImage: event.target.files[0]
        })
    }
    validate = () => {
        let firstnameError = ''; let lastnameError = ''; let emailError = ""; let contactError = '';
        let blood_groupError = ''; let skillError = ''; let usernameError = ''; let passwordError = ''; let commonError = ''; let myImageError = '';
        if (!this.state.firstname && !this.state.lastname && !this.state.email && !this.state.contact && !this.state.skill && !this.state.username && !this.state.password && !this.state.myImage) {
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
        else if (!this.state.myImage) {
            myImageError = "*Please enter valid Image.";
            this.setState({ myImageError });
            return false
        }
        else return true
    };

    handleSubmit = (event) => {
        const { firstname, lastname, email, contact, blood_group, skill, username, password, myImage } = this.state;
        event.preventDefault()
        const details = { firstname, lastname, email, contact, blood_group, skill, username, password, myImage }
        const isValid = this.validate();
        if (isValid) {
            this.imageUpload(details).then((data) => {
                console.log(data);
                if (!data.error) {
                    console.log("Sent");
                    const userdata = { firstname, lastname, email, contact, blood_group, skill, username, password, data }
                    console.log(userdata);
                    this.signup(userdata).then((data) => {
                        if (!data.error) {
                            return (
                                this.props.history.push({
                                    pathname: "/signupsuccess",
                                    state: { firstname, lastname, username }
                                })
                            )
                        }
                        else {
                            this.setState({ commonError: "*Either email or username already exists." });
                            console.log(data.error);
                        }
                    })
                }
                else {
                    console.log("Error");
                }
            })
        }
    }
    imageUpload = data => {
        console.log(this.state.myImage)
        const fd = new FormData();
        fd.append("myImage", this.state.myImage);
        console.log(fd);
        return fetch('/demo/user/upload', {
            method: "POST",
            // headers: {
            //     // Accept: "application/json",
            //     "Content-Type": "multipart/form-data"
            // },
            body: fd
        })
            .then(response => {
                return response.json()
            })
            .catch(err => {
                console.log(err)
            })
    };

    signup = details => {
        // const { firstname, lastname, email, contact, blood_group, skill, username, password, filename } = details;
        // console.log(this.imageUpload(details).then((data)=> { return data }));
        // this.imageUpload(details).then((data) => {
        //     console.log(data);
        //     if (!data.error) {
        //         console.log("Sent");
        console.log(details);
        // console.log(details.data);
        // console.log(details.username);
        return fetch('/demo/user/create', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "firstName": details.firstname, "lastName": details.lastname, "emailid": details.email, "contact": details.contact, "bloodGroup": details.blood_group, "skill": details.skill, "userName": details.username, "password": details.password, "filename": details.data })
        })
            .then(response => {
                return response.json()
            })
            .catch(err => {
                console.log(err)
            })
        // return data;

        //     }
        //     else {
        //         console.log("Error");
        //     }
        // })
    }
    // const data = this.imageUpload(details);
    // console.log(data);
    // console.log(JSON.stringify({ firstname, lastname, email, contact, blood_group, skill, username, password, data }));
    // console.log(this.state);

    render() {
        return (
            <div className="register-image">
            <form onSubmit={this.handleSubmit}>
                <h1 className='h1_tag'>Create Account</h1>
                <h4 className='h4_tag'>give Blood give Life</h4>
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
                <br />
                <div className='upload' >
                        <label>Upload photo</label>
                        <input className='input'
                            type="file"
                            name="myImage"
                            onChange={this.handleimageChange}></input>
                    <div style={{ color: 'red' }} className='error'>{this.state.myImageError}</div>
                </div>
                <br />
                <div style={{ color: 'green' }}><input type="checkbox" required />*Accept that all the provided details are genuine.</div>
                <br />
                <button className='button'> Sign Up </button>
            </form>
            </div>
        )
    }
}
export default withRouter(SignupForm)



/* <button className='upload' onClick={this.fileUploadHandler}>Upload</button> */
// fileUploadHandler = () => {
    //     let selectedFile = this.state.selectedFile
    //     let formdata = new FormData()
    //     formdata.append('image',selectedFile)
    //     formdata.append('name','Kasish')
    //     axios({
    //         url: 'https://jsonplaceholder.typicode.com/todos/1',
    //         method: 'POST',
    //         headers: {
    //             authorization: 'your token'
    //         },
    //         data:formdata
    //     }).then((res)=>{

    //     })
    // }

    // handleFirstnameChange = (event) => {
    //     this.setState ({
    //         firstname : event.target.value,
    //         firstnameError : ''
    //     })
    // }
    // handleLastnameChange = (event) => {
    //     this.setState ({
    //         lastname : event.target.value,
    //         lastnameError: ''
    //     })
    // }
    // handleEmailChange = (event) => {
    //     this.setState ({
    //         email : event.target.value,
    //         emailError:'',
    //     })
    // }
    // handleContactChange = (event) => {
    //     this.setState ({
    //         contact : event.target.value,
    //         contactError:'',
    //     })
    // }
    // handleBloodGroupChange = (event) => {
    //     this.setState ({
    //         blood_group : event.target.value,
    //         blood_groupError:'',
    //     })
    // }
    // handleSkillChange = (event) => {
    //     this.setState ({
    //         skill : event.target.value
    //     })
    // }
    // handleUsernameChange = (event) => {
    //     this.setState ({
    //         username : event.target.value,
    //         usernameError:'',
    //     })
    // }
    // handlePasswordChange = (event) => {
    //     this.setState ({
    //         password : event.target.value,
    //         passwordError: '',
    //     })
    // }

//     validate = () => {
//         let firstnameError='';let lastnameError='';let emailError="";let contactError='';
//         let blood_groupError='';let usernameError='';let passwordError='';
//         if(this.state.firstname.length<3) {
//             firstnameError = "*Less than 3 characters not allowed."
//         }
//         if (!this.state.firstname) {
//             firstnameError = "*Please enter your firstname.";
//           }
//           if(this.state.lastname.length<3) {
//             lastnameError = "*Less than 3 characters not allowed."
//         }
//         if (!this.state.lastname) {
//             lastnameError = "*Please enter your lastname.";
//           }
//         if (!this.state.email) {
//             emailError = "*Please enter your email.";
//           }
//         if (this.state.email !== "undefined") {
//             var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
//             if (!pattern.test(this.state.email)) {
//                 emailError = "*Please enter valid email-ID.";
//             }
//         }
//         if (!this.state.contact) {
//             contactError = "*Please enter your mobile no.";
//         }
//         if (typeof this.state.contact !== "undefined") {
//             if (!this.state.contact.match(/^[0-9]{10}$/)) {
//                 contactError = "*Please enter valid mobile no.";
//             }
//         }
//         if (typeof this.state.blood_group !== "undefined") {
//             if (!this.state.blood_group.match(/^(A|B|AB|O)[-+]$/)) {
//                 blood_groupError = "*Please enter valid Blood Group.";
//             }
//         }
//         if (!this.state.username) {
//             usernameError = "*Please enter your username.";
//         }
//         if (typeof this.state.username !== "undefined") {
//             if (!this.state.username.match(/^[a-zA-Z ]*$/)) {
//                 usernameError = "*Please enter alphabet characters only.";
//             }
//         }
//         if (!this.state.password) {
//             passwordError = "*Please enter your password.";
//         }
//         if (typeof this.state.password !== "undefined") {
//             if (!this.state.password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
//                 passwordError = "*Please enter secure and strong password.";
//             }
//         }
//         if(firstnameError||lastnameError||emailError||contactError||blood_groupError||usernameError||passwordError) {
//             this.setState({ firstnameError,lastnameError,emailError,contactError,blood_groupError,usernameError,passwordError});
//             return false;
//         }
//         // firstnameError='';lastnameError='';emailError='';contactError='';
//         // blood_groupError='';usernameError='';passwordError='';
//         // this.setState({ firstnameError,lastnameError,emailError,contactError,blood_groupError,usernameError,passwordError});
//         return true;
// };