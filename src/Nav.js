import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Nav = ({ students, campuses, location: { pathname } }) => {
  return (
    <nav>
      {/* i believe you can get to the same goal of adding a classname to a link
      based on whether its selected or not using react-router-dom's NavLink component */}
      <Link to="/" className={pathname === "/" ? "selected" : ""}>
        Home
      </Link>
      <Link
        to="/students"
        className={pathname === "/students" ? "selected" : ""}
      >
        Students ({students.length})
      </Link>
      <Link
        to="/campuses"
        className={pathname === "/campuses" ? "selected" : ""}
      >
        Campuses ({campuses.length})
      </Link>
    </nav>
  );
};

/*
you don't need the entire state in this component.
especially since you only use the length, you could just pull out the number
of students and campuses from the state 
*/

export default connect((state) => state)(Nav);
