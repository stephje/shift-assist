import React, {useState} from 'react';
import { useMutation } from '@apollo/client';
import { ADD_VOLUNTEER } from '../utils/mutations';

function SubmitVolunteerRegistration() {

    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const [addVolunteer, { error }] = useMutation(ADD_VOLUNTEER);

    function handleChange(event){
        const { name, value } = event.target;
        setInput(input => {
            return {
                ...input,
                [name]: value
            }
        });
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        try {
            console.log({
                variables: { ...input },
            })
            const { data } = addVolunteer({
                variables: { volunteerDetails: {...input} },
            });
        } catch (err) {
            console.error(err.message);
        }
    } 

    return (
        <div className='volunteerRegistration'>
            <form onSubmit={handleFormSubmit}>
                <div className='form-header form-element'>
                    <h1 className='form-title'>Volunteer Registration Form</h1>
                </div>
                <div className='form-contents'>
                    <div>
                        <label>First Name</label>
                        <input onChange={handleChange} name="firstName" value={input.firstName} type='text' required />
                        <label>Last Name</label>
                        <input name="lastName" value={input.lastName} onChange={handleChange} type='text' required />
                    </div>
                    {/* <div>
                        <label>Street Address</label>
                        <input type='text' />
                    </div>
                    <div>
                        <label>Town/Suburb</label>
                        <input type='text' />
                    </div>
                    <div>
                        <label>Post Code</label>
                        <input type='number' required />
                        <label>State</label>
                        <input type='text' />
                    </div>
                    <div>
                        <label>Mobile Phone</label>
                        <input type='number' required />
                    </div> */}
                    <div>
                        <label>Email Address</label>
                        <input name="email" value={input.email} onChange={handleChange} type='email' required />
                        {/* <label>Confirm Email Address</label>
                        <input type='email' required /> */}
                    </div>
                    {/* <div>
                        <p className='extra-question'>
                            Have you previously worked as a volunteer at this
                            festival?{' '}
                        </p>
                        <input
                            type='radio'
                            id='yes'
                            name='previousExperience'
                            value='true'
                        />
                        <label className='radio' for='yes'>
                            Yes
                        </label>
                        <input
                            type='radio'
                            id='no'
                            name='previousExperience'
                            value='true'
                        />
                        <label className='radio' for='no'>
                            No
                        </label>
                    </div> */}
                    <div className='button-section'>
                        <button className='form-element' type='submit'>
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SubmitVolunteerRegistration;
