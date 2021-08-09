import React, {useState} from 'react';
import { useMutation } from '@apollo/client';
import { ADD_VOLUNTEER } from '../utils/mutations';
import RolesChecklist from './rolesChecklist';

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
            // console.log({...input})
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
                    <div>
                        <label>Street Address</label>
                        <input onChange={handleChange} name="address" value={input.address} type='text' />
                    </div>
                    <div>
                        <label>Town/Suburb</label>
                        <input onChange={handleChange} name="suburb" value={input.suburb} type='text' />
                    </div>
                    <div>
                        <label>Post Code</label>
                        <input onChange={handleChange} name="postcode" value={input.postcode} type='number' required />
                        <label>State</label>
                        <input type='text' />
                    </div>
                    <div>
                        <label>Mobile Phone Number</label>
                        <input onChange={handleChange} name="mobile" value={input.mobile} type='number' required />
                    </div>
                    <div>
                        <label>Email Address</label>
                        <input name="email" value={input.email} onChange={handleChange} type='email' required />
                        <label>Confirm Email Address</label>
                        <input onChange={handleChange} name="emailConfirmation" value={input.emailConfirmation} type='email' required />
                    </div>
                    <div>
                        <p className='question-text'>
                            Have you previously worked as a volunteer at this
                            festival?{' '}
                        </p>
                        <input
                            name='previousExperience'
                            onChange={handleChange}
                            value={input.previousExperience}
                            type='radio'
                            id='yes'
                            value='true'
                        />
                        <label className='radio' htmlFor='yes'>
                            Yes
                        </label>
                        <input
                            type='radio'
                            id='no'
                            name='previousExperience'
                            value='true'
                        />
                        <label className='radio' htmlFor='no'>
                            No
                        </label>
                    </div>
                    <div>
                        <label>Age</label>
                        <p className="additional-info">Volunteers must be 18 years or older to work in some areas of the festival. Please enter your age in years as of the Festival start date in the space below.</p>
                        <input onChange={handleChange} name="age" value={input.age} type='number' required />
                    </div>
                    <div>
                        <label>Medical Conditions</label>
                        <p className="additional-info"> If you have any pre-existing injury or medical condition that may limit the activities you can undertake or which may be aggravated by some activities, please list these below:</p>
                        <input className="lg-input" onChange={handleChange} name="medical" value={input.medical} type='text' required />
                    </div>
                </div>
                <h2 className='form-title form-element'>Volunteer Roles</h2>
                <p className="additional-info">Which of the following Volunteer roles are you willing and able to do? (Select as many as are applicable)</p>
                <RolesChecklist/>
                <h2 className='form-title form-element'>Qualifications</h2>
                <p className="additional-info">Do you have any of the following qualifications? (Select as many as are applicable)</p>
                <div className="checkbox-form-contents">
                    <div>
                        <div>
                            <input type="checkbox" id="rsa" name="rsa" value="rsa"/>
                            <label htmlFor="rsa">Responsible Service of Alcohol (RSA)</label>
                        </div>
                        <div>
                            <input type="checkbox" id="mlp" name="mlp" value="mlp"/>
                            <label htmlFor="mlp">Management of Licensed Premises</label>
                        </div>
                        <div>
                            <input type="checkbox" id="seniorFirstAid" name="seniorFirstAid" value="seniorFirstAid"/>
                            <label htmlFor="seniorFirstAid">Senior First Aid (or higher)</label>
                        </div>
                        <div>
                            <input type="checkbox" id="ptd" name="ptd" value="ptd"/>
                            <label htmlFor="ptd">PTD driver's license</label>
                        </div>
                    </div>
                </div>  
                <h2 className='form-title form-element'>Availability</h2>
                <div className="form-contents">

                </div>
                <h2 className='form-title form-element'>Emergency Contact Information</h2>
                <div className="form-contents">
                <div>
                    <label>Emergency Contact Full Name</label>
                    <input onChange={handleChange} name="emergencyContactName" value={input.emergencyContactName} type='text' required />
                    <label>Emergency Contact Phone Number</label>
                    <input onChange={handleChange} name="emergencyPhone" value={input.emergencyPhone} type='number' required />
                    <label>Relationship to You</label>
                    <input name="relationship" value={input.relationship} onChange={handleChange} type='text' required />
                </div>

                </div>
                <h2 className='form-title form-element'>Terms and Conditions</h2>
                <div className="form-contents">

                </div>
                <div className="form-contents">
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
