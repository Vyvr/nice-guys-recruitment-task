import { User } from "@/types/userModels";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(
        (user) => user.username !== action.payload
      );
    },
    clearUsers: (state) => {
      state.users = [];
    },
  },
});

export const { setUsers, addUser, removeUser, clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
