import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;   // store whole user object
    },
    removeUser: (state, action) => {
      return null;             // clear user
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
