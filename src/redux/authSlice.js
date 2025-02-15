import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = {
        uid: action.payload.uid,
        email: action.payload.email,
        displayName: action.payload.displayName || "",
      }; // Store only serializable data
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;



// import { createSlice } from "@reduxjs/toolkit";

// // const initialState = {
// //   user: null,
// // };


// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: null,
//   },
//   reducers: {
//     setUser: (state, action) => {
//       state.user = {
//         uid: action.payload.uid,
//         email: action.payload.email,
//         displayName: action.payload.displayName,
//       }; // Store only serializable data
//     },
//     logoutUser: (state) => {
//       state.user = null;
//     },
//   },
// });
// // const authSlice = createSlice({
// //   name: "auth",
// //   initialState,
// //   reducers: {
// //     setUser: (state, action) => {
// //       state.user = action.payload;
// //     },
// //     logoutUser: (state) => {
// //       state.user = null;
// //     },
// //   },
// // });

// export const { setUser, logoutUser } = authSlice.actions;
// export default authSlice.reducer;
