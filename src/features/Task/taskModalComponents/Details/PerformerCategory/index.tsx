import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MembersChanger from 'features/Task/taskModalComponents/MembersChanger';
import DetailCategory from 'features/Task/taskModalComponents/Details/DetailCategory';
import UserLabel from 'features/Task/taskModalComponents/UserLabel';
import { TStateData } from 'store/slice/task/taskForm/roles/entities';
import { RolesIds } from 'shared';
import styles from './index.module.scss';
import { checkPermission } from 'shared/helpers';
import { TaskFormSlice } from 'store/slice';

type TProps = {
  roles: TStateData | null;
};

const PerformerCategory = ({ roles }: TProps) => {
  const rolesArray = useSelector(TaskFormSlice.getTaskFormRoles);
  const [can, setCan] = useState({
    changeResponsible: checkPermission('change.responsible', rolesArray),
    changeObserver: checkPermission('change.observer', rolesArray),
    changePerformer: checkPermission('change.performer', rolesArray),
  });

  useEffect(() => {
    setCan({
      changeResponsible: checkPermission('change.responsible', rolesArray),
      changeObserver: checkPermission('change.observer', rolesArray),
      changePerformer: checkPermission('change.performer', rolesArray),
    });
  }, [rolesArray]);

  const performerContent = () => (
    (can.changeObserver || can.changePerformer || can.changeResponsible)
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
                canRemove={can.changePerformer}
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
