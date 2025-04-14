import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Role = "user" | "admin";

interface AuthState {
  role: Role;
}

const initialState: AuthState = {
  role: "user",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<Role>) => {
      state.role = action.payload;
    },
    loginAsAdmin: (state) => {
      state.role = "admin";
    },
    logout: (state) => {
      state.role = "user";
    },
  },
});

export const { setRole, loginAsAdmin, logout } = authSlice.actions;
export const selectIsAdmin = (state: RootState) => state.auth.role === "admin";
export default authSlice.reducer;
