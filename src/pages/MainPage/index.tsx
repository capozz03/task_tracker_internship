import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MainSlice } from 'store/slice';

export const MainPage = () => {
  const dispatch = useDispatch();
  const todoList = useSelector(MainSlice.getTodoList);

  useEffect(() => {
    dispatch(MainSlice.addTodo({ id: 4, title: 'TODO 2' }));
    dispatch(MainSlice.getPostsAsync());
  }, []);
  console.log(todoList);

  return <h1>MainPage</h1>;
};
