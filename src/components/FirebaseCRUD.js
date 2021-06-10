import React, { useEffect, useState } from "react";
import firebase from "./firebase";

import { useAuth0 } from "@auth0/auth0-react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { GithubContext } from "../context/context";

const useStyles = makeStyles({
  root: {
    minWidth: 300,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  gridContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
  },
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

const FirebaseCRUD = () => {
  const { getFeesInformation, feesData, getResultsInformation } =
    React.useContext(GithubContext);
  const { user } = useAuth0();
  const [students, SetStudents] = useState(null);
  const [studentAdmnNo, SetStudentAdmNo] = useState("");

  //const [feesData, SetFeesData] = useState(null);

  const classes = useStyles();

  //  console.log(user.email);
  const handleSFees = (student_id, name, important_note) => {
    //  e.preventDefault();
    if (student_id) {
      //    console.log("Student Admission No:", studentAdmnNo);
      getFeesInformation(student_id, name, important_note);
    }
    // console.log(user);
  };

  const handleSResults = (student_id) => {
    //  e.preventDefault();
    if (student_id) {
      //   console.log("Student Admission No IN HANDLE RESULTS:", studentAdmnNo);
      getResultsInformation(student_id);
    }
    // console.log(user);
  };

  useEffect(() => {
    const getStudents = () => {
      const studentsList = firebase.database().ref("students");
      SetStudents(null);
      studentsList
        .orderByChild("father_email")
        .equalTo(user.email)
        .on("value", (snapshot) => {
          //   console.log("Student Data From Firebase", snapshot.val());
          SetStudents(snapshot.val());
        });
    };
    getStudents();
  }, []);

  if (!students) return <>No Student Found Under Your Login</>;
  if (students) {
    //   console.log(students);
    return (
      <>
        <Grid
          container
          spacing={4}
          className={classes.gridContainer}
          justify="center"
        >
          <Grid item xs={12} sm={4} md={6}>
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Outstanding Amount PKR = 12,000
                </Typography>
                {/*  <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  List of Students Registered Under "{user.email}"
                </Typography> */}
                <TableContainer component={Paper}>
                  <Table
                    className={classes.table}
                    size="small"
                    aria-label="customized table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Student Name</StyledTableCell>
                        <StyledTableCell align="left">
                          Admission No
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          Class - Section
                        </StyledTableCell>
                        <StyledTableCell align="left">Action</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {students.map((student, index) => {
                        const {
                          class_name,
                          section,
                          father_contact,
                          important_note,
                          name,
                          student_id,
                        } = student;
                        console.log(student_id, important_note);
                        return (
                          <StyledTableRow key={name}>
                            <StyledTableCell component="th" scope="row">
                              {name}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {student_id}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {class_name} - {section}
                            </StyledTableCell>

                            <StyledTableCell align="left">
                              <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                onClick={(e) => {
                                  SetStudentAdmNo(student_id);
                                  handleSFees(student_id, name, important_note);
                                  handleSResults(student_id);
                                  // console.log(student_id);
                                }}
                              >
                                Details
                              </Button>
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <br />
        <br />
      </>
    );
  }
};

export default FirebaseCRUD;
