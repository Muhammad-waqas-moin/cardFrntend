import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchfriends = createAsyncThunk(
  "friend/fetchfriends",
  async () => {
    const response = await axios.get(
      "https://card-backend-phi.vercel.app/api/v1/getFriendsCards"
    );
    // console.log("data receive succssfully :", response.data);
    return response.data;
  }
);
const initialState = {
  loading: false,
  friends: [],
  error: null,
};

const friendDetails = createSlice({
  name: "friend",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchfriends.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchfriends.fulfilled, (state, action) => {
      // console.log("payload succesfully : ", action.payload);
      state.loading = false;

      state.friends = action.payload;
      state.error = null;
    });
    builder.addCase(fetchfriends.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.friends = [];
    });
  },
});
export default friendDetails.reducer;
