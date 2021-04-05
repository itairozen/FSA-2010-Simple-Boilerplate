import React from "react";
import { connect } from "react-redux";
import { destroyStudent } from "./store";
import axios from "axios";

const Student = ({ student, campus, destroyStudent }) => {
  if (!student.id) {
    return "loading";
  }
  return (
    <div>
      <img src={student.imageURL} width="100" height="100" />
      <p>
        {student.firstName} {student.lastName}{" "}
        <button onClick={() => destroyStudent(student)}>DELETE STUDENT</button>
      </p>

      <p>{student.email}</p>
      <p>{student.gpa}</p>
      <h5>
        {student.campusId
          ? "Student's Campus"
          : "Student is not going to school or didn't pass his senior checkpoint......."}
      </h5>
      <p>
        <a href={`#/campuses/${student.campusId}`}>{campus.name}</a>
      </p>
    </div>
  );
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    destroyStudent: async (student) => {
      await axios.delete(`api/students/${student.id}`);
      dispatch(destroyStudent(student));
      history.push(`/students`);
    },
  };
};

const mapStateToProps = (state, otherProps) => {
  const student =
    state.students.find(
      (student) => student.id === otherProps.match.params.id * 1
    ) || {};
  const campus =
    state.campuses.find((campus) => campus.id === student.campusId) || {};
  return {
    student,
    campus,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);
