import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Card, Stack, Typography, Toolbar, Button } from "@mui/material";
import React, { useEffect } from "react";
import TableWithOptions from "../utils/TableWithOptions";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const TABLE_HEAD = [
  { id: "email", label: "email" },
  { id: "department", label: "department" },
  { id: "gpa", label: "gpa" },
];

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 0, 0, 1),
}));

export default function HonorCandidates() {
  const { students } = useSelector((state: RootState) => state.student);

  const getHonorCandidates = () => {
    const honorCandidates = students.filter((student) => student.gpa > 90);
    return honorCandidates;
  };

  function filterCandidates() {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <Card>
        <Link to="/">
          <RootStyle>
            <Button variant="contained" type="button" color="warning">
              students
            </Button>
          </RootStyle>
        </Link>
        <RootStyle>
          <Button
            variant="contained"
            type="button"
            color="primary"
            onClick={() => {
              filterCandidates();
            }}
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
          objects={getHonorCandidates()}
          TABLE_HEAD={TABLE_HEAD}
        />
      </Card>
    </>
  );
}
