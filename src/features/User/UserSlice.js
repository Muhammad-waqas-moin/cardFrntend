import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createUser = createAsyncThunk("user/createUser", async (data) => {
  console.log("data :", data);
  try {
    // console.log("reciving data", data);
    // const mydata = JSON.stringify(data);
    const response = await axios.post(
      "https://65b9fb1db4d53c066551bfc4.mockapi.io/api/v1/crud",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          // Add any other headers if required
        },
      }
    );

    console.log("Data sent successfully:", response.data);

    // return response.data;
  } catch (error) {
    // console.error("Error sending data:", error.response);
    throw error; // Ensure the error is propagated to the rejected action
  }
});

export const fetchUser = createAsyncThunk("user/fetachUser", async () => {
  try {
    const response = await axios.get(
      "https://65b9fb1db4d53c066551bfc4.mockapi.io/api/v1/crud"
    );
    // console.log("data receive succssfully :", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  loading: false,
  users: [],
  error: null,
};
const userDetails = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    //for Create user
    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
      state.users = [];
      state.error = null;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      // console.log(state);
      state.loading = false;
      state.users = [];
      state.users.push(action.payload);
      state.error = null;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.users = [];
    });

    //for readt users

    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      console.log("payload succesfully : ", action.payload);
      state.loading = false;
      // state.users.push(action.payload);
      state.users = action.payload;
      state.error = null;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.users = [];
    });

    // [createUser.pending]: (state) => {
    //   state.loading = true;
    // },
    // [createUser.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.users.push(action.payload);
    // },
    // [createUser.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // },
  },
  //   extraReducers: (builder) => {
  //     builder.addCase("", (state, action) => {});
  //   },
});
export default userDetails.reducer;
