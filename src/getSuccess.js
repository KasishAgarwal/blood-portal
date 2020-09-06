import React from 'react'
import './components/Form.css'
import { Link } from 'react-router-dom'

function getSuccess(props) {
    const data = props.location.state.data;
    console.log(data)
    const user = data.map(user => {
        return (
                <div>
                <div key={user.id}>
                    <div style={{ background: 'GREY', color: 'BLACK' }}>
                        <p>Name of Donor : {user.firstName} {user.lastName} </p>
                        <p>Mobile No. : {user.contact}</p>
                        <p>Blood Group : {user.bloodGroup}</p>
                    </div>
                </div>
                </div>
        )
    });
    // console.log(props.location.state.data);
    // const user = JSON.stringify(data, null, 2);
    // console.log(user);

    return (
        <div className='success'>
            <br /><br />
            <h1 className='jumbotron' style={{ color: 'BLACK' }}>User Details :</h1>
            <br />
            <h3 className='jumbotron' style={{ color: 'BLACK' }}> {user} </h3>
            <br />
            <Link to='/dashboard'><button>Go to Dashboard</button></Link>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>

    )
}

export default getSuccess