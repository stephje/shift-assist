import React from "react";
import {
  Box,
  Grid,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { useQuery, useMutation } from "@apollo/client";
import { GET_SHIFTS } from "../utils/queries";
import { REMOVE_SHIFT } from '../utils/mutations';

// Styling for ShiftList
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  flex: {
    display: "flex",
    flexDirection: "column",
  },
  item: {
    padding: 0,
    paddingLeft: 8,
  },
  bold: {
    fontsize: 10,
    fontWeight: 600,
  },
  table: {
    minWidth: 700,
  },
}));

// Table cells with custom styling
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

// Table rows with custom styling
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function ShiftList() {
  // Use styling defined above
  const classes = useStyles();

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

  // Query DB for all shifts
  const { loading, error, data } = useQuery(GET_SHIFTS);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={10}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    console.error(error.message);
  }
  if (!data.getShifts) {
    console.log("Not Found");
  } else if (data.getShifts) {

    const shiftArray = data.getShifts;

    return (
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
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
                    <StyledTableCell align="left">
                      {shift.timeslot.label}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {shift.role.label}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {shift.location}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {shift.label}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
  }
}

export default ShiftList;
