import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userAuthAsync, userToken } from 'store/slice/user';
import { normalizeTrimWhitespaces } from 'shared/helpers';
import { toast } from 'react-toastify';
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
  };

  useEffect(() => {
    if (token) {
      navigate('/');
      toast.dismiss();
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
          normalize={normalizeTrimWhitespaces}
        >
          <Input className={styles.input} autoFocus />
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
