import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Card, Stack, Typography, Toolbar, Button } from "@mui/material";
import React, { useState } from "react";
import TableWithOptions from "../utils/TableWithOptions";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { Student } from "../../@types/student";
import { Accessibility, FilterAlt } from "@mui/icons-material";

const TABLE_HEAD = [
  { id: "email", label: "email" },
  { id: "department", label: "department" },
  { id: "gpa", label: "gpa" },
];

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 20,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 0, 0, 1),
}));

export default function HonorCandidates() {
  const [filteredCandidates, setFilteredCandidates] = useState<any>([]);

  const { students } = useSelector((state: RootState) => state.student);

  const getHonorCandidates = () => {
    const honorCandidates = students.filter((student) => student.gpa > 90);
    return honorCandidates;
  };

  const maxByDept = (students: Student[]) =>
    students.reduce((acc: Student[], student: Student) => {
      const existingStudent = acc.find(
        (s) => s.department === student.department
      );
      if (!existingStudent || existingStudent.gpa < student.gpa) {
        if (existingStudent) {
          const index = acc.indexOf(existingStudent);
          acc.splice(index, 1);
        }
        acc.push(student);
      }
      return acc;
    }, []);

  const handleFilterCandidates = () => {
    const filteredCandidates = maxByDept(getHonorCandidates());
    setFilteredCandidates(filteredCandidates);
  };
  return (
    <>
      <Card sx={{ width: 1000, height: 600 }}>
        <Link to="/">
          <RootStyle>
            <Button
              variant="contained"
              type="button"
              color="warning"
              startIcon={<Accessibility />}
            >
              back to students
            </Button>
          </RootStyle>
        </Link>
        <RootStyle>
          <Button
            variant="contained"
            type="button"
            color="primary"
            startIcon={<FilterAlt />}
            onClick={handleFilterCandidates}
          >
            Filter Candidates
          </Button>
        </RootStyle>
        <Stack direction="row" alignItems="left" justifyContent="left">
          <RootStyle>
            <Typography
              sx={{ fontWeight: "bold", ml: 5 }}
              variant="h3"
              component="h2"
            >
              Honor Candidates list
            </Typography>
          </RootStyle>
        </Stack>
        <TableWithOptions
          objects={
            Object.keys(filteredCandidates).length > 0
              ? filteredCandidates
              : getHonorCandidates()
          }
          TABLE_HEAD={TABLE_HEAD}
        />
      </Card>
    </>
  );
}
