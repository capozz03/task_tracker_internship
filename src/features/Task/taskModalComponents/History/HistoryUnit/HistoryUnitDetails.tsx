import React from 'react';
import { THistoryUnit } from 'store/slice/task/taskForm/history/entities';
import { TDetailsProps } from '.';
import { CheckboxIcon } from 'shared/ui/icons';
import { BlockIcon, CheckIcon, CrossIcon } from 'shared/ui/icons/TaskHistory';
import { Checkbox, Tag, UserAvatar } from 'features/Tasks/tasksComponents';
import styles from './index.module.scss';
import { DatePickerIcon } from 'shared/ui/icons/DetailsIcons';
import { formatDate } from 'shared/helpers';
import moment from 'moment';
import ImagesAttachments from 'features/Tasks/currentTaskComponents/Attachments/ImagesAttachments';
import { taskStatuses } from 'features/Tasks/tasksComponents/TaskStatus/constants';

type TProps = TDetailsProps & { unit: THistoryUnit };

const priorityColors = [
  {
    name: 'Высокий',
    color: '#FC5A5A',
  },
  {
    name: 'Средний',
    color: '#FFC542',
  },
  {
    name: 'Низкий',
    color: '#82C43C',
  },
];

const HistoryUnitDetails = ({ type, unit, roleType = 'add', tagType = 'add' }: TProps) => {
  switch (type) {
    case 'checkbox':
      return (
        <div className={styles.ChecklistContainer}>
          { unit.params.message ? <CheckboxIcon /> : <BlockIcon /> }
          <span className={styles.text}>
            { unit.params.message || 'Удаленный пункт' }
          </span>
        </div>
      );

    case 'checkboxChangeComplete':
      return (
        <div className={styles.ChecklistContainer}>
          {
            unit.params.check_list_item
              ? <Checkbox checked={unit.params.complete} />
              : <BlockIcon />
          }
          <span className={styles.text}>
            { unit.params.check_list_item?.message || 'Удаленный пункт' }
          </span>
        </div>
      );

    case 'checkboxSetPosition':
      return (
        <div className={styles.ChecklistContainer}>
          {
            unit.params.check_list_item
              ? <CheckboxIcon />
              : <BlockIcon />
          }
          <span className={styles.text}>
            { unit.params.check_list_item?.message || 'Удаленный пункт' }
          </span>
        </div>
      );

    case 'dateStart':
      return (
        <div className={styles.DatesContainer}>
          <DatePickerIcon />
          <span className={styles.DatesDate}>
            {
              unit.params.exec_start
                ? formatDate(moment(unit.params.exec_start))
                : 'дата удалена'
            }
          </span>
        </div>
      );

    case 'dateStop':
      return (
        <div className={styles.DatesContainer}>
          <DatePickerIcon />
          <span className={styles.DatesDate}>
            {
              unit.params.exec_stop
                ? formatDate(moment(unit.params.exec_stop))
                : 'дата удалена'
            }
          </span>
        </div>
      );

    case 'file':
      return (
        <div className={styles.FilesContainer}>
          {
            !!unit.params.storage_file
            && (
              <ImagesAttachments
                name={unit.params.storage_file.name_original}
                storageFileId={unit.params.storage_file.storage_file_id}
                taskId="0"
                uploaded={unit.params.storage_file.uploaded}
                isVisibleCarousel={false}
                isVisibleDropdownMenu={false}
              />
            )
          }
        </div>
      );

    case 'role':
      return (
        <div className={styles.RolesContainer}>
          <UserAvatar
            user={unit.params.assign_user || { user_id: '-1', name: 'Неизвестный пользователь' }}
            color="#C3AEFF"
          />
          <div>
            <p className={styles.RolesName}>
              { unit.params.assign_user?.name || 'Неизвестный пользователь' }
            </p>
            <p className={styles.RolesDesc}>
              { roleType === 'add' ? <CheckIcon /> : <CrossIcon /> }
              { unit.params.task_role?.name || 'Неизвестная роль' }
            </p>
          </div>
        </div>
      );

    case 'status':
      return (
        <div className={styles.StatusContainer}>
          <span
            className={styles.Status}
            style={{
              backgroundColor: taskStatuses.find(
                (el) => el.status === unit.params.status?.name)?.color || '#D5D5DC',
            }}
          >
            { unit.params.status?.name || 'Неизвестный статус' }
          </span>
        </div>
      );

    case 'priority':
      return (
        <div className={styles.PriorityContainer}>
          <span
            className={styles.PriorityRound}
            style={{
              backgroundColor: priorityColors.find(
                (el) => el.name === unit.params.priority?.name)?.color || '#D5D5DC',
            }}
          />
          <span className={styles.PriorityText}>
            { unit.params.priority?.name || 'Нет приоритета' }
          </span>
        </div>
      );

    case 'resume':
      return (
        <div className={styles.ResumeContainer}>
          <div className={styles.Resume}>
            <p className={styles.Title}>Резюме: </p>
            <p className={styles.Content}>
              {
                (unit.params.form_result && !!unit.params.form_result.length
                && unit.params.form_result?.filter((field) => field.field_name === 'resume')[0]?.value)
                || <span className={styles.notFound}>Не найдено</span>
              }
            </p>
          </div>
          <div className={styles.Comment}>
            <p className={styles.Title}>Комментарий: </p>
            <p className={styles.Content}>
              {
                (unit.params.form_result && !!unit.params.form_result.length
                && unit.params.form_result?.filter((field) => field.field_name === 'comment')[0]?.value)
                || <span className={styles.notFound}>Не найдено</span>
              }
            </p>
          </div>
        </div>
      );

    case 'tag':
      return (
        <div className={styles.TagContainer}>
          { tagType === 'add' ? <CheckIcon /> : <CrossIcon /> }
          {
            unit.params.tag
              ? <Tag tag={unit.params.tag} />
              : <Tag tag={{ task_tag_id: '-1', name: 'Тег не найден', color: '#B5B5BE' }} />
          }
        </div>
      );

    case 'empty':
    default:
      return <span />;
  }
};

export default HistoryUnitDetails;
