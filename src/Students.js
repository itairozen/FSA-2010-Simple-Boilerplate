import React from "react";
import { connect } from "react-redux";
import { createStudent } from "./store";
import axios from "axios";
import { Link } from "react-router-dom";
import faker from "faker";

// const Students = ({ students, createStudent }) => {
//   return (
//     <div>
//       <button
//         onClick={() =>
//           createStudent(faker.name.firstName(), faker.name.lastName())
//         }
//       >
//         Add Student
//       </button>
//       <ul>
//         {students.map((student) => {
//           return (
//             <div key={student.id}>
//               <img src={student.imageURL} width="100" height="100" />
//               <p key={student.id}>
//                 <Link to={`/students/${student.id}`}>
//                   {student.firstName} {student.lastName}
//                 </Link>
//               </p>
//             </div>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

const Students = ({ students, createStudent, location: { pathname } }) => {
  return (
    <div>
      {/* Tried to create a form but didn't finish. 
      Commented out the Student component that was creating a student with faker on line 8 */}
      <Link to={`/students/formStudent`}>CREATE A NEW STUDENT</Link>
      <ul>
        {students.map((student) => {
          return (
            <div key={student.id}>
              <img src={student.imageURL} width="100" height="100" />
              <p key={student.id}>
                <Link to={`/students/${student.id}`}>
                  {student.firstName} {student.lastName}
                </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Students);
