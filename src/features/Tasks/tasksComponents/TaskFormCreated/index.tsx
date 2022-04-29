import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import styles from './index.module.scss';
import { useDispatch } from 'react-redux';
import { TaskStatuses } from 'shared/helpers/enums';
import { createNewTaskAsync as createNewTaskInWorkAsync } from 'store/slice/task/taskInWork';
import { createNewTaskAsync as createNewTaskInboxAsync } from 'store/slice/task/taskInbox';

const TaskFormCreated = ({ taskStatusId }: { taskStatusId: string }) => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);

  const toggleVisibleForm = () => {
    setIsActive((prev) => !prev);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
    if (taskStatusId === TaskStatuses.IN_WORK) {
      dispatch(
        createNewTaskInWorkAsync({
          task_status_id: taskStatusId,
          title: values.titleTask,
        }),
      );
    }
    if (taskStatusId === TaskStatuses.CREATED) {
      dispatch(
        createNewTaskInboxAsync({
          task_status_id: taskStatusId,
          title: values.titleTask,
        }),
      );
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <div style={isActive ? { display: 'none' } : { display: 'block' }}>
        <button type="button" className={styles.newTaskLabel} onClick={toggleVisibleForm}>
          + новая задача
        </button>
      </div>
      <div className={styles.formNewTaskWrap} style={!isActive ? { display: 'none' } : { display: 'flex' }}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className={styles.formNewTaskWrap}
        >
          <Form.Item
            name="titleTask"
            rules={[
              { required: true, message: 'Название обязательно для заполенения' },
              { max: 150, message: 'В название задачи не может быть более 150 символов' },
            ]}
          >
            <Input maxLength={150} className={styles.input} placeholder="Введите название задачи" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="default" htmlType="reset" onClick={toggleVisibleForm}>
              Отменить
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default TaskFormCreated;
