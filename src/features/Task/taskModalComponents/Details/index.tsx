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

const {
  DateStartIcon,
  DateStopIcon,
  TagsIcon,
  PriorityIcon,
} = detailsIcons;

const Details = () => {
  const isSuccessLoadingTask = useSelector(TaskFormSlice.isLoadingStatusSuccess);
  const roles = useSelector(TaskFormSlice.getRoles);
  const tags = useSelector(TaskFormSlice.getTags);
  const status = useSelector(TaskFormSlice.getTaskFormStatusTask);
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

  const setViewCategoryDateStop = () => setCategoryView({ ...categoryView, dateStop: true });
  const setViewCategoryDateStart = () => setCategoryView({ ...categoryView, dateStart: true });
  const setViewCategoryTags = () => setCategoryView({ ...categoryView, tags: true });
  const setViewCategoryPriority = () => setCategoryView({ ...categoryView, priority: true });

  const setHiddenCategoryDateStop = () => setCategoryView({ ...categoryView, dateStop: false });
  const setHiddenCategoryDateStart = () => setCategoryView({ ...categoryView, dateStart: false });
  const setHiddenCategoryTags = () => setCategoryView({ ...categoryView, tags: false });
  const setHiddenCategoryPriority = () => setCategoryView({ ...categoryView, priority: false });

  const isAuthorOrResponsible = isAuthor(currentUserId, roles)
    || isResponsible(currentUserId, roles);

  return (
    <>
      {
        status?.name
        && <StatusCategory status={status} currentTaskId={currentTaskId} />
      }
      <PerformerCategory roles={roles} isAuthorOrResponsible={isAuthorOrResponsible} />
      {
        categoryView.priority
        && (
          <PriorityCategory
            priority={priority}
            currentTaskId={currentTaskId}
            hiddenCategory={setHiddenCategoryPriority}
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
            hiddenCategory={setHiddenCategoryDateStart}
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
            hiddenCategory={setHiddenCategoryDateStop}
          />
        )
      }
      {
        categoryView.tags
        && (
          <TagsCategory
            currentTaskId={currentTaskId}
            taskTags={tags}
            hiddenCategory={setHiddenCategoryTags}
          />
        )
      }
      <div className={styles.buttonsWrapper}>
        {
          !categoryView.dateStop
          && (
            <button type="button" onClick={setViewCategoryDateStop} className={styles.button}>
              <DateStopIcon />
            </button>
          )
        }
        {
          !categoryView.dateStart
          && (
            <button type="button" onClick={setViewCategoryDateStart} className={styles.button}>
              <DateStartIcon />
            </button>
          )
        }
        {
          !categoryView.priority
          && (
            <button type="button" onClick={setViewCategoryPriority} className={styles.button}>
              <PriorityIcon />
            </button>
          )
        }
        {
          !categoryView.tags
          && (
            <button type="button" onClick={setViewCategoryTags} className={styles.button}>
              <TagsIcon />
            </button>
          )
        }
      </div>
    </>
  );
};

export default Details;
