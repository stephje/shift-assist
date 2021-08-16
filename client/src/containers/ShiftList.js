import React from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    List,
    ListItem,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    ListItemAvatar,
    Avatar,
    ListItemText
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';
import { GET_SHIFTS } from '../utils/queries';
import { titleCase } from "title-case";
import WorkIcon from '@material-ui/icons/Work';

function getValuesbyLabel(array) {
    let newArray = [];
    for (const element of array) {
        let item = element.label
        newArray.push(item)
    }
    return (newArray);
}

function getValuesbyName(array) {
    let newArray = [];
    for (const element of array) {
        let item = element.name
        newArray.push(item)
    }
    return (newArray);
}

function deleteShift() {
    console.log("DELETE")
}

function assignVolunteer() {
    console.log("Assign")
}

function ShiftList() {

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

    const classes = useStyles();


    const { loading, error, data } = useQuery(GET_SHIFTS);
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

                        console.log(rolesArray)

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
                                        <Box width={100}>
                                            <Typography >{shift.label}</Typography>
                                        </Box>
                                        <Box ml={5} my={1}>
                                            <Button size='small' variant='contained' onClick={assignVolunteer}>Assign a Volunteer</Button>
                                        </Box>
                                        <Box ml={5}>
                                            <Button size='small' variant='contained' onClick={deleteShift}>Delete</Button>
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
