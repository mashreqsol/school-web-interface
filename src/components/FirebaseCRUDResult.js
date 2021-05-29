import React from "react";
import { GithubContext } from "../context/context";
import Chart from "react-apexcharts";
const FirebaseCRUDResult = () => {
  const { results } = React.useContext(GithubContext);
  console.log("Firebase CRUD RESULT", results);
  if (!results) return <div>Result Data is Loading......</div>;
  if (results) {
    return (
      <>
        {results.map((result, index) => {
          const { options, sheets } = result;

          //    console.log("series..........", JSON.parse(result.sheets));
          return (
            <div style={{ backgroundColor: "white", textAlign: "center" }}>
              <br />
              <h2>Result Analysis</h2>
              <br />

              <div className="app">
                <div className="row">
                  <div className="mixed-chart">
                    <Chart
                      options={options}
                      series={sheets}
                      type="bar"
                      width="500"
                    />
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
