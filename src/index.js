import React, { Component } from "react";
import { connect, Provider } from "react-redux";
import { render } from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import Students from "./Students";
import Campuses from "./Campuses.js";
import Student from "./Student";
import Campus from "./Campus";
import Home from "./Home";
import FormStudent from "./FormStudent";

import store, { loaded, loadStudents, loadCampuses, setView } from "./store";

class theApp extends Component {
  constructor() {
    super();
  }
  async componentDidMount() {
    this.props.load();
  }

  render() {
    return (
      <Router>
        <div>
          <h1>JPFP PROJECT</h1>
          <Route component={Nav} />
          <Route component={Home} path="/" exact></Route>
          <Route component={Students} path="/students" exact></Route>
          <Route component={Campuses} path="/campuses" exact></Route>
          <Switch>
            <Route
              component={FormStudent}
              path="/students/formstudent"
              exact
            ></Route>
            <Route component={Student} path="/students/:id" exact></Route>
          </Switch>
          <Route component={Campus} path="/campuses/:id" exact></Route>
        </div>
      </Router>
    );
  }
}

const App = connect(
  (state) => state,
  (dispatch) => {
    return {
      load: async () => {
        const students = (await axios.get("api/students")).data;
        const campuses = (await axios.get("api/campuses")).data;
        dispatch(loaded());
        dispatch(loadStudents(students));
        dispatch(loadCampuses(campuses));
      },
      setView: function (view) {
        dispatch(setView(view));
      },
    };
  }
)(theApp);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#app")
);
