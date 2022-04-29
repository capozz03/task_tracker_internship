import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MainSlice } from 'store/slice';

// test
import MembersChanger from 'features/Task/taskModalComponents/MembersChanger';
import { alert } from 'shared';

export const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(MainSlice.addTodo({ id: 4, title: 'TODO 2' }));
  }, []);

  const notify = () => {
    alert('Задача успешно создана', 'success');
    alert('Обновите протоколы задач', 'warning');
    alert('Предупреждение', 'error');
    alert('Важная информация для исполнителей', 'info');
    alert('Файл удален', 'remove', [
      { text: 'Отменить', action: () => alert('Cancel work') },
    ]);
  };

  return (
    <div style={{ margin: '30px', background: 'gold', height: '80vh' }}>
      <h1>MainPage</h1>
      <button type="button" onClick={notify}>ALERT TEST</button>
      <MembersChanger />
    </div>
  );
};
