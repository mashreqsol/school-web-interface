import React from "react";
import { GithubContext } from "../context/context";
import Chart from "react-apexcharts";
const FirebaseCRUDResult = () => {
  const { results } = React.useContext(GithubContext);

  if (!results) return <div>Result Data is Loading......</div>;
  if (results) {
    return (
      <>
        {results.map((result, index) => {
          const { options, sheets } = result;

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
  }
};

export default FirebaseCRUDResult;
