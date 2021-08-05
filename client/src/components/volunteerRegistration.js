import React from 'react';

const VolunteerRegstration = () => {
    return (
        <div classname="volunteerRegistration">
            <form onSubmit={() => alert('Volunteer registered!')}>
                <div class="form-header form-element">
                    <h1 class="form-title">Volunteer Registration Form</h1>
                </div>
                <div class="form-contents">
                    <div>
                        <label>First Name</label>
                        <input type="text" required/>
                        <label>Last Name</label>
                        <input type="text" required/>
                    </div>
                    <div>
                        <label>Street Address</label>
                        <input type="text"/>
                    </div>
                    <div>
                        <label>Town/Suburb</label>
                        <input type="text"/>
                    </div>
                    <div>
                        <label>Post Code</label>
                        <input type="number" required/>
                        <label>State</label>
                        <input type="text"/>
                    </div>
                    <div>
                        <label>Mobile Phone</label>
                        <input type="number" required/>
                    </div>
                    <div>
                        <label>Email Address</label>
                        <input type="email" required/>
                        <label>Confirm Email Address</label>
                        <input type="email" required/>
                    </div>
                    <div>
                        <p class="extra-question">Have you previously worked as a volunteer at this festival? </p>
                            <input type="radio" id="yes" name="previousExperience" value="true"/>
                            <label class="radio" for="yes">Yes</label>
                            <input type="radio" id="no" name="previousExperience" value="true"/>
                            <label class="radio" for="no">No</label>
                    </div>
                    <div class="button-section">
                        <button class="form-element" type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default VolunteerRegstration;