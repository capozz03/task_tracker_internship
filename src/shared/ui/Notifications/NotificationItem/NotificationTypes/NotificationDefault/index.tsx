import React from 'react';
import { TNotification } from 'store/slice/task/notifications/entities';
import styles from 'shared/ui/Notifications/NotificationItem/index.module.scss';
import { PriorityStatus, UserAvatar } from 'features/Tasks/tasksComponents';
import moment from 'moment';
import Tag from 'features/Tasks/tasksComponents/Tag';
import CheckItemWithoutFunction from '../CheckItemWithoutFunction';
import BlockIcon from '../../../../icons/BlockIcon';

type NotificationProps = {
  notification: TNotification;
}

const NotificationRoleAssign = ({ notification }: NotificationProps) => {
  const event = notification.history_command;
  return (
    <div>
      <div className={styles.userAssigned}>
        <div className={styles.avatar}>
          <UserAvatar user={event.user} color="#A461D8" />
        </div>
        <div className={styles.nameAndEvent}>
          <div className={styles.name}>
            { event.user.name }
          </div>
          <div className={styles.event}>
            { event.command_name }
          </div>
          <div>
            <strong>
              { event.params.title
                || event.params.status?.name }
              {
                event.params.exec_start && moment(event.params.exec_start).format('DD.MM.YYYY')
              }
              {
                event.params.exec_stop && moment(event.params.exec_stop).format('DD.MM.YYYY')
              }
              { event.params.check_list && !event.params.title && event.params.check_list.title }
              { (event.params.check_list_item || event.params.message) && (
                <div>
                  <CheckItemWithoutFunction completed={event.params.complete || false}>
                    {event.params.check_list_item?.message || event.params.message}
                  </CheckItemWithoutFunction>
                </div>
              ) }
              { event.params.check_list_item === null && (
                <div className={styles.removeCheckListItem}>
                  <BlockIcon color="#FC5A5A" />
                  Удаленный пункт
                </div>) }
            </strong>
          </div>
          <div className={styles.contentWithMarginTop}>
            { event.params.tag && <Tag tag={event.params.tag} /> }
            { event.params.priority && <PriorityStatus type={event.params.priority.name} /> }
            { event.params.form_result && event.params.form_result[0].field_name === 'resume' && (
              <>
                <div>
                  Резюме:
                  <strong>{ ` ${event.params.form_result[0].value}` }</strong>
                </div>
                <div>
                  Комментарий:
                  <strong>{ ` ${event.params.form_result[1].value}` }</strong>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationRoleAssign;
