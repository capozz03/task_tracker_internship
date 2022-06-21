import React from 'react';
import { useSelector } from 'react-redux';
import MembersChanger from 'features/Task/taskModalComponents/MembersChanger';
import DetailCategory from 'features/Task/taskModalComponents/Details/DetailCategory';
import UserLabel from 'features/Task/taskModalComponents/UserLabel';
import { TStateData } from 'store/slice/task/taskForm/roles/entities';
import { RolesIds } from 'shared';
import { TaskFormSlice } from 'store/slice';
import { usePermissions } from 'shared/helpers';
import styles from './index.module.scss';

type TProps = {
  roles: TStateData | null;
};

const PerformerCategory = ({ roles }: TProps) => {
  const rolesArray = useSelector(TaskFormSlice.getTaskFormRoles);
  const can = usePermissions(
    ['change.responsible', 'change.observer', 'change.performer'],
    rolesArray,
  );

  const performerContent = () => (
    (can['change.observer'] || can['change.performer'] || can['change.responsible'])
      ? <MembersChanger buttonType="gray" />
      : <p className={styles.notPerformer}>Без исполнителя</p>
  );

  return (
    <DetailCategory name="Назначена" type="details">
      {
        roles?.performers && roles?.performers.length !== 0
          ? (
            roles.performers.map((member) => (
              <UserLabel
                key={member.userId}
                user={member}
                roleId={RolesIds.PERFORMER}
                roleName="Исполнитель"
                canRemove={can['change.performer']}
              />
            ))
          )
          : (
            performerContent()
          )
        }
    </DetailCategory>
  );
};

export default PerformerCategory;
