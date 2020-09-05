import React from 'react'
import './components/Form.css'
import { Link } from 'react-router-dom'
// home = (props) => {
// return this.props.history.push("/");
//  }
function seeProfile(props) {
    const data = props.location.state.data[0].filename;
    console.log(data);
    return (
        <div className='success'>
            <br /><br />
            <h1 className='jumbotron' style={{ color: 'BLACK' }}>Profile Pic !!!</h1>
            <br /><br />
            <img className="image" src={data} alt="myPic"></img>
            <Link to='/dashboard'><button>Go to Dashboard</button></Link>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>

    )
}

export default seeProfile