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
import StudentFilterer from "./StudentFilterer";

const TABLE_HEAD = [
  { id: "id", label: "ID" },
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
  { id: "email", label: "Email" },
  { id: "department", label: "Department" },
  { id: "gpa", label: "GPA" },
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
  const [filteredStudents, setFilteredStudents] = useState<any>([]);

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
            <Typography
              sx={{ fontWeight: "bold", ml: 5 }}
              variant="h3"
              component="h2"
            >
              Students List
            </Typography>
            <Card sx={{ width: 1000, height: 650 }}>
              <Link to="/honor-candidates">
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
                </RootStyle>
              </Stack>
              <StudentFilterer
                students={students}
                setFilteredStudents={setFilteredStudents}
              />
              <TableWithOptions
                objects={filteredStudents}
                TABLE_HEAD={TABLE_HEAD}
                handleObjectDelete={handleStudentDelete}
                handleObjectCreateOpen={handleStudentCreateOpen}
              />
            </Card>
            <Stack alignItems="left" justifyContent="left" sx={{ mt: 10 }}>
              <Typography
                sx={{ fontWeight: "bold", ml: 5 }}
                variant="h3"
                component="h2"
              >
                Excellent Students List
              </Typography>
              <Card sx={{ pt: 10 }}>
                <TableWithOptions
                  objects={getHonorCandidates()}
                  TABLE_HEAD={TABLE_HEAD}
                  handleObjectDelete={handleStudentDelete}
                  handleObjectCreateOpen={handleStudentCreateOpen}
                  defultFieldSort={"gpa"}
                  orderDir={"desc"}
                />
              </Card>
            </Stack>
          </>
        )}
      </div>
    </>
  );
}
