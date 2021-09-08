
import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useQuery } from '@apollo/client';
import { GET_VOLUNTEERS } from '../utils/queries';
import { 
    Box, 
    CircularProgress,
    Button,
    DialogTitle,
    Dialog,
} from '@material-ui/core';

function AssignmentDialog(props) {

    const { onClose, open, name, assignVolunteer} = props;

    const handleClose = () => {
        onClose();
      };

    const handleConfirm = (event) => {
        onClose();
        const shiftID = event.currentTarget.name;
        const volunteerID = selectedOptionId;
        if(volunteerID === ""){
            alert('ERROR: No Volunteer selected!');
        } else {
            assignVolunteer(shiftID, volunteerID)
        }   
    }

    const [selectedOptionId, setSelectedOptionId] = useState("");

    function handleChange(event, value) {
        if(value){
            const volunteerID = value._id
            setSelectedOptionId(volunteerID)
        } else {
            setSelectedOptionId("")
        }
    }

    const { loading, error, data } = useQuery(GET_VOLUNTEERS);
    if (loading) {
        return (
            <Box display='flex' justifyContent='center' p={10}>
                <CircularProgress />
            </Box>
        );
    }
    if (error) {
        console.error(error.message);
    }
    if (!data.getVolunteers) {
        console.log('Not Found');
    } else if (data.getVolunteers) {
        const volunteers = data.getVolunteers;
        return (
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">Select Volunteer</DialogTitle>
                <Autocomplete
                onChange={handleChange}
                options={volunteers}
                getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Volunteer" variant="outlined" />}
                />
                <Button onClick={handleConfirm} name={name} id={volunteers._id}>
                    Confirm
                </Button>
            </Dialog>
        );
    }
}

export default function InputDialog({name, assignVolunteer}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    return (
        <div>
          <Button onClick={handleClickOpen}>
            Assign
          </Button>
          <AssignmentDialog open={open} onClose={handleClose} name={name} assignVolunteer={assignVolunteer}/>
        </div>
      );
};