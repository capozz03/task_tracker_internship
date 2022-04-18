import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MainSlice } from 'store/slice';

// test
import MemberChanger from 'features/Task/taskModalComponents/MembersChanger';
import { alert } from 'shared/ui';

export const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(MainSlice.addTodo({ id: 4, title: 'TODO 2' }));
  }, []);

  // test
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
    <div style={{ margin: '30px' }}>
      <h1>MainPage</h1>
      <button type="button" onClick={notify}>ALERT TEST</button>
      <div style={{ width: '700px', height: '500px', margin: '20px', padding: '20px', backgroundColor: 'gold' }}>
        <MemberChanger />
      </div>
    </div>
  );
};
