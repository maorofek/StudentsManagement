import React, { useEffect, useState } from "react";
import {
  TableSortLabel,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
} from "@mui/material";
import { Student } from "../../@types/student";
import MoreMenu from "../utils/MoreMenu";
import { enqueueSnackbar } from "notistack";
import { deleteStudent } from "../../redux/slices/student";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { GenericTable } from "../../@types/genericTable";

export default function TableWithOptions(data: GenericTable) {
  const dispatch = useDispatch();
  const { students } = useSelector((state: RootState) => state.student);
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

  const handleStudentCreateOpen = async (
    student?: Student,
    isView?: boolean
  ) => {
    setCurrentStudent(student);
    setIsStudentCreateOpen(true);
    setIsStudentCreateView(isView);
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
    <TableContainer sx={{ minWidth: 440 }}>
      <TableHead>
        <TableRow>
          {data.TABLE_HEAD.map((headCell: any) => (
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
  );
}
