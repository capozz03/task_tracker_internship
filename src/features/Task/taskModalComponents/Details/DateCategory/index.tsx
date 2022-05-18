import React, { useCallback } from 'react';
import DetailCategory from 'features/Task/taskModalComponents/Details/DetailCategory';
import { DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import moment, { Moment } from 'moment';
import { useDispatch } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import { detailsIcons } from 'shared/ui/icons';
import styles from './index.module.scss';
import { AlertWarningIcon } from 'shared/ui/icons/AlertIcons';

type TProps = {
  currentTaskId: string | undefined;
  currentDateISO: string | null | undefined;
  hiddenCategory: ()=>void;
};

const formatDate = (value: Moment) => {
  const arr = value.locale('ru').format('DD MMMM YYYY').split(' ');
  arr[1] = arr[1].toLowerCase().slice(0, 3);
  return arr.join(' ');
};

const { DatePickerIcon } = detailsIcons;

export const DateStartCategory = ({ currentDateISO, currentTaskId, hiddenCategory }: TProps) => {
  const dispatch = useDispatch();

  const onChangeDate = (date: Moment | null, currentTaskId: string | undefined) => {
    if (currentTaskId) {
      const datetime = date ? moment(`${date.format('YYYY-MM-DD')} 00:00:00`, 'YYYY-MM-DD HH:mm:ss', 'UTC') : null;
      dispatch(TaskFormSlice.changeTaskDateStart({
        taskId: currentTaskId,
        datetimeISO: datetime?.utc().toISOString() || null,
      }));
    }
  };

  const onChangeDateHandler = useCallback((value: Moment | null) => (
    onChangeDate(value, currentTaskId)
  ), [currentTaskId, currentDateISO]);

  const removeCategory = useCallback(() => {
    if (currentDateISO) onChangeDate(null, currentTaskId);
    hiddenCategory();
  }, [currentTaskId, currentDateISO, hiddenCategory]);

  return (
    <DetailCategory name="Начало" type="details" removeHandler={removeCategory}>
      <div className={styles.wrapper}>
        <DatePickerIcon />
        <DatePicker
          className={styles.datepicker}
          locale={locale}
          allowClear={false}
          suffixIcon={null}
          value={currentDateISO ? moment(currentDateISO) : undefined}
          onChange={onChangeDateHandler}
          format={formatDate}
        />
      </div>
    </DetailCategory>
  );
};

export const DateStopCategory = ({ currentDateISO, currentTaskId, hiddenCategory }: TProps) => {
  const dispatch = useDispatch();
  const overdue = currentDateISO ? moment().utc().toISOString() > currentDateISO : false;

  const onChangeDate = (date: Moment | null, currentTaskId: string | undefined) => {
    if (currentTaskId) {
      const datetime = date ? moment(`${date.format('YYYY-MM-DD')} 23:59:59`, 'YYYY-MM-DD HH:mm:ss', 'UTC') : null;
      dispatch(TaskFormSlice.changeTaskDateStop({
        taskId: currentTaskId,
        datetimeISO: datetime?.utc().toISOString() || null,
      }));
    }
  };

  const onChangeDateHandler = useCallback((value: Moment | null) => (
    onChangeDate(value, currentTaskId)
  ), [currentTaskId, currentDateISO]);

  const removeCategory = useCallback(() => {
    if (currentDateISO) onChangeDate(null, currentTaskId);
    hiddenCategory();
  }, [currentTaskId, currentDateISO, hiddenCategory]);

  return (
    <DetailCategory name="Срок" type="details" removeHandler={removeCategory}>
      <div className={styles.wrapper}>
        <DatePickerIcon />
        <DatePicker
          className={styles.datepicker}
          locale={locale}
          allowClear={false}
          suffixIcon={null}
          value={currentDateISO ? moment(currentDateISO) : undefined}
          onChange={onChangeDateHandler}
          format={formatDate}
        />
        {
          overdue
          && <AlertWarningIcon />
        }
      </div>
    </DetailCategory>
  );
};
