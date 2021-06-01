import React, { useEffect, useState } from "react";
import firebase from "./firebase";
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
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
    paddingLeft: "40px",
    paddingRight: "40px",
  },
});

const FirebaseCRUDFee = () => {
  const { fees } = React.useContext(GithubContext);
  const { user } = useAuth0();
  const [students, SetStudents] = useState(null);
  const [studentAdmnNo, SetStudentAdmNo] = useState("");
  //const [feesData, SetFeesData] = useState(null);

  const classes = useStyles();

  if (!fees) return <div>Loading Student Fees Data</div>;
  if (fees)
    return (
      <>
        {fees.map((studentfee, index) => {
          const { arrears, due_amount, due_date, title } = studentfee;
          return (
            <Card>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Title: {title}
                </Typography>
                <Typography>Fee Amount: {due_amount}</Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Arrears: {arrears}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </>
    );
};

export default FirebaseCRUDFee;
