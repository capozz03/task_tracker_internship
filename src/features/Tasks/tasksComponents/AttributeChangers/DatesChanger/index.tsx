/* eslint-disable */
import React, { MouseEventHandler } from 'react';
import styles from './index.module.scss';
import Tooltip from '../../Tooltip';
import { DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import locale from 'antd/es/date-picker/locale/ru_RU';
import { useDispatch } from 'react-redux';
import { RangeValue } from 'rc-picker/lib/interface';
import { TaskFormSlice } from 'store/slice';
import classes from '../../DateWithIconClock/index.module.scss';
import { ClockCircleOutlined } from '@ant-design/icons';
// import { PickerProps } from 'antd/lib/date-picker/generatePicker';

const { RangePicker } = DatePicker;

type DateChangerProps = {
  taskId: string;
  start?: string | null;
  end?: string | null;
};

const DateChanger = ({ taskId, start, end }: DateChangerProps) => {
  const dispatch = useDispatch();
  const dateStart = start ? moment(start) : null;
  const dateEnd = end ? moment(end) : null;

  const stopPropagation: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
  };

  const onChange = (dates: RangeValue<Moment | null>) => {
    if (dates === null) {
      dispatch(TaskFormSlice.deleteTaskDates({ taskId }));
    } else {
      dates = dates || [null, null];
      dispatch(
        TaskFormSlice.changeTaskDates({
          taskId,
          datetimesISO: [
            dates[0]?.startOf('day').toISOString() || null,
            dates[1]?.endOf('day').toISOString() || null,
          ],
        }),
      );
    }
  };
 /* const onChangeStart = (value: Moment | null) => {
    dispatch(
      TaskFormSlice.changeTaskDateStart({
        taskId,
        datetimeISO: value?.startOf('day').toISOString() || null,
      }),
    );
  };

  const onChangeEnd = (value: Moment | null) => {
    dispatch(
      TaskFormSlice.changeTaskDateStop({
        taskId,
        datetimeISO: value?.endOf('day').toISOString() || null,
      }),
    );
  };

  const commonProps: PickerProps<Moment> = {
    allowClear: true,
    bordered: false,
    inputReadOnly: true,
    suffixIcon: null,
    locale: locale,
    size: 'small',
  };*/
  return (
    <Tooltip title="Добавить даты">
      <button type="button" className={styles.wrapper} onClick={stopPropagation}>
        <ClockCircleOutlined className={classes.icon} />
         <RangePicker
          className={styles.rangePicker}
          inputReadOnly
          allowClear
          allowEmpty={[true, true]}
          bordered={false}
          size="small"
          suffixIcon={null}
          separator={null}
          locale={locale}
          placeholder={['Нет начала', 'Нет срока']}
          defaultValue={[dateStart, dateEnd]}
          onClick={stopPropagation}
          onCalendarChange={onChange}
         />
        {/*<div className={styles.rangePicker}>*/}
        {/*  <DatePicker*/}
        {/*    placeholder="Нет начала"*/}
        {/*    defaultValue={dateStart}*/}
        {/*    onChange={onChangeStart}*/}
        {/*    {...commonProps}*/}
        {/*  />*/}
        {/*  <DatePicker*/}
        {/*    placeholder="Нет срока"*/}
        {/*    defaultValue={dateEnd}*/}
        {/*    onChange={onChangeEnd}*/}
        {/*    {...commonProps}*/}
        {/*  />*/}
        {/*</div>*/}
      </button>
    </Tooltip>
  );
};

export default DateChanger;
