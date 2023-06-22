import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Student } from "../../@types/student";
import axios from "../../utils/axios";
// import { dispatch } from "../store";

const BASE_URL = "/studentsManagement";

interface StudentSliceState {
  students: Student[];
  isLoading: boolean;
  error: boolean;
}

export const initialState: StudentSliceState = {
  students: [],
  isLoading: false,
  error: false,
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    insertStudentSuccess(state, action: PayloadAction<Student>) {
      state.isLoading = false;
      state.students.push(action.payload);
    },
    updateStudentSuccess(state, action: PayloadAction<Student>) {
      state.isLoading = false;
      const index = state.students.findIndex(
        (student: Student) => student.id === action.payload.id
      );
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
    deleteStudentSuccess(state, action: PayloadAction<number>) {
      state.isLoading = false;
      const index = state.students.findIndex(
        (student: Student) => student.id === action.payload
      );
      if (index !== -1) {
        state.students.splice(index, 1);
      }
    },
    getStudentsSuccess(state, action: PayloadAction<Student[]>) {
      state.isLoading = false;
      state.students = action.payload;
    },
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      console.error(action.payload);
    },
  },
});

export const studentReducer = studentSlice.reducer;

export async function getStudents(dispatch: any) {
  dispatch(studentSlice.actions.startLoading());
  try {
    const response = await axios.get(`${BASE_URL}/getStudents`);
    dispatch(studentSlice.actions.getStudentsSuccess(response.data));
  } catch (error) {
    dispatch(studentSlice.actions.hasError(error));
    console.error(error);
  }
}

export async function insertStudent(dispatch: any, student: Student) {
  dispatch(studentSlice.actions.startLoading());
  try {
    const response = await axios.post(`${BASE_URL}/insertStudent`, student);
    console.log("[insertStudent] ------> ", response.data);
    if (response.data) {
      dispatch(studentSlice.actions.insertStudentSuccess(response.data));
      return true;
    }
  } catch (error) {
    dispatch(studentSlice.actions.hasError(error));
    console.error(error);
  }
}

export async function updateStudent(dispatch: any, student: Student) {
  dispatch(studentSlice.actions.startLoading());
  console.log(student);
  try {
    const response = await axios.put(`${BASE_URL}/updateStudent`, student);
    if (response.data) {
      dispatch(studentSlice.actions.updateStudentSuccess(response.data));
      return true;
    }
  } catch (error) {
    dispatch(studentSlice.actions.hasError(error));
    console.error(error);
  }
}

export async function deleteStudent(dispatch: any, id: number) {
  try {
    const response = await axios.delete(`${BASE_URL}/deleteStudent/${id}`);
    if (response.data) {
      dispatch(studentSlice.actions.deleteStudentSuccess(id));
      return true;
    }
  } catch (error) {
    dispatch(studentSlice.actions.hasError(error));
    console.error(error);
  }
  return false;
}

export async function insertRandomStudents(
  dispatch: any,
  numberOfStudents: number
) {
  try {
    const response = await axios.post(
      `${BASE_URL}/insertRandomStudents/${numberOfStudents}`
    );
    if (response.data) {
      dispatch(studentSlice.actions.getStudentsSuccess(response.data));
      return true;
    }
  } catch (error) {
    dispatch(studentSlice.actions.hasError(error));
    console.error(error);
  }
  return false;
}
