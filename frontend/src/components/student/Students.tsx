import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { deleteStudent, getStudents } from "../../redux/slices/student";
import { Card, Button, Toolbar, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Student } from "../../@types/student";
import StudentCreate from "./StudentCreate";
import TableWithOptions from "../utils/TableWithOptions";

const ALL_STUDENTS_TABLE_HEAD = [
  { id: "id", label: "id" },
  { id: "firstName", label: "first name" },
  { id: "lastName", label: "last name" },
  { id: "email", label: "email" },
  { id: "department", label: "department" },
  { id: "gpa", label: "gpa" },
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

  const getHonorCandidates = () => {
    const honorCandidates = students.filter((student) => student.gpa > 90);
    return honorCandidates;
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
        <>
          <Card>
            <Stack direction="row" alignItems="left" justifyContent="left">
              <RootStyle>
                <Button
                  variant="contained"
                  type="button"
                  onClick={() => createStudent()}
                >
                  add new student
                </Button>
                <Typography
                  sx={{ fontWeight: "bold", ml: 5 }}
                  variant="h3"
                  component="h2"
                >
                  students list
                </Typography>
              </RootStyle>
            </Stack>
            <TableWithOptions
              objects={students}
              TABLE_HEAD={ALL_STUDENTS_TABLE_HEAD}
              handleObjectDelete={handleStudentDelete}
              handleObjectCreateOpen={handleStudentCreateOpen}
            />
          </Card>
          <br />
          <br />
          <Card sx={{ pt: 10 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              marginBottom={7}
            >
              <Typography
                sx={{ fontWeight: "bold", ml: 5 }}
                variant="h3"
                component="h2"
              >
                Excellent students list
              </Typography>
            </Stack>
            <TableWithOptions
              objects={getHonorCandidates()}
              TABLE_HEAD={ALL_STUDENTS_TABLE_HEAD}
              handleObjectDelete={handleStudentDelete}
              handleObjectCreateOpen={handleStudentCreateOpen}
            />
          </Card>
        </>
      )}
    </>
  );
}
