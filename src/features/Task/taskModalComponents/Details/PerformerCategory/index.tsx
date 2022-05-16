import React from 'react';
import MembersChanger from 'features/Task/taskModalComponents/MembersChanger';
import DetailCategory from 'features/Task/taskModalComponents/DetailCategory';
import UserLabel from 'features/Task/taskModalComponents/UserLabel';
import { TStateData } from 'store/slice/task/taskForm/roles/entities';
import { RolesIds } from 'shared';
import styles from '../index.module.scss';

type TProps = {
  roles: TStateData | null;
  isAuthorOrResponsible: boolean;
};

const PerformerCategory = ({ roles, isAuthorOrResponsible }: TProps) => {
  const performerContent = () => {
    if (isAuthorOrResponsible) return <MembersChanger buttonType="gray" />;
    return <p className={styles.notPerformer}>Без исполнителя</p>;
  };

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
                canRemove={isAuthorOrResponsible}
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
