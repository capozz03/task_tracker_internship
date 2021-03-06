import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import PerformerCategory from './PerformerCategory';
import StatusCategory from './StatusCategory';
import PriorityCategory from './PriorityCategory';
import { DateStartCategory, DateStopCategory } from './DateCategory';
import TagsCategory from './TagsCategory';
import { detailsIcons } from 'shared/ui/icons';
import styles from './index.module.scss';
import DetailsResume from './DetailsResume';
import Tooltip from 'features/Tasks/tasksComponents/TooltipForModal';
import { usePermissions } from 'shared/helpers';

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

  const formAvailable = useSelector(TaskFormSlice.getTaskFormAvailable);
  const formResultRequired = useSelector(TaskFormSlice.getTaskFormStatusTaskFormRequired);
  const rolesArray = useSelector(TaskFormSlice.getTaskFormRoles);
  const priority = useSelector(TaskFormSlice.getPriority);
  const dateStart = useSelector(TaskFormSlice.getDateStart);
  const dateStop = useSelector(TaskFormSlice.getDateStop);
  const currentTaskId = useSelector(TaskFormSlice.getTaskFormId);

  const [categoryView, setCategoryView] = useState({
    dateStart: !!dateStart,
    dateStop: !!dateStop,
    tags: tags ? tags.length !== 0 : false,
    priority: !!priority,
  });

  const can = usePermissions(
    ['change.dateStart', 'change.dateStop', 'change.priority', 'change.tag', 'add/remove.resume'],
    rolesArray,
  );

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

  return (
    <>
      {
        status?.name
        && <StatusCategory status={status} currentTaskId={currentTaskId} />
      }
      { (status?.name === '??????????????????' || status?.name === '???? ??????????????????') && formAvailable && (
        <DetailsResume
          taskId={taskId}
          formResultRequired={formResultRequired}
          canChange={can['add/remove.resume']}
        />
      )}
      <PerformerCategory roles={roles} />
      {
        categoryView.priority
        && (
          <PriorityCategory
            priority={priority}
            currentTaskId={currentTaskId}
            hiddenCategory={setStateButton('priority', false)}
            isDisabled={!can['change.priority']}
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
            isDisabled={!can['change.dateStart']}
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
            isDisabled={!can['change.dateStop']}
            status={status}
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
            isDisabled={!can['change.tag']}
          />
        )
      }
      <div className={styles.buttonsWrapper}>
        {
          can['change.dateStop'] && !categoryView.dateStop
          && (
            <Tooltip title="????????">
              <button type="button" onClick={setStateButton('dateStop', true)} className={styles.button}>
                <DateStopIcon />
              </button>
            </Tooltip>
          )
        }
        {
          can['change.dateStart'] && !categoryView.dateStart
          && (
            <Tooltip title="????????????">
              <button type="button" onClick={setStateButton('dateStart', true)} className={styles.button}>
                <DateStartIcon />
              </button>
            </Tooltip>
          )
        }
        {
          can['change.priority'] && !categoryView.priority
          && (
            <Tooltip title="??????????????????">
              <button type="button" onClick={setStateButton('priority', true)} className={styles.button}>
                <PriorityIcon />
              </button>
            </Tooltip>
          )
        }
        {
          can['change.tag'] && !categoryView.tags
          && (
            <Tooltip title="??????????">
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
