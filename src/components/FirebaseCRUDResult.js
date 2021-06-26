import React from "react";
import { GithubContext } from "../context/context";
import CircularIndeterminate from "../utilities/CircularIndeterminate";
import Chart from "react-apexcharts";
const FirebaseCRUDResult = () => {
  const { results } = React.useContext(GithubContext);

  if (!results)
    return (
      <div>
        <CircularIndeterminate />
      </div>
    );
  if (results) {
    const { options, sheets } = results;
    return (
      <>
        {/* {results.map((result, index) => {
          const { options, sheets } = result; */}

        <div style={{ backgroundColor: "white", textAlign: "center" }}>
          <div className="app">
            <div className="row">
              <div className="mixed-chart">
                <Chart options={options} series={sheets} type="bar" />
              </div>
            </div>
          </div>
        </div>

        {/* })} */}
      </>
    );
  }
};

export default FirebaseCRUDResult;
