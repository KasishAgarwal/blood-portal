import React, { Component } from 'react'
import Sidebar from './components/Sidebar'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import './App.css'
import Logout from './components/Logout'
class Calender extends Component {
    render() {
        return (
                <div><Sidebar /><Logout />
                <div className='calendar'>
                    <FullCalendar
                        defaultView="dayGridMonth"
                        plugins={[dayGridPlugin]}
                        events={[
                            { title: 'My Birthday', date: '2020-04-02' }
                        ]}
                    />
                </div>
            </div>
        )
    }
}

export default Calender
