/* eslint-disable react/require-default-props */
import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
import { IconFilter } from './icons';
import { useSelector } from 'react-redux';
import { TaskFilters } from 'store/slice';

type FilterToggleButtonProps = {
  filtersCount?: number;
  hideText?: boolean;
  onClick?: () => void;
};

const FilterToggleButton = ({
  filtersCount = 0,
  onClick = () => null,
  hideText = false,
}: FilterToggleButtonProps) => {
  const active = useSelector(TaskFilters.getIsFiltersMenuShow);
  return (
    <button
      type="button"
      className={classNames(styles.button, { [styles.active]: active })}
      onClick={onClick}
    >
      <IconFilter />
      <span hidden={hideText} className={styles.text}>
        Фильтры
      </span>
      <span className={classNames(styles.counter, filtersCount ? styles.active : '')}>
        {filtersCount}
      </span>
    </button>
  );
};

export default FilterToggleButton;
