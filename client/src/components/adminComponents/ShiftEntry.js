import React from 'react';
import {
    Box,
    Button,
    List,
    ListItem,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Avatar,
} from '@material-ui/core';
import { titleCase } from 'title-case';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WorkIcon from '@material-ui/icons/Work';
import { makeStyles } from '@material-ui/core/styles';
import { GET_SHIFTS } from '../../utils/queries';
import { REMOVE_SHIFT } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

// Helper function to get the label property from each object in an array of objects and add to new array
function getValuesbyLabel(array) {
    let newArray = [];
    for (const element of array) {
        let item = {
            id: element._id,
            label: element.label,
        };
        newArray.push(item);
    }
    return newArray;
}

// Helper function to get the name property from each object in an array of objects and add to new array
// Would like this and the label function to be one function, but it didn't like "name" being passed in as an argument
function getValuesbyName(array) {
    let newArray = [];
    for (const element of array) {
        let item = {
            id: element._id,
            name: element.name,
        };
        newArray.push(item);
    }
    return newArray;
}

// Function to assign volunteer - will be completed in next slice
function assignVolunteer(event) {
    // var shiftID = event.currentTarget.id
    console.log('Assign');
}

const ShiftEntry = ({ shift }) => {

    // Styling for ShiftList
    const useStyles = makeStyles(theme => ({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
        flex: {
            display: 'flex',
            flexDirection: 'column',
        },
        item: {
            padding: 0,
            paddingLeft: 8,
        },
        bold: {
            fontsize: 10,
            fontWeight: 600,
        },
    }));

    // Mutation to remove a shift, then refetch queries to re-render list
    const [removeShift] = useMutation(REMOVE_SHIFT, {
        refetchQueries: [GET_SHIFTS, 'getShifts'],
    });

    function deleteShift(event) {
        const shiftID = event.currentTarget.id;

        removeShift({
            variables: { removeShiftShiftId: shiftID },
        });
    }

    // Use styling defined above
    const classes = useStyles();

    const timeslotIds = shift.timeslots;
    const roleIds = shift.roles;
    console.log(shift)

    const rolesArray = getValuesbyLabel(roleIds);
    const timeslotArray = getValuesbyName(timeslotIds);

    return (
        <Accordion key={shift._id}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
            >
                <Box display='flex' flexWrap='wrap' alignItems='center'>
                    <Box mr={2}>
                        <Avatar>
                            <WorkIcon />
                        </Avatar>
                    </Box>
                    <Box width={120}>
                        <Typography>{shift.label}</Typography>
                    </Box>
                    <Box ml={5} my={1}>
                        <Button
                            id={shift._id}
                            size='small'
                            variant='contained'
                            onClick={assignVolunteer}
                        >
                            Assign a Volunteer
                        </Button>
                    </Box>
                    <Box ml={5}>
                        <Button
                            id={shift._id}
                            size='small'
                            variant='contained'
                            onClick={deleteShift}
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>
            </AccordionSummary>

            <AccordionDetails className={classes.flex}>
                <Box mb={1}>
                    <Typography className={classes.bold} component='h2'>
                        {' '}
                        Timeslot:{' '}
                    </Typography>
                    <List className={classes.item}>
                        {timeslotArray.map(timeslot => {
                            return (
                                <React.Fragment key={`${timeslot.id}-${shift._id}`}>
                                    <ListItem className={classes.item}>
                                        {titleCase(timeslot.name)}
                                    </ListItem>
                                </React.Fragment>
                            );
                        })}
                    </List>
                </Box>
                <Box mb={1}>
                    <Typography className={classes.bold} component='h2'>
                        Required Roles:
                    </Typography>
                    <List className={classes.item}>
                        {rolesArray.map(role => {
                            console.log(role.label)
                            return (
                                <React.Fragment key={`${role.id}-${shift._id}`}>
                                    <ListItem className={classes.item}>
                                        {titleCase(role.label)}
                                    </ListItem>
                                </React.Fragment>
                            );
                        })}
                    </List>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default ShiftEntry;
