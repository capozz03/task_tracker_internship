import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MainSlice } from 'store/slice';

// must remove
import Alert from 'shared/ui/icons/Alert';

export const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(MainSlice.addTodo({ id: 4, title: 'TODO 2' }));
  }, []);

  return (
    <div>
      <h1>MainPage</h1>
      <Alert text="props text efgSE" />
    </div>
  );
};
