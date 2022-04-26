import React from 'react';
import styles from './index.module.scss';
import SearchIcon from './icons';
import { Input } from 'antd';

const FiltersPanel = () => (
  <div className={styles.container}>
    <Input prefix={<SearchIcon />} placeholder="Поиск" />
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
  </div>
);

export default FiltersPanel;
