import React, { Component } from "React";
import { connect } from "react-redux";
import { createStudent } from "./Students";
import axios from "axios";

class FormStudent extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  onSave(ev) {
    ev.preventDefault();
    // this.props.createStudent(this.state.firstname, this.state.lastname);
    console.log(this.state);
  }
  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  render() {
    const { firstname, lastname } = this.state;
    const { onChange, onSave } = this;
    return (
      <form onSubmit={onSave}>
        <p>First Name</p>
        <input name="firstname" value={firstname} onChange={onChange} />
        <p>Last Name</p>
        <input name="lastname" value={lastname} onChange={onChange} />
        <button>SAVE</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createStudent: async (firstName, lastName) => {
      const student = (
        await axios.post("/api/students", { firstName, lastName })
      ).data;
      dispatch(createStudent(student));
      history.push(`/students/${student.id}`);
    },
  };
};

const mapStateToProps = ({ students }) => {
  return {
    students,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormStudent);
