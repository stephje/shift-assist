import React from 'react';
import { useQuery } from '@apollo/client';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { 
    Box, 
    CircularProgress, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper 
} from '@material-ui/core';
import { GET_CURRENT_VOLUNTEER_DATA } from '../utils/queries';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function AssignedShiftList() {
  const classes = useStyles();

  const {error, loading, data} = useQuery(GET_CURRENT_VOLUNTEER_DATA);

  if (error) {
      console.error(error.message)
  }

  if (loading) {
    return (
        <Box display='flex' justifyContent='center' p={10}>
            <CircularProgress />
        </Box>
    );
  }

  if (data) {
      const volunteerData = data.getCurrentVolunteerData;
      const shiftArray = volunteerData.assignedShifts
    return (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Shift Code</StyledTableCell>
                <StyledTableCell align="left">Timeslot</StyledTableCell>
                <StyledTableCell align="left">Role</StyledTableCell>
                <StyledTableCell align="left">Location</StyledTableCell>
                <StyledTableCell align="left">Description</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shiftArray.map((shift) => (
                <StyledTableRow key={shift.label}>
                  <StyledTableCell component="th" scope="row">
                    {shift.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{shift.timeslot.label}</StyledTableCell>
                  <StyledTableCell align="left">{shift.role.label}</StyledTableCell>
                  <StyledTableCell align="left">{shift.location}</StyledTableCell>
                  <StyledTableCell align="left">{shift.label}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
  } else {
      return (<div>"You have not been assigned any shifts yet- please check back later!"</div>)
  }

}
