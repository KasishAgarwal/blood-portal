import React from 'react'
import './components/Form.css'
import { Link } from 'react-router-dom'
// home = (props) => {
// return this.props.history.push("/");
//  }
function Success(props) {
    const data = props.location.state;
    const { firstname, lastname, username } = data;
    return (
        <div className='success'>
            <br /><br />
            <h1 className='jumbotron' style={{ color: 'BLACK' }}>Successfully created Account !!!</h1>
            <br /><br />
            <h3 style={{ color: 'white' }}>Hi {firstname} {lastname}.</h3>
            <br /><br /><br />
            <h4 style={{ color: 'white' }}>Please Login as</h4>
            <h3 style={{ color: 'white' }}>username : {username}</h3>
            <br /><br /><br />
            <Link to='/signin'><button>Go to Home</button></Link>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>

    )
}

export default Success