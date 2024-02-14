import { configureStore } from "@reduxjs/toolkit";
import friendDetails from "../features/friends/friendsSlice";
import memeberDetails from "../features/Membars/GetAllMemebers";

export const store = configureStore({
  reducer: {
    card: friendDetails,
    member: memeberDetails,
  },
});
export default store;
