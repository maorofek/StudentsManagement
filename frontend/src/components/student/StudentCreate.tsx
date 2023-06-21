import React, { useState } from "react";
import { Student } from "../../@types/student";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import { insertStudent } from "../../redux/slices/student";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import {
  Grid,
  Stack,
  Card,
  TextField,
  InputAdornment,
  IconButton,
  Icon,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  Typography,
  Button,
  styled,
} from "@mui/material";
import { LoadingButton, MobileTimePicker } from "@mui/lab";

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
  isCreateMode,
}: StudentCreateProps) {
  const [isLoading, setIsLoading] = useState<boolean>();
  const isEdit = Boolean(currentStudent);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const NewStudentSchema = Yup.object().shape({
    firstName: Yup.string().required("שדה חובה"),
    lastName: Yup.string().required("שדה חובה"),
    email: Yup.string().email("כתובת מייל לא תקינה"),
    department: Yup.string(),
    GPA: Yup.number().min(0).max(100).required("שדה חובה"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: currentStudent?.firstName || "",
      lastName: currentStudent?.lastName || "",
      email: currentStudent?.email || "",
      department: currentStudent?.department || "",
      GPA: currentStudent?.GPA || 0,
    },
    validationSchema: NewStudentSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      setIsLoading(true);
      try {
        const student = {
          ...values,
        } as Student;

        //TODO update isn't working !!
        const status = await insertStudent(dispatch, student);
        resetForm();
        setSubmitting(false);
        setIsLoading(false);
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
        setSubmitting(false);
        setIsLoading(false);
        setErrors(error);
      }
    },
  });
  const {
    errors,
    values,
    touched,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    getFieldProps,
  } = formik;

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
                      label="שם פרטי"
                      {...getFieldProps("firstName")}
                      error={
                        Boolean(touched.firstName && errors.firstName) ||
                        !Boolean(values.firstName.length)
                      }
                      helperText={touched.firstName && errors.firstName}
                      disabled={isViewMode}
                    />
                    <TextField
                      fullWidth
                      label="שם משפחה"
                      {...getFieldProps("lastName")}
                      error={
                        Boolean(touched.lastName && errors.lastName) ||
                        !Boolean(values.lastName.length)
                      }
                      helperText={touched.lastName && errors.lastName}
                      disabled={isViewMode}
                    />
                    <TextField
                      fullWidth
                      label="אימייל"
                      {...getFieldProps("email")}
                      error={
                        Boolean(touched.email && errors.email) ||
                        !Boolean(values.email.length)
                      }
                      helperText={touched.email && errors.email}
                      disabled={isViewMode}
                    />
                    <TextField
                      fullWidth
                      label="מחלקה"
                      {...getFieldProps("department")}
                      error={
                        Boolean(touched.department && errors.department) ||
                        !Boolean(values.department.length)
                      }
                      helperText={touched.department && errors.department}
                      disabled={isViewMode}
                    />
                    <TextField
                      fullWidth
                      label="ממוצע ציונים"
                      {...getFieldProps("GPA")}
                      error={
                        Boolean(touched.GPA && errors.GPA) ||
                        !Boolean(values.GPA > 0 && values.GPA < 100)
                      }
                      helperText={touched.GPA && errors.GPA}
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
                    {!isEdit ? "הוספה" : "שמור שינויים"}
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
                  {isViewMode ? "סגור" : "ביטול"}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </WrapperStyle>
  );
}
