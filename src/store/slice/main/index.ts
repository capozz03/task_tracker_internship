import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  todo: [{ id: 1, title: 'TODO 1' }],
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    addTodo(state, action) {
      console.log('стор работает');
      state.todo.push(action.payload);
    },
  },
});

export const { addTodo } = mainSlice.actions;
export const mainReducer = mainSlice.reducer;
const selectSelf = (state: any) => state;
export const testSelector = createSelector(selectSelf, (state: any) => state.main.todo);
