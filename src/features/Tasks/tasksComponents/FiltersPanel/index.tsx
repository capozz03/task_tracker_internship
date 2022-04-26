import React from 'react';
import styles from './index.module.scss';
import { Button } from 'antd';
import KeywordInput from './KeywordInput';

const FiltersPanel = () => (
  <div className={styles.container}>
    <KeywordInput />
    <div>
      <div className={styles.labelText}>Участники</div>
      asd
    </div>
    <div>
      <div className={styles.labelText}>Метки</div>
    </div>
    <div>
      <div className={styles.labelText}>Другие</div>
    </div>
    <div>
      <div className={styles.labelText}>Степень готовности</div>
    </div>
    <div>
      <div className={styles.labelText}>Приоритет</div>
    </div>
    <Button name="Очистить фильтры" />
  </div>
);

export default FiltersPanel;
