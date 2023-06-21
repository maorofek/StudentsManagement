import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { deleteStudent, getStudents } from "../../redux/slices/student";
import {
  Card,
  Table,
  TableSortLabel,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Typography,
  Button,
  Toolbar,
  Icon,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Student } from "../../@types/student";
import MoreMenu from "../utils/MoreMenu";
import StudentCreate from "./StudentCreate";

const TABLE_HEAD = [
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
  };

  const handleStudentCreateClose = (student?: Student) => {
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
          <TableContainer sx={{ minWidth: 440 }}>
            <TableHead>
              <TableRow>
                {TABLE_HEAD.map((headCell) => (
                  <TableCell key={headCell.id}>
                    <TableSortLabel active={false} direction="asc">
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student: Student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.firstName}</TableCell>
                  <TableCell>{student.lastName}</TableCell>
                  <TableCell
                    style={{
                      textOverflow: "ellipsis",
                      cursor: "copy",
                    }}
                    onClick={() => copy(student.email)}
                  >
                    {student.email}
                  </TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell>{student.GPA}</TableCell>
                  <MoreMenu
                    onDelete={() => handleStudentDelete(student)}
                    onEdit={() => handleStudentCreateOpen(student)}
                    onView={() => handleStudentCreateOpen(student, true)}
                  />
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>
        </Card>
      )}
    </>
  );
}
