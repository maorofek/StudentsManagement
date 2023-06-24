import React from "react";
import { Student } from "../../@types/student";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import { insertStudent, updateStudent } from "../../redux/slices/student";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import {
  Grid,
  Stack,
  Card,
  TextField,
  Button,
  styled,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Divider,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Departments } from "../../@types/departments";
import RandomStudentAdder from "./RandomStudentAdder";

const WrapperStyle = styled("div")(({ theme }) => ({
  background: theme.palette.background.default,
  top: 0,
  right: 0,
  position: "fixed",
  width: "100%",
  height: "100%",
  overflow: "auto",
  zIndex: 1300,
  form: {
    display: "flex",
    justifyContent: "center",
  },
}));

interface StudentCreateProps {
  handleClose: VoidFunction;
  currentStudent?: Student;
  isViewMode: boolean;
  isCreateMode: boolean;
}

const NewStudentSchema = Yup.object().shape({
  firstName: Yup.string().required("Required field"),
  lastName: Yup.string().required("Required field"),
  email: Yup.string().email("Invalid Email"),
  department: Yup.string().required("Required field"),
  gpa: Yup.number().min(0).max(100).required("Required field"),
});

export default function StudentCreate({
  handleClose,
  currentStudent,
  isViewMode,
}: StudentCreateProps) {
  const isEdit = Boolean(currentStudent);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const isLoading = useSelector((state: any) => state.student.isLoading);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: currentStudent?.firstName || "",
      lastName: currentStudent?.lastName || "",
      email: currentStudent?.email || "",
      department: currentStudent?.department || "",
      gpa: currentStudent?.gpa || 0,
    },
    validationSchema: NewStudentSchema,
    onSubmit: async (values, { resetForm, setErrors }) => {
      try {
        const student = {
          id: currentStudent?.id,
          ...values,
        } as Student;
        const status = await (isEdit
          ? updateStudent(dispatch, student)
          : insertStudent(dispatch, student));
        resetForm();
        if (status) {
          enqueueSnackbar(
            !isEdit ? "Created successfully" : "Updated successfully",
            {
              variant: "success",
            }
          );
        } else {
          enqueueSnackbar(`Action failed`, { variant: "error" });
        }
        handleClose();
      } catch (error: any) {
        console.error(error);
        setErrors(error);
      }
    },
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <WrapperStyle>
      <Stack spacing={3} justifyContent="space-between" sx={{ p: 3 }}>
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3} sx={{ p: 3 }} maxWidth={1200}>
              <Grid item xs={12} md={8}>
                <Stack spacing={3}>
                  <Card sx={{ p: 3 }}>
                    <Stack spacing={3}>
                      <TextField
                        fullWidth
                        label="First Name"
                        {...getFieldProps("firstName")}
                        error={Boolean(touched.firstName && errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                        disabled={isViewMode}
                      />
                      <TextField
                        fullWidth
                        label="Last Name"
                        {...getFieldProps("lastName")}
                        error={Boolean(touched.lastName && errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                        disabled={isViewMode}
                      />
                      <TextField
                        fullWidth
                        label="Email"
                        {...getFieldProps("email")}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                        disabled={isViewMode}
                      />
                      <FormControl fullWidth>
                        <InputLabel id="departments">Departments</InputLabel>
                        <Select
                          input={<OutlinedInput label="departments" />}
                          labelId="departments"
                          id="departments"
                          disabled={isViewMode}
                          {...getFieldProps("department")}
                          autoWidth
                        >
                          {Departments.map((department) => (
                            <MenuItem key={department} value={department}>
                              {department}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <TextField
                        fullWidth
                        label="GPA"
                        {...getFieldProps("gpa")}
                        error={Boolean(touched.gpa && errors.gpa)}
                        helperText={touched.gpa && errors.gpa}
                        disabled={isViewMode}
                      />
                    </Stack>
                  </Card>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack spacing={4}>
                  {!isViewMode && (
                    <LoadingButton
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      loading={isSubmitting || isLoading}
                    >
                      {!isEdit ? "add" : "update"}
                    </LoadingButton>
                  )}
                  <Button
                    disabled={isLoading}
                    onClick={handleClose}
                    type="button"
                    fullWidth
                    variant="outlined"
                    size="large"
                  >
                    {isViewMode ? "close" : "cancel"}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
        <Divider />
        <RandomStudentAdder handleClose={handleClose} isViewMode={isEdit} />
      </Stack>
    </WrapperStyle>
  );
}
