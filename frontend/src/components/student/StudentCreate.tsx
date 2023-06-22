import React, { useState } from "react";
import { Student } from "../../@types/student";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import { insertStudent, updateStudent } from "../../redux/slices/student";
import { useDispatch } from "react-redux";
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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Departments } from "../../@types/departments";

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

export default function StudentCreate({
  handleClose,
  currentStudent,
  isViewMode,
}: StudentCreateProps) {
  const [isLoading] = useState<boolean>();
  const isEdit = Boolean(currentStudent);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const NewStudentSchema = Yup.object().shape({
    firstName: Yup.string().required("שדה חובה"),
    lastName: Yup.string().required("שדה חובה"),
    email: Yup.string().email("כתובת מייל לא תקינה"),
    department: Yup.string(),
    gpa: Yup.number().min(0).max(100).required("שדה חובה"),
  });
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
        console.log("onSubmit", student);
        const status = await (isEdit
          ? updateStudent(dispatch, student)
          : insertStudent(dispatch, student));
        resetForm();
        if (status) {
          enqueueSnackbar(!isEdit ? "נוצר בהצלחה" : "עודכן בהצלחה", {
            variant: "success",
          });
        } else {
          enqueueSnackbar(`הפעולה נכשלה`, { variant: "error" });
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
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3} sx={{ p: 3 }} maxWidth={1200}>
            <Grid item xs={12} md={8}>
              <Stack spacing={3}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="first name"
                      {...getFieldProps("firstName")}
                      error={Boolean(touched.firstName && errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                      disabled={isViewMode}
                    />
                    <TextField
                      fullWidth
                      label="last name"
                      {...getFieldProps("lastName")}
                      error={Boolean(touched.lastName && errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                      disabled={isViewMode}
                    />
                    <TextField
                      fullWidth
                      label="email"
                      {...getFieldProps("email")}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      disabled={isViewMode}
                    />
                    <FormControl fullWidth>
                      <InputLabel id="departments">departments</InputLabel>
                      <Select
                        input={<OutlinedInput label="departments" />}
                        labelId="departments"
                        id="departments"
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
                      label="gpa"
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
              <Stack spacing={3}>
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
    </WrapperStyle>
  );
}
