import React from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    List,
    ListItem,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Avatar,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SHIFTS } from '../utils/queries';
import { REMOVE_SHIFT } from '../utils/mutations'
import { titleCase } from "title-case";
import WorkIcon from '@material-ui/icons/Work';

// Helper function to get the label property from each object in an array of objects and add to new array
function getValuesbyLabel(array) {
    let newArray = [];
    for (const element of array) {
        let item = element.label
        newArray.push(item)
    }
    return (newArray);
}

// Helper function to get the name property from each object in an array of objects and add to new array
// Would like this and the label function to be one function, but it didn't like "name" being passed in as an argument 
function getValuesbyName(array) {
    let newArray = [];
    for (const element of array) {
        let item = element.name
        newArray.push(item)
    }
    return (newArray);
}


function ShiftList() {

    // Styling for ShiftList
    const useStyles = makeStyles((theme) => ({
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
        }
    }));
    
    // Use styling defined above
    const classes = useStyles();

    // Query DB for all shifts
    const { loading, error, data } = useQuery(GET_SHIFTS);

    // Mutation to remove a shift, then refetch queries to re-render list
    const [removeShift, { shiftData }] = useMutation(REMOVE_SHIFT, {
        refetchQueries: [
            GET_SHIFTS,
            'getShifts'
          ],
    });

    function deleteShift(event) {
        const shiftID = event.currentTarget.id
        
        removeShift({
            variables: { removeShiftShiftId: shiftID },
          });

        
    }

    // Function to assign volunteer - will be completed in next slice
    function assignVolunteer(event) {
        var shiftID = event.currentTarget.id
        console.log("Assign")
    }
    

    if (loading) {
        return (
            <Box display='flex' justifyContent='center' p={10}>
                <CircularProgress />
            </Box>
        )
    }
    if (error) {
        console.error(error.message);
    } if (!data.getShifts) {
        console.log("Not Found");
    } else if (data.getShifts) {
        const shifts = data.getShifts;

        return (
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    {/* <Button>SORT BY</Button> */}

                    {shifts.map((shift) => {

                        const timeslotIds = shift.timeslots;
                        const roleIds = shift.roles;

                        const rolesArray = getValuesbyLabel(roleIds);
                        const timeslotArray = getValuesbyName(timeslotIds);

                        // Map the shift into the accordion component
                        return (
                            <Accordion key={shift._id}>

                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Box display='flex' flexWrap='wrap' alignItems='center'>
                                        <Box mr={2} >
                                            <Avatar>
                                                <WorkIcon />
                                            </Avatar>
                                        </Box>
                                        <Box width={120}>
                                            <Typography >{shift.label}</Typography>
                                        </Box>
                                        <Box ml={5} my={1}>
                                            <Button id={shift._id} size='small' variant='contained' onClick={assignVolunteer}>Assign a Volunteer</Button>
                                        </Box>
                                        <Box ml={5}>
                                            <Button id={shift._id} size='small' variant='contained' onClick={deleteShift}>Delete</Button>
                                        </Box>
                                    </Box>
 
                                </AccordionSummary>

                                <AccordionDetails className={classes.flex}>
                                    <Box mb={1}>
                                        <Typography className={classes.bold} component="h2"> Timeslot: </Typography>
                                        {timeslotArray.map((timeslot) => {
                                            return (
                                                <List className={classes.item}>
                                                    <ListItem className={classes.item}>{titleCase(timeslot)}</ListItem>
                                                </List>
                                            )
                                        })}
                                    </Box>
                                    <Box mb={1}>
                                        <Typography className={classes.bold} component="h2">
                                            Required Roles:
                                        </Typography>
                                        {rolesArray.map((role) => {
                                            return (
                                                <List className={classes.item}>
                                                    <ListItem className={classes.item}>{titleCase(role)}</ListItem>
                                                </List>
                                            )
                                        })}
                                    </Box>

                                </AccordionDetails>
                            </Accordion>

                        )
                    }
                    )}

                </Grid>
            </Grid>
        )
    };
}

export default ShiftList;
