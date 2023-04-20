import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    editUser(state, action) {
      // const { activeInputs } = state;
      // const { payload } = action;
      //
      // return {
      //   ...state,
      //   activeInputs: [...activeInputs, payload],
      // };
    }
  },
});

export const { editUser } = usersSlice.actions;
export default usersSlice.reducer;
