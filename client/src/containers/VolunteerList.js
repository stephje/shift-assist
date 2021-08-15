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
import { GET_VOLUNTEERS } from '../utils/queries';
import { titleCase } from "title-case";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

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

function getYesNo(b) {
    if (b === 'true') {
        return "Yes"
    } else if (b === 'false') {
        return "No"
    }
}

function VolunteerList() {

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

    const { loading, error, data } = useQuery(GET_VOLUNTEERS);
    if (loading) {
        return (
            <Box display='flex' justifyContent='center' p={10}>
                <CircularProgress />
            </Box>
        )
    }
    if (error) {
        console.error(error.message);
    } if (!data.getVolunteers) {
        console.log("Not Found");
    } else if (data.getVolunteers) {
        const volunteers = data.getVolunteers;

        return (
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    {/* <Button>SORT BY</Button> */}

                    {volunteers.map((volunteer) => {

                        const roleIDs = volunteer.nominatedRoles;
                        const qualificationIDs = volunteer.qualificationsHeld;
                        const availabilityIDs = volunteer.availability;

                        const qualificationsArray = getValuesbyLabel(qualificationIDs);
                        const availabilityArray = getValuesbyName(availabilityIDs);
                        const roleArray = getValuesbyLabel(roleIDs);

                        const previousExperience = getYesNo(volunteer.previousExperience);

                        return (
                            <Accordion key={volunteer._id}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Box display='flex' alignItems='center'>
                                        <Box mr={2}>
                                            <Avatar>
                                                <AccountCircleRoundedIcon />
                                            </Avatar>
                                        </Box>
                                        <Typography>{volunteer.firstName} {volunteer.lastName}</Typography>
                                    </Box>

                                </AccordionSummary>
                                <AccordionDetails className={classes.flex}>
                                    <Box mb={1}>
                                        <Typography className={classes.bold} component="h2">
                                            Previous Festival Experience:
                                        </Typography>
                                        <List className={classes.item}>
                                            <ListItem className={classes.item}>{previousExperience}</ListItem>
                                        </List>
                                    </Box>
                                    <Box mb={1}>
                                        <Typography className={classes.bold} component="h2"> Qualifications: </Typography>
                                        {qualificationsArray.map((qualification) => {
                                            return (
                                                <List className={classes.item}>
                                                    <ListItem className={classes.item}>{qualification}</ListItem>
                                                </List>
                                            )
                                        })}
                                    </Box>
                                    <Box mb={1}>
                                        <Typography className={classes.bold} component="h2">
                                            Availability:
                                        </Typography>
                                        {availabilityArray.map((timeslot) => {
                                            return (
                                                <List className={classes.item}>
                                                    <ListItem className={classes.item}>{titleCase(timeslot)}</ListItem>
                                                </List>
                                            )
                                        })}
                                    </Box>
                                    <Box mb={1}>
                                        <Typography className={classes.bold} component="h2">
                                            Nominated Roles:
                                        </Typography>
                                        {roleArray.map((role) => {
                                            return (
                                                <List className={classes.item}>
                                                    <ListItem className={classes.item}>{titleCase(role)}</ListItem>
                                                </List>
                                            )
                                        })}
                                    </Box>
                                    <Box mb={1}>
                                        <Typography className={classes.bold} component="h2">
                                            Medical:
                                        </Typography>
                                        <List className={classes.item}>
                                            <ListItem className={classes.item}>{volunteer.medical}</ListItem>
                                        </List>
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

export default VolunteerList;