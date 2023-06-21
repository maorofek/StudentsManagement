import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { deleteStudent, getStudents } from "../../redux/slices/student";
import { Card, Button, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Student } from "../../@types/student";
import StudentCreate from "./StudentCreate";
import TableWithOptions from "../utils/TableWithOptions";

const ALL_STUDENTS_TABLE_HEAD = [
  { id: "id", label: "מזהה" },
  { id: "firstName", label: "שם פרטי" },
  { id: "lastName", label: "שם משפחה" },
  { id: "email", label: "אימייל" },
  { id: "department", label: "מחלקה" },
  { id: "GPA", label: "ממוצע" },
  { id: "more", label: "" },
];

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 0, 0, 1),
}));

export default function Students() {
  const { enqueueSnackbar } = useSnackbar();
  const { students } = useSelector((state: RootState) => state.student);
  const dispatch = useDispatch();
  const [isOnlyCreate, setIsOnlyCreate] = useState<boolean | undefined>(false);
  const [currentStudent, setCurrentStudent] = useState<Student | undefined>();
  const [isStudentCreateOpen, setIsStudentCreateOpen] = useState<
    boolean | undefined
  >(false);
  const [isStudentCreateView, setIsStudentCreateView] = useState<
    boolean | undefined
  >(false);
  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    enqueueSnackbar(`הטוקן הועתק בהצלחה`, { variant: "info" });
  };

  useEffect(() => {
    getStudents(dispatch);
  }, [dispatch]);

  const createStudent = async (student?: Student, isView?: boolean) => {
    setIsStudentCreateOpen(true);
    setIsStudentCreateView(isView);
  };

  const handleStudentCreateOpen = async (
    student?: Student,
    isView?: boolean
  ) => {
    setCurrentStudent(student);
    setIsStudentCreateOpen(true);
    setIsStudentCreateView(isView);
  };

  const handleStudentCreateClose = () => {
    setCurrentStudent(undefined);
    setIsStudentCreateOpen(false);
  };

  const handleStudentDelete = async (student: Student) => {
    const status = await deleteStudent(dispatch, student.id);
    if (status) {
      enqueueSnackbar("הפעולה בוצעה בהצלחה", { variant: "success" });
    } else {
      enqueueSnackbar(`הפעולה נכשלה`, { variant: "error" });
    }
  };
  //TODO add icon to new student button ******************************************************
  return (
    <>
      {isStudentCreateOpen ? (
        <StudentCreate
          handleClose={handleStudentCreateClose}
          currentStudent={currentStudent}
          isViewMode={Boolean(isStudentCreateView)}
          isCreateMode={Boolean(isOnlyCreate)}
        />
      ) : (
        <Card>
          <RootStyle>
            <Button
              variant="contained"
              type="button"
              onClick={() => createStudent()}
            >
              סטודנט חדש
            </Button>
          </RootStyle>
          <TableWithOptions TABLE_HEAD={ALL_STUDENTS_TABLE_HEAD} />
          {/* make space with a line */}
          <br />
          <br />
          <hr />
          <br />
          <br />
          <TableWithOptions TABLE_HEAD={ALL_STUDENTS_TABLE_HEAD} />
        </Card>
      )}
    </>
  );
}
