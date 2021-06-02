import React, { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from "@material-ui/core/styles";

import Chart from "react-apexcharts";
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
  // const { user } = useAuth0();
  // const [students, SetStudents] = useState(null);
  // const [studentAdmnNo, SetStudentAdmNo] = useState("");
  //const [feesData, SetFeesData] = useState(null);

  const classes = useStyles();

  if (!fees) return <div>Loading Student Fees Data</div>;
  if (fees)
    return (
      <>
        {fees.map((studentfee, index) => {
          const { options, sheets } = studentfee;
          // const { arrears, due_amount, due_date, title } = studentfee;
          return (
            <div style={{ backgroundColor: "white", textAlign: "center" }}>
              <div className="app">
                <div className="row">
                  <div className="mixed-chart">
                    <Chart options={options} series={sheets} type="bar" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
};

export default FirebaseCRUDFee;
