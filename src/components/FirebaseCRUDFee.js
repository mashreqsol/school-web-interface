import React, { useEffect, useState } from "react";

import Chart from "react-apexcharts";
import { GithubContext } from "../context/context";

const FirebaseCRUDFee = () => {
  const { fees } = React.useContext(GithubContext);

  if (!fees) return <div>Loading Student Fees Data</div>;
  if (fees)
    return (
      <>
        {fees.map((studentfee, index) => {
          const { options, sheets } = studentfee;

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
