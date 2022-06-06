import React from 'react';
import AuthForm from './AuthForm';
import styles from './index.module.scss';

export const AuthPageComponent = () => (
  <div className={styles.layout}>
    <AuthForm />
  </div>
);
