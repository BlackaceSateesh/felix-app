import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./slice/UserInfoSlice";

const SsStore = configureStore({
  reducer: {
    userInfo: userInfoSlice,
  },
});

export default SsStore;
