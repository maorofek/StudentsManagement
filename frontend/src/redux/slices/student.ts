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
    deleteStudentSuccess(state, action: PayloadAction<Student>) {
      state.isLoading = false;
      const index = state.students.findIndex(
        (student: Student) => student.id === action.payload.id
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
  }
}

// export async function deleteStudent(id: number): Promise<boolean> {
//   try {
//     const response = await axios.delete(`/${BASE_URL}/deleteStudent/${id}`);
//     if (response.data) {
//       dispatch(studentSlice.actions.deleteStudentSuccess(response.data));
//       return true;
//     }
//   } catch (error) {
//     dispatch(studentSlice.actions.hasError(error));
//     console.error(error);
//   }
//   return false;
// }
