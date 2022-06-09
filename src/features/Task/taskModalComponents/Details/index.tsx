import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isAuthor, isResponsible } from 'shared/helpers';
import { TaskFormSlice, UserSlice } from 'store/slice';
import PerformerCategory from './PerformerCategory';
import StatusCategory from './StatusCategory';
import PriorityCategory from './PriorityCategory';
import { DateStartCategory, DateStopCategory } from './DateCategory';
import TagsCategory from './TagsCategory';
import { detailsIcons } from 'shared/ui/icons';
import styles from './index.module.scss';
import DetailsResume from './DetailsResume';
import Tooltip from 'features/Tasks/tasksComponents/Tooltip';

type TDetailsProps = { taskId: string };

const {
  DateStartIcon,
  DateStopIcon,
  TagsIcon,
  PriorityIcon,
} = detailsIcons;

const Details = ({ taskId }: TDetailsProps) => {
  const isSuccessLoadingTask = useSelector(TaskFormSlice.isLoadingStatusSuccess);
  const roles = useSelector(TaskFormSlice.getRoles);
  const tags = useSelector(TaskFormSlice.getTags);
  const status = useSelector(TaskFormSlice.getTaskFormStatusTask);
  const formResultRequired = useSelector(TaskFormSlice.getTaskFormStatusTaskFormRequired);

  const priority = useSelector(TaskFormSlice.getPriority);
  const dateStart = useSelector(TaskFormSlice.getDateStart);
  const dateStop = useSelector(TaskFormSlice.getDateStop);
  const currentTaskId = useSelector(TaskFormSlice.getTaskFormId);
  const currentUserId = useSelector(UserSlice.userId);

  const [categoryView, setCategoryView] = useState({
    dateStart: !!dateStart,
    dateStop: !!dateStop,
    tags: tags ? tags.length !== 0 : false,
    priority: !!priority,
  });

  useEffect(() => {
    setCategoryView({
      dateStart: !!dateStart,
      dateStop: !!dateStop,
      tags: tags ? tags.length !== 0 : false,
      priority: !!priority,
    });
  }, [isSuccessLoadingTask]);

  const setStateButton = (
    argName: 'dateStart' | 'dateStop' | 'tags' | 'priority',
    flag: boolean,
  ) => () => {
    setCategoryView({ ...categoryView, [argName]: flag });
  };

  const isAuthorOrResponsible = isAuthor(currentUserId, roles)
    || isResponsible(currentUserId, roles);
  return (
    <>
      {
        status?.name
        && <StatusCategory status={status} currentTaskId={currentTaskId} />
      }
      {(status?.name === 'Выполнена' || status?.name === 'Не выполнена') && (
        <DetailsResume taskId={taskId} formResultRequired={formResultRequired} />
      )}
      <PerformerCategory roles={roles} isAuthorOrResponsible={isAuthorOrResponsible} />
      {
        categoryView.priority
        && (
          <PriorityCategory
            priority={priority}
            currentTaskId={currentTaskId}
            hiddenCategory={setStateButton('priority', false)}
          />
        )
      }
      {
        categoryView.dateStart
        && (
          <DateStartCategory
            startDateISO={dateStart}
            stopDateISO={dateStop}
            currentTaskId={currentTaskId}
            hiddenCategory={setStateButton('dateStart', false)}
          />
        )
      }
      {
        categoryView.dateStop
        && (
          <DateStopCategory
            startDateISO={dateStart}
            stopDateISO={dateStop}
            currentTaskId={currentTaskId}
            hiddenCategory={setStateButton('dateStop', false)}
          />
        )
      }
      {
        categoryView.tags
        && (
          <TagsCategory
            currentTaskId={currentTaskId}
            taskTags={tags}
            hiddenCategory={setStateButton('tags', false)}
          />
        )
      }
      <div className={styles.buttonsWrapper}>
        {
          !categoryView.dateStop
          && (
            <Tooltip title="Срок">
              <button type="button" onClick={setStateButton('dateStop', true)} className={styles.button}>
                <DateStopIcon />
              </button>
            </Tooltip>
          )
        }
        {
          !categoryView.dateStart
          && (
            <Tooltip title="Начало">
              <button type="button" onClick={setStateButton('dateStart', true)} className={styles.button}>
                <DateStartIcon />
              </button>
            </Tooltip>
          )
        }
        {
          !categoryView.priority
          && (
            <Tooltip title="Приоритет">
              <button type="button" onClick={setStateButton('priority', true)} className={styles.button}>
                <PriorityIcon />
              </button>
            </Tooltip>
          )
        }
        {
          !categoryView.tags
          && (
            <Tooltip title="Метки">
              <button type="button" onClick={setStateButton('tags', true)} className={styles.button}>
                <TagsIcon />
              </button>
            </Tooltip>
          )
        }
      </div>
    </>
  );
};

export default Details;
