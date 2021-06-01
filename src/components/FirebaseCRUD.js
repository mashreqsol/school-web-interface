import React, { useEffect, useState } from "react";
import firebase from "./firebase";
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { GithubContext } from "../context/context";

const useStyles = makeStyles({
  root: {
    minWidth: 200,
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
});

const FirebaseCRUD = () => {
  const { getFeesInformation, feesData, getResultsInformation } =
    React.useContext(GithubContext);
  const { user } = useAuth0();
  const [students, SetStudents] = useState(null);
  const [studentAdmnNo, SetStudentAdmNo] = useState("");
  //const [feesData, SetFeesData] = useState(null);

  const classes = useStyles();

  //  console.log(user.email);
  const handleSFees = (student_id) => {
    //  e.preventDefault();
    if (student_id) {
      console.log("Student Admission No:", studentAdmnNo);
      getFeesInformation(student_id);
    }
    // console.log(user);
  };

  const handleSResults = (student_id) => {
    //  e.preventDefault();
    if (student_id) {
      console.log("Student Admission No IN HANDLE RESULTS:", studentAdmnNo);
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
          console.log("Student Data From Firebase", snapshot.val());
          SetStudents(snapshot.val());
        });
    };
    getStudents();
  }, []);

  if (!students) return <div>Students Data is Loading......</div>;
  if (students) {
    console.log(students);
    return (
      <>
        <Grid
          container
          spacing={4}
          className={classes.gridContainer}
          justify="center"
        >
          {students.map((student, index) => {
            const {
              class_name,
              father_contact,
              father_name,
              name,
              student_id,
            } = student;
            return (
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      Student Name: {name}
                    </Typography>
                    <Typography>Class Name: {class_name}</Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      Father Contact No: {father_contact}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={(e) => {
                        SetStudentAdmNo(student_id);
                        handleSFees(student_id);
                        handleSResults(student_id);
                        console.log(student_id);
                      }}
                    >
                      View Detail Information
                    </Button>

                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={(e) => {
                        SetStudentAdmNo(student_id);
                        handleSResults(student_id);
                        console.log(student_id);
                      }}
                    >
                      RESULTS
                    </Button>

                    <Button variant="contained" size="small">
                      HOME WORK
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </>
    );
  }

  if (!feesData) return <div>Fees Data is Loading......</div>;
  if (feesData) {
    console.log("ADMISSION NO: ", studentAdmnNo);
    return <div>Fees Data Loaded......</div>;
  }
};

export default FirebaseCRUD;
