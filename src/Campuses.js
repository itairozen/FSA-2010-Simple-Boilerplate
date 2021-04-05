import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createCampus } from "./store";
import axios from "axios";
import faker from "faker";

const Campuses = ({ campuses, createCampus }) => {
  return (
    <div>
      <button onClick={() => createCampus(faker.address.country())}>
        Add Campus
      </button>
      <ul>
        {campuses.map((campus) => {
          return (
            <div key={campus.id}>
              <img src={campus.imageURL} width="100" height="100" />
              <p>
                <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
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
    createCampus: async (name) => {
      const campus = (await axios.post("/api/campuses", { name })).data;
      dispatch(createCampus(campus));
      history.push(`/campuses/${campus.id}`);
    },
  };
};

const mapStateToProps = ({ campuses }) => {
  return {
    campuses,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Campuses);
