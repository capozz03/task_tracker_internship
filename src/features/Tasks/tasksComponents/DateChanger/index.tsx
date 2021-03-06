import React, { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import styles from './index.module.scss';
import { ClockCircleOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/ru_RU';
import { formatDate, usePermissions } from 'shared/helpers';
import { CancelIcons } from 'shared/ui/icons';
import moment, { Moment } from 'moment';
import { useDispatch } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import { alert } from 'shared';
import { TRoles } from 'store/slice/task/entities';
import Tooltip from 'features/Tasks/tasksComponents/Tooltip';

type TProps = {
  dateStartISO: string | null | undefined;
  dateStopISO: string | null | undefined;
  taskId: string;
  roles: TRoles[],
};

const DateChanger = ({ dateStartISO, dateStopISO, taskId, roles }: TProps) => {
  const dispatch = useDispatch();
  const [start, setStart] = useState(dateStartISO ? moment(dateStartISO) : null);
  const [stop, setStop] = useState(dateStopISO ? moment(dateStopISO) : null);
  const can = usePermissions(
    ['change.dateStart', 'change.dateStop'],
    roles,
  );

  useEffect(() => {
    setStart(dateStartISO ? moment(dateStartISO) : null);
    setStop(dateStopISO ? moment(dateStopISO) : null);
  }, [dateStartISO, dateStopISO]);

  const stopPropagation = (e: React.MouseEvent<HTMLElement>) => e.stopPropagation();
  const formatValue = (value: Moment) => formatDate(value, false);

  const onChangeStart = (date: Moment | null) => {
    const datetime = date ? moment(`${date.format('YYYY-MM-DD')} 00:00:00`, 'YYYY-MM-DD HH:mm:ss', 'UTC') : null;
    setStart(date ? moment(date.format('YYYY-MM-DD')) : null);
    dispatch(TaskFormSlice.changeTaskDateStart({
      taskId, datetimeISO: datetime?.utc().toISOString() || null,
    }));
  };

  const onChangeStop = (date: Moment | null) => {
    const datetime = date ? moment(`${date.format('YYYY-MM-DD')} 23:59:59`, 'YYYY-MM-DD HH:mm:ss', 'UTC') : null;
    setStop(date ? moment(date.format('YYYY-MM-DD')) : null);
    dispatch(TaskFormSlice.changeTaskDateStop({
      taskId, datetimeISO: datetime?.utc().toISOString() || null,
    }));
  };

  const disabledForStart = (current: Moment) => (
    current && current > moment(dateStopISO).endOf('day')
  );

  const disabledForStop = (current: Moment) => (
    current
    && (
      current <= moment().endOf('day').add(-1, 'day')
      || (dateStartISO ? current <= moment(dateStartISO).endOf('day').add(-1, 'day') : false)
    )
  );

  const removeDate = (type: 'start' | 'stop') => () => {
    if (type === 'stop' && start) {
      alert('???? ???? ???????????? ?????????????? ???????? ????????????????????, ???????? ?????????????????????? ???????? ????????????', 'warning');
    } else if (type === 'stop') {
      onChangeStop(null);
    } else if (type === 'start') {
      onChangeStart(null);
    }
  };

  return (
    <div
      className={styles.wrapper}
      role="button"
      aria-hidden="true"
      onClick={stopPropagation}
    >
      <ClockCircleOutlined className={styles.icon} />
      <div>
        <div className={styles.pickerWrapper}>
          <Tooltip title={can['change.dateStart'] ? '???????????????? ???????? ????????????' : ''}>
            <DatePicker
              className={styles.picker}
              bordered={false}
              suffixIcon={null}
              locale={locale}
              format={formatValue}
              allowClear={false}
              placeholder="?????? ????????????"
              value={start}
              onChange={onChangeStart}
              disabledDate={disabledForStart}
              getPopupContainer={() => document.querySelector('.ant-layout') as HTMLElement}
              disabled={!can['change.dateStart']}
            />
          </Tooltip>
          {
            start && can['change.dateStart']
            && (
              <Tooltip title="?????????????? ???????? ????????????">
                <button type="button" className={styles.removeButton} onClick={removeDate('start')}>
                  <CancelIcons />
                </button>
              </Tooltip>
            )
          }
        </div>
        <div className={styles.pickerWrapper}>
          <Tooltip ignoreTouchDevice title={can['change.dateStop'] ? '???????????????? ???????? ????????????????????' : ''}>
            <DatePicker
              className={styles.picker}
              bordered={false}
              suffixIcon={null}
              locale={locale}
              format={formatValue}
              allowClear={false}
              placeholder="?????? ??????????"
              value={stop}
              onChange={onChangeStop}
              disabledDate={disabledForStop}
              getPopupContainer={() => document.querySelector('.ant-layout') as HTMLElement}
              disabled={!can['change.dateStop']}
            />
          </Tooltip>
          {
            stop && can['change.dateStop']
            && (
              <Tooltip ignoreTouchDevice title={start ? '???????????? ?????????????? ???????? ????????????' : '?????????????? ???????? ????????????????????'}>
                <button type="button" className={styles.removeButton} onClick={removeDate('stop')}>
                  <CancelIcons />
                </button>
              </Tooltip>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default DateChanger;
