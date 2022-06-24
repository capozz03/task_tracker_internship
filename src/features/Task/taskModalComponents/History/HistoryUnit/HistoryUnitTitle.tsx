import React from 'react';
import { THistoryUnit } from 'store/slice/task/taskForm/history/entities';
import { TTitleProps } from '.';
import classNames from 'classnames';
import styles from './index.module.scss';

type TProps = TTitleProps & { unit: THistoryUnit };

const HistoryUnitTitle = ({ type, text, alt = '', unit }: TProps) => {
  switch (type) {
    case 'string':
      return <span>{ text }</span>;

    case 'checklist':
      return (
        <>
          { text }
          <span className={
              classNames(styles.GeneralSpan, { [styles.deleted]: !unit.params.check_list?.title })
            }
          >
            { unit.params.check_list?.title || 'Удаленный чеклист' }
          </span>
        </>
      );

    case 'general':
      return (
        <>
          { text }
          <span className={styles.GeneralSpan}>
            { unit.params.title || alt }
          </span>
        </>
      );

    case 'task':
      return (
        <>
          { text }
          <span className={styles.GeneralSpan}>
            { unit.params.task_from?.title || alt }
          </span>
        </>
      );

    case 'clone':
      return (
        <>
          { text }
          <span className={styles.GeneralSpan}>
            { unit.params.task_to?.title || alt }
          </span>
        </>
      );

    default:
      return <span />;
  }
};

export default HistoryUnitTitle;
