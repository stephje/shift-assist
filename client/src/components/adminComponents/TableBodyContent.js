import React from 'react';
import {
    TableCell,
    TableRow,
    Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// Table cells with custom styling
const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

// Table rows with custom styling
const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function TableBodyContent({shift, assignVolunteer, removeVolunteer}) {

    if (shift.assignedVolunteer !== null) {
        return(
            <StyledTableRow>
            <StyledTableCell component='th' scope='row'>
                {shift.name}
            </StyledTableCell>
            <StyledTableCell align='left'>{shift.timeslot.label}</StyledTableCell>
            <StyledTableCell align='left'>{shift.role.label}</StyledTableCell>
            <StyledTableCell align='left'>{shift.location}</StyledTableCell>
            <StyledTableCell align='left'>
                {shift.assignedVolunteer.firstName} {shift.assignedVolunteer.lastName}
            </StyledTableCell>
            <StyledTableCell align='left'>
                <Button name={shift._id} onClick={assignVolunteer}>
                    Assign
                </Button>
                <Button name={shift._id} onClick={removeVolunteer}>
                    Remove
                </Button>
            </StyledTableCell>
        </StyledTableRow>
            )
    } else {
        return (
            <StyledTableRow key={shift._id}>
            <StyledTableCell component='th' scope='row'>
                {shift.name}
            </StyledTableCell>
            <StyledTableCell align='left'>{shift.timeslot.label}</StyledTableCell>
            <StyledTableCell align='left'>{shift.role.label}</StyledTableCell>
            <StyledTableCell align='left'>{shift.location}</StyledTableCell>
            <StyledTableCell align='left'>

            </StyledTableCell>
            <StyledTableCell align='left'>
                <Button name={shift._id} onClick={assignVolunteer}>
                    Assign
                </Button>
                <Button name={shift._id} onClick={removeVolunteer}>
                    Remove
                </Button>
            </StyledTableCell>
        </StyledTableRow>
        )
    }

}

export default TableBodyContent;
