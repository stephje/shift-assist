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
  Paper
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { useQuery, useMutation } from "@apollo/client";
import { GET_SHIFTS } from "../utils/queries";
import { ASSIGN_VOLUNTEER_TO_SHIFT, REMOVE_VOLUNTEER_FROM_SHIFT } from "../utils/mutations";
import TableBodyContent from "../components/adminComponents/TableBodyContent";


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

function ShiftList() {
  // Use styling defined above
  const classes = useStyles();

  function assignVolunteer(shiftID, volunteerID) {
    // const shiftID = event.currentTarget.name;
    const shiftId = shiftID;
    const volunteerId = volunteerID;

    //Add volunteer search and use that as input
    assignVolunteerToShift({
      variables: { shiftId: shiftId, volunteerId: volunteerId },
    });
  }

  function removeVolunteer(event) {
    const shiftID = event.currentTarget.name;

    removeVolunteerFromShift({
      variables: { shiftId: shiftID, volunteerId: "61375aba4737d5070883af0e" },
    });
  }

  // Query DB for all shifts
  const { loading, error, data } = useQuery(GET_SHIFTS);

  // Mutation to assign volunteer to a shift, then refetch queries to re-render list
  const [assignVolunteerToShift] = useMutation(ASSIGN_VOLUNTEER_TO_SHIFT, {
    refetchQueries: [GET_SHIFTS, "getShifts"],
  });

  const [removeVolunteerFromShift] = useMutation(REMOVE_VOLUNTEER_FROM_SHIFT, {
    refetchQueries: [GET_SHIFTS, "getShifts"],
  });

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
                  <StyledTableCell align="left">Assigned</StyledTableCell>
                  <StyledTableCell align="left"> </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shiftArray.map((shift) => (
                  <TableBodyContent key={shift._id} shift={shift} removeVolunteer={removeVolunteer} assignVolunteer={assignVolunteer}/>
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
