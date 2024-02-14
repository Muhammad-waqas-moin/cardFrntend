import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchmembers = createAsyncThunk(
  "member/fetchmembers",
  async () => {
    const response = await axios.get("https://card-backend-phi.vercel.app/api/v1/getMember");
    // console.log("data receive succssfully :", response.data);
    return response.data;
  }
);

const initialState = {
  loading: false,
  member: [],
  error: null,
};
const userDetails = createSlice({
  name: "member",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchmembers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchmembers.fulfilled, (state, action) => {
      // console.log("payload succesfully : ", action.payload);
      state.loading = false;
      state.member = action.payload;
      state.error = null;
    });
    builder.addCase(fetchmembers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.member = [];
    });
  },
});
export default userDetails.reducer;
