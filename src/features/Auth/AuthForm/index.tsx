import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userAuthAsync, getUserInfoAsync, userToken } from 'store/slice/user';
import { Form, Input, Button } from 'antd';
import styles from './index.module.scss';

type TFormValues = {
  login: string;
};

const AuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(userToken);

  const onFinish = (values: TFormValues) => {
    dispatch(userAuthAsync(values.login));
    dispatch(getUserInfoAsync(values.login));
  };

  useEffect(() => {
    if (token) {
      navigate('/tasks');
    }
  }, [token]);

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.formTitle}>Авторизация</h2>
      <Form name="auth" onFinish={onFinish}>
        <Form.Item
          label="Логин"
          name="login"
          rules={[{ required: true, message: 'Введите логин' }]}
        >
          <Input className={styles.input} />
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
