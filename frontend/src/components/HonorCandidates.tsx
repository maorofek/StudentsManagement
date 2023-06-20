// import React, { useEffect } from "react";
// import { useSnackbar } from "notistack";
// import { Student } from "../@types/student";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../redux/store";
// import { getStudents } from "../redux/slices/student";

// export default function HonorCandidates() {
//   const { enqueueSnackbar } = useSnackbar();
//   const { students } = useSelector((state: RootState) => state.student);

//   const getStudentsNow = async () => {
//     getStudents();
//   };

//   return (
//     <div>
//       <h1>Honor-Candidates</h1>
//       <button onClick={getStudentsNow}>click me</button>
//     </div>
//   );
// }
