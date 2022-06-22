/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import DetailCategory from 'features/Task/taskModalComponents/Details/DetailCategory';
import { DatePicker, Tooltip } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import moment, { Moment } from 'moment';
import { useDispatch } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import { detailsIcons } from 'shared/ui/icons';
import styles from './index.module.scss';
import { AlertWarningIcon } from 'shared/ui/icons/AlertIcons';
import { alert } from 'shared';
import { formatDate, TaskStatuses } from 'shared/helpers';
import { TStatus } from 'store/slice/task/entities';

type TPropsDateStart = {
  currentTaskId: string | undefined;
  startDateISO: string | null | undefined;
  stopDateISO: string | null | undefined;
  hiddenCategory: ()=>void;
  isDisabled?: boolean;
};

type TPropsDateStop = TPropsDateStart & { status?: TStatus };

const { DatePickerIcon } = detailsIcons;

export const DateStartCategory = ({
  startDateISO,
  stopDateISO,
  currentTaskId,
  hiddenCategory,
  isDisabled = false }: TPropsDateStart,
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

  const onChangeDateHandler = (value: Moment | null) => (
    onChangeDate(value, currentTaskId)
  );

  const removeCategory = () => {
    if (startDateISO) onChangeDate(null, currentTaskId);
    hiddenCategory();
  };

  return (
    <DetailCategory
      name="Начало"
      type="details"
      removeHandler={isDisabled ? undefined : removeCategory}
      tooltip="Удалить дату начала"
    >
      <div className={styles.wrapper}>
        <DatePicker
          getPopupContainer={() => document.querySelector('.ant-modal-wrap') as HTMLElement}
          className={styles.datepicker}
          locale={locale}
          allowClear={false}
          suffixIcon={<DatePickerIcon />}
          value={pickerValue}
          onChange={onChangeDateHandler}
          format={formatDate}
          disabledDate={disabledDate}
          disabled={isDisabled}
        />
      </div>
    </DetailCategory>
  );
};

export const DateStopCategory = ({
  startDateISO,
  stopDateISO,
  currentTaskId,
  hiddenCategory,
  isDisabled = false,
  status }: TPropsDateStop,
) => {
  const dispatch = useDispatch();
  const [pickerValue, setPickerValue] = useState<Moment | undefined>(
    stopDateISO ? moment(stopDateISO) : undefined);
  const overdue = status?.task_status_id !== TaskStatuses.COMPLETED
                  && status?.task_status_id !== TaskStatuses.FAILED
                  && (stopDateISO ? moment().utc().toISOString() > stopDateISO : false);
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

  const onChangeDateHandler = (value: Moment | null) => (
    onChangeDate(value, currentTaskId)
  );

  const removeCategory = () => {
    if (!startDateISO) {
      if (stopDateISO) onChangeDate(null, currentTaskId);
      hiddenCategory();
    } else {
      alert('Вы не можете удалить срок выполнения, пока установлена дата начала', 'warning');
    }
  };

  return (
    <DetailCategory
      name="Срок"
      type="details"
      removeHandler={isDisabled ? undefined : removeCategory}
      tooltip={tooltip}
    >
      <div className={styles.wrapper}>
        <DatePicker
          getPopupContainer={() => document.querySelector('.ant-modal-wrap') as HTMLElement}
          className={styles.datepicker}
          locale={locale}
          allowClear={false}
          suffixIcon={<DatePickerIcon />}
          value={pickerValue}
          onChange={onChangeDateHandler}
          format={formatDate}
          disabledDate={disabledDate}
          disabled={isDisabled}
        />
        {
          overdue
          && (
            <Tooltip title="Просрочена" getPopupContainer={() => document.querySelector('.ant-modal-content') as HTMLElement}>
              <span>
                <AlertWarningIcon />
              </span>
            </Tooltip>
          )
        }
      </div>
    </DetailCategory>
  );
};
