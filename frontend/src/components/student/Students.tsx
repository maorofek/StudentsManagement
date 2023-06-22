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
import { Link } from "react-router-dom";
import { Add, MilitaryTech } from "@mui/icons-material";

const TABLE_HEAD = [
  { id: "id", label: "id" },
  { id: "firstName", label: "first name" },
  { id: "lastName", label: "last name" },
  { id: "email", label: "email" },
  { id: "department", label: "department" },
  { id: "gpa", label: "gpa" },
  { id: "more", label: "" },
];

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 20,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 0, 0, 1),
}));

export default function Students() {
  const { enqueueSnackbar } = useSnackbar();
  const { students } = useSelector((state: RootState) => state.student);
  const dispatch = useDispatch();
  const [isOnlyCreate] = useState<boolean | undefined>(false);
  const [currentStudent, setCurrentStudent] = useState<Student | undefined>();
  const [isStudentCreateOpen, setIsStudentCreateOpen] = useState<
    boolean | undefined
  >(false);
  const [isStudentCreateView, setIsStudentCreateView] = useState<
    boolean | undefined
  >(false);

  useEffect(() => {
    getStudents(dispatch);
  }, [dispatch]);

  const createStudent = async (isView?: boolean) => {
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
      enqueueSnackbar("transaction completed successfully", {
        variant: "success",
      });
    } else {
      enqueueSnackbar(`transaction failed`, { variant: "error" });
    }
  };

  const getHonorCandidates = () => {
    const honorCandidates = students.filter((student) => student.gpa > 90);
    return honorCandidates;
  };

  return (
    <>
      <div className="background-container">
        {isStudentCreateOpen ? (
          <StudentCreate
            handleClose={handleStudentCreateClose}
            currentStudent={currentStudent}
            isViewMode={Boolean(isStudentCreateView)}
            isCreateMode={Boolean(isOnlyCreate)}
          />
        ) : (
          <>
            <Card sx={{ width: 1000, height: 600 }}>
              <Link to="/honorCandidates">
                <RootStyle>
                  <Button
                    variant="contained"
                    type="button"
                    color="warning"
                    startIcon={<MilitaryTech />}
                  >
                    Honor Candidates
                  </Button>
                </RootStyle>
              </Link>
              <Stack direction="row" alignItems="left" justifyContent="left">
                <RootStyle>
                  <Button
                    variant="contained"
                    type="button"
                    color="success"
                    onClick={() => createStudent()}
                    startIcon={<Add />}
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
                TABLE_HEAD={TABLE_HEAD}
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
                TABLE_HEAD={TABLE_HEAD}
                handleObjectDelete={handleStudentDelete}
                handleObjectCreateOpen={handleStudentCreateOpen}
              />
            </Card>
          </>
        )}
      </div>
    </>
  );
}
