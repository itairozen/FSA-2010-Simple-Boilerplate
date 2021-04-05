import { combineReducers, createStore } from "redux";

const LOADED = "LOADED";
const LOAD_STUDENTS = "LOAD_STUDENTS";
const CREATE_STUDENT = "CREATE_STUDENT";
const DESTROY_STUDENT = "DESTROY_STUDENT";
const CREATE_CAMPUS = "CREATE_CAMPUS";
const LOAD_CAMPUSES = "LOAD_CAMPUSES";
const DESTROY_CAMPUS = "DESTROY_CAMPUS";
const SET_VIEW = "SET_VIEW";

// TODO: try to convert to switch-case
const campusesReducer = (state = [], action) => {
  if (action.type === LOAD_CAMPUSES) {
    state = action.campuses;
  }
  if (action.type === CREATE_CAMPUS) {
    state = [...state, action.campus];
  }
  if (action.type === DESTROY_CAMPUS) {
    state = state.filter((campus) => campus.id !== action.campus.id);
  }

  return state;
};

const studentsReducer = (state = [], action) => {
  if (action.type === LOAD_STUDENTS) {
    state = action.students;
  }
  if (action.type === CREATE_STUDENT) {
    state = [...state, action.student];
  }
  if (action.type === DESTROY_STUDENT) {
    state = state.filter((student) => student.id !== action.student.id);
  }

  return state;
};

const viewReducer = (state = "", action) => {
  if (action.type === SET_VIEW) {
    state = action.view;
  }
  return state;
};

const reducer = combineReducers({
  campuses: campusesReducer,
  students: studentsReducer,
  view: viewReducer,
});

const store = createStore(reducer);

const loaded = () => {
  return {
    type: LOADED,
  };
};
const loadStudents = (students) => {
  return {
    type: LOAD_STUDENTS,
    students,
  };
};

const createStudent = (student) => {
  return {
    type: CREATE_STUDENT,
    student,
  };
};

const destroyStudent = (student) => {
  return {
    type: DESTROY_STUDENT,
    student,
  };
};

const loadCampuses = (campuses) => {
  return {
    type: LOAD_CAMPUSES,
    campuses,
  };
};

const createCampus = (campus) => {
  return {
    type: CREATE_CAMPUS,
    campus,
  };
};

const destroyCampus = (campus) => {
  return {
    type: DESTROY_CAMPUS,
    campus,
  };
};

const setView = (view) => {
  return {
    type: SET_VIEW,
    view,
  };
};

export default store;
export {
  loaded,
  loadStudents,
  createStudent,
  destroyStudent,
  loadCampuses,
  createCampus,
  destroyCampus,
  setView,
};
