import React from "react";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import { insertRandomStudents } from "../../redux/slices/student";
import { TextField, Card, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";

export default function RandomStudentAdder({
  handleClose,
}: {
  handleClose: VoidFunction;
}) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.student.isLoading);

  const NewStudentSchema = Yup.object().shape({
    numberOfStudents: Yup.number().min(1).max(100).required("required field"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      numberOfStudents: 0,
    },
    validationSchema: NewStudentSchema,
    onSubmit: async (values, { resetForm, setErrors }) => {
      try {
        const status = await insertRandomStudents(
          dispatch,
          values.numberOfStudents
        );
        resetForm();
        if (status) {
          enqueueSnackbar(`Created successfully`, {
            variant: "success",
          });
        } else {
          enqueueSnackbar(`Action failed`, { variant: "error" });
        }
      } catch (error: any) {
        console.error(error);
        setErrors(error);
      }
      handleClose();
    },
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Card sx={{ p: 3 }}>
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              label="Number of students"
              {...getFieldProps("numberOfStudents")}
              error={Boolean(
                touched.numberOfStudents && errors.numberOfStudents
              )}
              helperText={touched.numberOfStudents && errors.numberOfStudents}
            />
            <LoadingButton
              type="submit"
              variant="contained"
              color="warning"
              size="small"
              loading={isSubmitting || isLoading}
            >
              add random students
            </LoadingButton>
          </Stack>
        </Card>
      </Form>
    </FormikProvider>
  );
}
