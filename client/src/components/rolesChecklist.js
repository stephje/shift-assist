import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ROLES } from '../utils/queries';



function RolesChecklist() {

    return (
        <div class="checkbox-form-contents">
                    <div>
                        <div>
                            <input type="checkbox" id="setup" name="setup" value="setup"/>
                            <label for="setup">Festival Set-Up</label>
                        </div>
                        <div>
                            <input type="checkbox" id="packdown" name="packdown" value="packdown"/>
                            <label for="packdown">Festival Pack-Down</label>
                        </div>
                        <div>
                            <input type="checkbox" id="ticketOffice" name="ticketOffice" value="ticketOffice"/>
                            <label for="ticketOffice">Ticket Office</label>
                        </div>
                        <div>
                            <input type="checkbox" id="shop" name="shop" value="shop"/>
                            <label for="shop">Festival Shop</label>
                        </div>
                        <div>
                            <input type="checkbox" id="wristbandCheck" name="wristbandCheck" value="wristbandCheck"/>
                            <label for="wristbandCheck">Wristband Check</label>
                        </div>
                        <div>
                            <input type="checkbox" id="runner" name="runner" value="runner"/>
                            <label for="runner">Runner (Misc errands)</label>
                        </div>
                        <div>
                            <input type="checkbox" id="rubbishCollection" name="rubbishCollection" value="rubbishCollection"/>
                            <label for="rubbishCollection">Rubbish Collection</label>
                        </div>
                        <div>
                            <input type="checkbox" id="barAttendant" name="barAttendant" value="barAttendant"/>
                            <label for="barAttendant">Bar Attendant (*Requires RSA)</label>
                        </div>
                        <div>
                            <input type="checkbox" id="barManager" name="barManager" value="barManager"/>
                            <label for="barManager">Bar Manager (*Requires MLP)</label>
                        </div>
                        <div>
                            <input type="checkbox" id="marshall" name="marshall" value="marshall"/>
                            <label for="marshall">Marshall (*Requires RSA)</label>
                        </div>
                        <div>
                            <input type="checkbox" id="firstAidAttendant" name="firstAidAttendant" value="firstAidAttendant"/>
                            <label for="firstAidAttendant">First Aid Station (*requires Senior First Aid or higher)</label>
                        </div>
                        <div>
                            <input type="checkbox" id="busDriver" name="busDriver" value="busDriver"/>
                            <label for="busDriver">Shuttle Bus Driver (*requires PTD Class License)</label>
                        </div>
                    </div>
                </div>
    )

}

export default RolesChecklist;
