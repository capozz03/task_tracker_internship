/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'react';
import DetailCategory from 'features/Task/taskModalComponents/Details/DetailCategory';
import { DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import moment, { Moment } from 'moment';
import { useDispatch, useStore } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import { detailsIcons } from 'shared/ui/icons';
import styles from './index.module.scss';
import { AlertWarningIcon } from 'shared/ui/icons/AlertIcons';
import { alert } from 'shared';

type TProps = {
  currentTaskId: string | undefined;
  startDateISO: string | null | undefined;
  stopDateISO: string | null | undefined;
  hiddenCategory: ()=>void;
};

const formatDate = (value: Moment) => {
  const arr = value.locale('ru').format('DD MMMM YYYY HH:mm').split(' ');
  arr[1] = arr[1].toLowerCase().slice(0, 3);
  return arr.join(' ');
};

const { DatePickerIcon } = detailsIcons;

export const DateStartCategory = ({
  startDateISO,
  stopDateISO,
  currentTaskId,
  hiddenCategory }: TProps,
) => {
  const dispatch = useDispatch();
  const [pickerValue, setPickerValue] = useState<Moment | undefined>(
    startDateISO ? moment(startDateISO) : undefined);

  const disabledDate = (current: Moment) => (
    current && current > moment(stopDateISO).endOf('day')
  );

  const onChangeDate = (date: Moment | null, currentTaskId: string | undefined) => {
    if (currentTaskId) {
      const datetime = date ? moment(`${date.format('YYYY-MM-DD')} 00:00:00`, 'YYYY-MM-DD HH:mm:ss', 'UTC') : null;
      dispatch(TaskFormSlice.changeTaskDateStart({
        taskId: currentTaskId,
        datetimeISO: datetime?.utc().toISOString() || null,
      }));
      setPickerValue(date ? moment(`${date.format('YYYY-MM-DD')}T00:00:00`) : undefined);
    }
  };

  const onChangeDateHandler = useCallback((value: Moment | null) => (
    onChangeDate(value, currentTaskId)
  ), [currentTaskId, startDateISO]);

  const removeCategory = useCallback(() => {
    if (startDateISO) onChangeDate(null, currentTaskId);
    hiddenCategory();
  }, [currentTaskId, startDateISO, hiddenCategory]);

  return (
    <DetailCategory name="Начало" type="details" removeHandler={removeCategory} tooltip="Удалить дату начала">
      <div className={styles.wrapper}>
        <DatePickerIcon />
        <DatePicker
          className={styles.datepicker}
          locale={locale}
          allowClear={false}
          suffixIcon={null}
          value={pickerValue}
          onChange={onChangeDateHandler}
          format={formatDate}
          disabledDate={disabledDate}
        />
      </div>
    </DetailCategory>
  );
};

export const DateStopCategory = ({
  startDateISO,
  stopDateISO,
  currentTaskId,
  hiddenCategory }: TProps,
) => {
  const dispatch = useDispatch();
  const [pickerValue, setPickerValue] = useState<Moment | undefined>(
    stopDateISO ? moment(stopDateISO) : undefined);
  const overdue = stopDateISO ? moment().utc().toISOString() > stopDateISO : false;
  const tooltip = startDateISO
    ? 'Сперва удалите дату начала'
    : 'Удалить срок выполнения';

  const disabledDate = (current: Moment) => (
    current
    && (
      current <= moment().endOf('day').add(-1, 'day')
      || (startDateISO ? current <= moment(startDateISO).endOf('day').add(-1, 'day') : false)
    )
  );

  const onChangeDate = (date: Moment | null, currentTaskId: string | undefined) => {
    if (currentTaskId) {
      const datetime = date ? moment(`${date.format('YYYY-MM-DD')} 23:59:59`, 'YYYY-MM-DD HH:mm:ss', 'UTC') : null;
      dispatch(TaskFormSlice.changeTaskDateStop({
        taskId: currentTaskId,
        datetimeISO: datetime?.utc().toISOString() || null,
      }));
      setPickerValue(date ? moment(`${date.format('YYYY-MM-DD')}T23:59:59`) : undefined);
    }
  };

  const onChangeDateHandler = useCallback((value: Moment | null) => (
    onChangeDate(value, currentTaskId)
  ), [currentTaskId, stopDateISO]);

  const removeCategory = useCallback(() => {
    if (!startDateISO) {
      if (stopDateISO) onChangeDate(null, currentTaskId);
      hiddenCategory();
    } else {
      alert('Вы не можете удалить срок выполнения, пока установлена дата начала', 'warning');
    }
  }, [currentTaskId, startDateISO, stopDateISO, hiddenCategory]);

  return (
    <DetailCategory name="Срок" type="details" removeHandler={removeCategory} tooltip={tooltip}>
      <div className={styles.wrapper}>
        <DatePickerIcon />
        <DatePicker
          className={styles.datepicker}
          locale={locale}
          allowClear={false}
          suffixIcon={null}
          value={pickerValue}
          onChange={onChangeDateHandler}
          format={formatDate}
          disabledDate={disabledDate}
        />
        {
          overdue
          && <AlertWarningIcon />
        }
      </div>
    </DetailCategory>
  );
};
