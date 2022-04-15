import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userAuthAsync, userToken } from 'store/slice/user';
import { Form, Input, Button, InputRef } from 'antd';
import styles from './index.module.scss';

type TFormValues = {
  login: string;
};

const AuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(userToken);

  const normalizeValue = (value: string) => value.trim();

  const onFinish = (values: TFormValues) => {
    dispatch(userAuthAsync(values.login));
  };

  const loginInputRef = useRef<InputRef>(null);

  useEffect(() => {
    loginInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (token) navigate('/tasks');
  }, [token]);

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.formTitle}>Авторизация</h2>
      <Form name="auth" onFinish={onFinish}>
        <Form.Item
          label="Логин"
          name="login"
          rules={[{ required: true, message: 'Введите логин' }]}
          normalize={normalizeValue}
        >
          <Input className={styles.input} ref={loginInputRef} />
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
