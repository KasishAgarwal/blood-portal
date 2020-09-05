import React from 'react'
import './components/Form.css'
import { Link } from 'react-router-dom'
// home = (props) => {
// return this.props.history.push("/");
//  }
function updateSuccess(props) {
    const data = props.location.state;
    const { firstname, lastname, email, contact, blood_group, skill, username, password } = data;
    return (
        <div className='success'>
            <br /><br />
            <h1 className='jumbotron' style={{ color: 'BLACK' }}>Successfully Updated Account Details !!!</h1>
            <h2 style={{ color: 'white' }}>Hi {firstname} {lastname}.</h2>
            <br />
            <h5 style={{ color: 'white' }}>Your personal details are :</h5>
            <br/>
            <h6 style={{ color: 'white' }}>Firstname : {firstname}</h6>
            <h6 style={{ color: 'white' }}>Lastname : {lastname}</h6>
            <h6 style={{ color: 'white' }}>Email id : {email}</h6>
            <h6 style={{ color: 'white' }}>Contact : {contact}</h6>
            <h6 style={{ color: 'white' }}>Blood Group : {blood_group}</h6>
            <h6 style={{ color: 'white' }}>Skill : {skill}</h6>
            <h6 style={{ color: 'white' }}>Username : {username}</h6>
            <h6 style={{ color: 'white' }}>Password : {password}</h6>
            <br />
            <Link to='/dashboard'><button>Go to Dashboard</button></Link>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>

    )
}

export default updateSuccess