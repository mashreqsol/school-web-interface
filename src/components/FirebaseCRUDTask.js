import React, { useEffect, useState } from "react";
import CircularIndeterminate from "../utilities/CircularIndeterminate";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { GithubContext } from "../context/context";
const FirebaseCRUDTask = () => {
  const { tasks } = React.useContext(GithubContext);
  const classes = useStyles();
  if (!tasks)
    return (
      <div>
        <CircularIndeterminate />
      </div>
    );
  if (tasks) {
    //  console.log(tasks);
    return (
      <>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Subject</StyledTableCell>
                <StyledTableCell align="left">Detail</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.DailyHomeWork.map((hw, index) => (
                <StyledTableRow key={hw.Topic}>
                  <StyledTableCell component="th" scope="row">
                    {hw.Topic}
                  </StyledTableCell>
                  <StyledTableCell align="left">{hw.Task}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
};
const useStyles = makeStyles({
  table: {
    minWidth: 200,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
export default FirebaseCRUDTask;
