import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
import { IconFilter } from './icons';

type FilterToggleButtonProps = {
  active?: boolean;
  filtersCount?: number;
  onClick?: () => any;
};

const defaultProps = {
  active: false,
  filtersCount: 0,
  onClick: () => {},
};

const FilterToggleButton = ({ active, filtersCount, onClick }: FilterToggleButtonProps) => (
  <button
    type="button"
    className={classNames(styles.button, active ? styles.active : '')}
    onClick={(e) => {
      e.currentTarget.classList.toggle(styles.active);
      if (onClick) onClick();
    }}
  >
    <IconFilter />
    <span className={styles.text}>Фильтры</span>
    <span className={classNames(styles.counter, filtersCount ? styles.active : '')}>
      {filtersCount}
    </span>
  </button>
);
FilterToggleButton.defaultProps = defaultProps;

export default FilterToggleButton;
