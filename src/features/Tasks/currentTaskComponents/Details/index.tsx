/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styles from './index.module.scss';
import { TagsGroup, TaskStatus } from 'features/Tasks/tasksComponents';
import { useSelector } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import PrioritySelect from './PrioritySelect';
import { Button, DatePicker } from 'antd';
import { DatePickerPrevIcon, EndDateIcon, PriorityIcon, StartDateIcon, TagsIcon } from './icons';

type DetailsProps = {
  taskId: string;
};

const Details = ({ taskId }: DetailsProps) => {
  const task = useSelector(TaskFormSlice.getTask);

  const [endDate, setEndDate] = useState(task!.exec_start);
  const [startDate, setStartDate] = useState(task!.exec_stop);
  const [priority, setPriority] = useState(task!.priority?.name);
  const [tags, setTags] = useState(task!.tags);
  console.log(endDate, startDate, priority, tags);

  const [isStartDateShow, setIsStartDateShow] = useState(!!startDate);
  const [isEndDateShow, setIsEndDateShow] = useState(!!endDate);
  const [isTagsShow, setIsTagsShow] = useState(!!tags?.length);
  const [isPriorityShow, setIsPriorityShow] = useState(!!priority);

  const showEndDate = () => setIsEndDateShow(true);
  const showStartDate = () => setIsStartDateShow(true);
  const showTags = () => setIsTagsShow(true);
  const showPriority = () => setIsPriorityShow(true);

  const statusHandler = () => {};
  const endDateHandler = () => {};
  const startDateHandler = () => {};
  const priorityHandler = () => {};
  const tagsHandler = () => {};

  return (
    <>
      <div className={styles.container}>
        <div className={styles.item}>
          <span className={styles.itemTitleText}>Статус</span>
          <span>
            <TaskStatus defaultValue={task!.status.name} onChange={statusHandler} />
          </span>
        </div>
        <div className={styles.item}>
          <span className={styles.itemTitleText}>Назначена</span>
          {/* TODO */}
        </div>
        {isStartDateShow && (
          <div className={styles.item}>
            <span className={styles.itemTitleText}>Начало</span>
            <DatePicker bordered={false} prevIcon={<DatePickerPrevIcon />} suffixIcon={null} />
          </div>
        )}
        {isEndDateShow && (
          <div className={styles.item}>
            <span className={styles.itemTitleText}>Срок</span>
            <DatePicker bordered={false} prevIcon={<DatePickerPrevIcon />} suffixIcon={null} />
          </div>
        )}
        {isTagsShow && (
          <div className={styles.item}>
            <span className={styles.itemTitleText}>Метки</span>
            <TagsGroup tags={task!.tags} />
            {/* TODO */}
            <Button type="link" icon="+ ">
              Добавить метку
            </Button>
          </div>
        )}
        {isPriorityShow && (
          <div className={styles.item}>
            <span className={styles.itemTitleText}>Приоритет</span>
            <PrioritySelect value={task!.priority?.name} />
          </div>
        )}
      </div>
      <div className={styles.icons}>
        {!isEndDateShow && <Button type="text" icon={<EndDateIcon />} onClick={showEndDate} />}
        {!isStartDateShow && (
          <Button type="text" icon={<StartDateIcon />} onClick={showStartDate} />
        )}
        {!isTagsShow && <Button type="text" icon={<TagsIcon />} onClick={showTags} />}
        {!isPriorityShow && <Button type="text" icon={<PriorityIcon />} onClick={showPriority} />}
      </div>
    </>
  );
};

export default Details;
