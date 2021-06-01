import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { GithubContext } from "../context/context";
import {
  Info,
  Repos,
  User,
  Search,
  Navbar,
  FirebaseCRUD,
  FirebaseCRUDFee,
  Graph,
  FirebaseCRUDResult,
} from "../components";

const Dashboard = () => {
  const classes = useStyles();
  const { isloading } = React.useContext(GithubContext);
  if (isloading) {
    return (
      <main>
        <Navbar></Navbar>
        <Search></Search>
        <div className="container">
          <div className="loading"></div>
        </div>
      </main>
    );
  }
  return (
    <main>
      <Navbar />
      {/*  <Search />
      <Info />
      <User /> */}
      <FirebaseCRUD />

      <Grid
        container
        spacing={4}
        className={classes.gridContainer}
        justify="center"
      >
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Results Data
              </Typography>
              <FirebaseCRUDResult />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Payment History
              </Typography>
              <FirebaseCRUDFee />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </main>
  );
};
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

export default Dashboard;
