import { Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Student } from "../../@types/student";
import { Departments } from "../../@types/departments";

const initialFilters: Record<string, string> = {
  firstName: "",
  lastName: "",
  department: "",
};

export default function StudentFilterer({
  students,
  setFilteredStudents,
}: {
  students: Student[];
  setFilteredStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}) {
  const [filters, setFilters] = useState(initialFilters);
  const handleFilterChange = (key: string, value: any) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  function applyFilter(students: Student[]): Student[] {
    return students.filter(
      (student) =>
        (filters.firstName
          ? student.firstName
              .toLowerCase()
              .includes(filters.firstName.toLowerCase())
          : true) &&
        (filters.lastName
          ? student.lastName
              .toLowerCase()
              .includes(filters.lastName.toLowerCase())
          : true) &&
        (filters.department
          ? student.department.toLowerCase() ===
            filters.department.toLowerCase()
          : true)
    );
  }

  useEffect(() => {
    setFilteredStudents(applyFilter(students));
  }, [filters, students, setFilteredStudents]);

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 2, sm: 2 }}
      margin={2}
    >
      <TextField
        fullWidth
        value={filters.firstName}
        label="filter by first name"
        onChange={(e) => handleFilterChange("firstName", e.target.value)}
      />
      <TextField
        fullWidth
        value={filters.lastName}
        label="filter by last name"
        onChange={(e) => handleFilterChange("lastName", e.target.value)}
      />
      <TextField
        fullWidth
        select
        value={filters.department}
        label="filter by department"
        onChange={(e) => handleFilterChange("department", e.target.value)}
        SelectProps={{ native: true }}
      >
        <option value=""></option>
        {Departments.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </TextField>
    </Stack>
  );
}
