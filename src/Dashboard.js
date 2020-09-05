import React, { Component } from 'react'
import './components/Form.css'
import Sidebar from './components/Sidebar'
import About from './About'
import Logout from './components/Logout'
class Dashboard extends Component {
    render() {
        return (
            <div>
                <Sidebar />
                <Logout />
                <About />
            </div>

        )
    }
}

export default Dashboard
