import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    resetRole: (state) => {
      state.role = "user";
    },
  },
});

export const { setRole, resetRole } = authSlice.actions;
export default authSlice.reducer;
