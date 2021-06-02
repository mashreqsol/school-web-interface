import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";
import firebase from "../components/firebase";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  const [requests, setRequests] = useState(0);
  const [isloading, setIsloading] = useState(false);

  const [error, setError] = useState({ show: false, msg: `` });
  const [fees, SetFees] = useState(null);
  const [results, SetResults] = useState(null);
  const [studentName, SetStudentName] = useState("");
  const getResultsInformation = async (studentAdmnNo) => {
    /*   console.log(
      "Student Admission No Inside context: RESULT FUNCTION",
      studentAdmnNo  );*/

    const studentsResults = await firebase.database().ref("results");
    SetResults(null);

    studentsResults
      .orderByChild("student_id")
      .equalTo(studentAdmnNo)
      .on("value", (snapshot) => {
        const resultresponse = snapshot.val();
        //   console.log("results dataaaaaa  ", resultresponse);
        if (resultresponse) {
          SetResults(resultresponse);
          //     console.log("Results", results);
        }
      });
  };

  const getFeesInformation = (studentAdmnNo, stdname) => {
    // console.log("Student Name", stdname);
    //   toggleError();
    //  setIsloading(true);
    //  console.log("Student Admission No Inside context:", studentAdmnNo);
    SetStudentName(stdname);
    const studentsFees = firebase.database().ref("fees");
    SetFees(null);

    studentsFees
      .orderByChild("student_id")
      .equalTo(studentAdmnNo)
      .on("value", (snapshot) => {
        const feeresponse = snapshot.val();
        //    console.log("fees dataaaaaa  ", feeresponse);
        if (feeresponse) {
          SetFees(feeresponse);
          //    console.log("Fee", fees);
        }
      });
  };

  const searchGithubUser = async (user) => {
    //   console.log(user);
    toggleError();
    setIsloading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((error) =>
      console.log(error)
    );
    //    console.log(response);
    if (response) {
      setGithubUser(response.data);
      const { repos_url, followers_url } = response.data;
      await Promise.allSettled([
        axios(`${repos_url}?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((response) => {
          const [repos, followers] = response;

          const status = `fulfilled`;
          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch((error) => console.log(error));
    } else {
      toggleError(true, `User does not exist`);
    }
    checkRequests();
    setIsloading(false);
  };

  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, `You have excceded your hourly requests limit.`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function toggleError(show = false, msg = ``) {
    setError({ show, msg });
  }

  useEffect(checkRequests, []);
  //console.log("Fee......", fees);
  //  setIsloading(false);
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isloading,
        getFeesInformation,
        fees,
        getResultsInformation,
        results,
        studentName,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
export { GithubProvider, GithubContext };
