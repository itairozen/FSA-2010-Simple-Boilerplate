import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Nav = ({ students, campuses, location: { pathname } }) => {
  return (
    <nav>
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

export default connect((state) => state)(Nav);
