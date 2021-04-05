import React from "react";
import { connect } from "react-redux";

const Home = ({ students, campuses }) => {
  return (
    <div>
      <h4>Welcome to Itai's JPFP - Still working on it but had to submit...</h4>
      <p>
        I have <b>{students.length}</b> <a href={`#/students`}>Students </a>
        and <b>{campuses.length} </b>
        <a href={`#/campuses`}>Campuses</a> in my database!{" "}
      </p>
    </div>
  );
};

export default connect((state) => state)(Home);
