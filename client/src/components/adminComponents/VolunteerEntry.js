import React from 'react';
import {
    Box,
    List,
    ListItem,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Avatar,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { titleCase } from 'title-case';
import { makeStyles } from '@material-ui/core/styles';

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

// This is just to convert a value to "Yes" or "No" rather than "true"/"false"
function getYesNo(b) {
    if (b === 'true') {
        return 'Yes';
    } else if (b === 'false') {
        return 'No';
    }
}

const VolunteerEntry = ({ volunteer }) => {
    // Styling for volunteer list
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

    // Use styling defined above
    const classes = useStyles();

    //manipulating data into more useable format
    const qualificationIDs = volunteer.qualificationsHeld;
    const qualificationsArray = getValuesbyLabel(qualificationIDs);

    const roleIDs = volunteer.nominatedRoles;
    const roleArray = getValuesbyLabel(roleIDs);

    const availabilityIDs = volunteer.availability;
    const availabilityArray = getValuesbyName(availabilityIDs);

    const previousExperience = getYesNo(volunteer.previousExperience);

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
            >
                <Box display='flex' alignItems='center'>
                    <Box mr={2}>
                        <Avatar>
                            <AccountCircleRoundedIcon />
                        </Avatar>
                    </Box>
                    <Typography>
                        {volunteer.firstName} {volunteer.lastName}
                    </Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails className={classes.flex}>
                <Box mb={1}>
                    <Typography className={classes.bold} component='h2'>
                        Previous Festival Experience:
                    </Typography>
                    <List className={classes.item}>
                        <React.Fragment>
                            <ListItem className={classes.item}>
                                {previousExperience}
                            </ListItem>
                        </React.Fragment>
                    </List>
                </Box>
                <Box mb={1}>
                    <Typography className={classes.bold} component='h2'>
                        {' '}
                        Qualifications:{' '}
                    </Typography>
                    <List className={classes.item}>
                        {qualificationsArray.map(qualification => {
                            return (
                                <React.Fragment
                                    key={`${qualification.id}-${volunteer._id}`}
                                >
                                    <ListItem className={classes.item}>
                                        {qualification.label}
                                    </ListItem>
                                </React.Fragment>
                            );
                        })}
                    </List>
                </Box>
                <Box mb={1}>
                    <Typography className={classes.bold} component='h2'>
                        Availability:
                    </Typography>
                    <List className={classes.item}>
                        {availabilityArray.map(timeslot => {
                            return (
                                <React.Fragment
                                    key={`${timeslot.id}-${volunteer._id}`}
                                >
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
                        Nominated Roles:
                    </Typography>
                    <List className={classes.item}>
                        {roleArray.map(role => {
                            return (
                                <React.Fragment
                                    key={`${role.id}-${volunteer._id}`}
                                >
                                    <ListItem className={classes.item}>
                                        {titleCase(role.label)}
                                    </ListItem>
                                </React.Fragment>
                            );
                        })}
                    </List>
                </Box>
                <Box mb={1}>
                    <Typography className={classes.bold} component='h2'>
                        Medical:
                    </Typography>
                    <List className={classes.item}>
                        <React.Fragment>
                            <ListItem className={classes.item}>
                                {volunteer.medical}
                            </ListItem>
                        </React.Fragment>
                    </List>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default VolunteerEntry;
