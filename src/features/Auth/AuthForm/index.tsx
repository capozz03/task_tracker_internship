import React from 'react';
import { useDispatch } from 'react-redux';
import { userAuthAsync } from '../../../store/slice/user';
import { Form, Input, Button } from 'antd';
import styles from './index.module.scss';

type TFormValues = {
  login: string;
};

const AuthForm = () => {
  const dispatch = useDispatch();

  const onFinish = (values: TFormValues) => {
    dispatch(userAuthAsync(values.login));
  };

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.formTitle}>Авторизация</h2>
      <Form
        name="auth"
        onFinish={onFinish}
      >
        <Form.Item
          label="Логин"
          name="login"
          rules={[{ required: true, message: 'Введите логин' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AuthForm;
