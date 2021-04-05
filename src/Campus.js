import React from "react";
import { connect } from "react-redux";
import { destroyCampus } from "./store";
import axios from "axios";

const Campus = ({ campus, students, destroyCampus }) => {
  if (!campus.id) {
    return null;
  }
  return (
    <div>
      <img src={campus.imageURL} width="100" height="100" />
      <p>{campus.name}</p>
      <button onClick={() => destroyCampus(campus)}>DELETE CAMPUS</button>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <h5>{students.length ? "Our Students" : "Be the first student!"}</h5>
      <ul>
        {students.map((student) => {
          return (
            <div key={student.id}>
              <p>
                <a href={`#/students/${student.id}`}>
                  {student.firstName} {student.lastName}
                </a>
              </p>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    destroyCampus: async (campus) => {
      await axios.delete(`api/campuses/${campus.id}`);
      dispatch(destroyCampus(campus));
      history.push(`/campuses`);
    },
  };
};

const mapStateToProps = (state, otherProps) => {
  const campus =
    state.campuses.find(
      (campus) => campus.id === otherProps.match.params.id * 1
    ) || {};
  const students = state.students.filter(
    (student) => student.campusId === campus.id
  );
  return {
    campus,
    students,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Campus);
