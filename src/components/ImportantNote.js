import React from "react";
import { GithubContext } from "../context/context";

import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const ImportantNote = () => {
  const { studentNotice } = React.useContext(GithubContext);
  const classes = useStyles();
  if (studentNotice) {
    return (
      <div className={classes.root}>
        <Alert severity="info">{studentNotice}</Alert>
      </div>
    );
  } else {
    return <></>;
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default ImportantNote;
