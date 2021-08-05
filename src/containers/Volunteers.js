import React, { Component } from 'react';
import Volunteer from '../components/volunteer';

class Volunteers extends Component {
    state={
        volunteers: [
            {id: 1, name: 'Volunteer 1', email: 'test@test.com', mobile: '0412341234'},
            {id: 2, name: 'Volunteer 2', email: 'test@test.com', mobile: '0412341234'},
            {id: 3, name: 'Volunteer 3', email: 'test@test.com', mobile: '0412341234'}
        ]
    }
    render() {
        return (
            <div className='volunteers'>
                {this.state.volunteers.map((volunteer) => {
                    return <Volunteer key={volunteer.id}
                    name = {volunteer.name}
                    email = {volunteer.email}
                    mobile = {volunteer.mobile}/>
                })}
            </div>
        );
    }
}

export default Volunteers;