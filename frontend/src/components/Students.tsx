import React from "react";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getStudents } from "../redux/slices/student";

const TABLE_HEAD = [
  { id: "id", label: "מזהה" },
  { id: "firstName", label: "שם פרטי" },
  { id: "lastName", label: "שם משפחה" },
  { id: "email", label: "אימייל" },
  { id: "department", label: "מחלקה" },
  { id: "GPA", label: "ממוצע" },
  { id: "more", label: "" },
];

export default function Students() {
  const { enqueueSnackbar } = useSnackbar();
  const { students } = useSelector((state: RootState) => state.student);
  const dispatch = useDispatch();

  const getStudentsNow = () => {
    getStudents(dispatch);
  };

  return (
    <div>
      <h1>Students</h1>
      <button onClick={getStudentsNow}>click me</button>
      <pre>{JSON.stringify(students, null, 2)}</pre>
    </div>
  );
}
