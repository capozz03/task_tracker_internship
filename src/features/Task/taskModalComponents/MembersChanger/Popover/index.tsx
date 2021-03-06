import React, { useEffect, useState } from 'react';
import { Popover } from 'antd';
import { TUser } from 'store/slice/user/entities';
import Checkbox from 'features/Task/taskModalComponents/Checkbox';
import styles from '../index.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import { TStateData } from 'store/slice/task/taskForm/roles/entities';
import { alert, RoleMaxAmounts, RolesIds } from 'shared';
import { addUserRole, removeUserRole } from 'store/slice/task/taskForm';
import { hasRole, usePermissions } from 'shared/helpers';

type TProps = {
  member: TUser,
  afterAddRole: ()=>void,
  children: any
}

type TRoleType = 'observer' | 'performer' | 'responsible';
type TRoleArrayKey = 'observers' | 'performers' | 'responsible';

type TMemberRoles = {
  observer: boolean;
  performer: boolean;
  responsible: boolean;
}

const getMemberRoles = (member: TUser, rolesInTask: TStateData): TMemberRoles => ({
  performer: rolesInTask.performers.filter((e) => e.userId === member.user_id).length !== 0,
  responsible: rolesInTask.responsible.filter((e) => e.userId === member.user_id).length !== 0,
  observer: rolesInTask.observers.filter((e) => e.userId === member.user_id).length !== 0,
});

const MemberChangerPopover = ({ member, afterAddRole, children }: TProps) => {
  const dispatch = useDispatch();
  const currentTaskId = useSelector(TaskFormSlice.getTaskFormId);
  const rolesInTask = useSelector(TaskFormSlice.getRoles);
  const rolesArray = useSelector(TaskFormSlice.getTaskFormRoles);

  const [isDisabled, setIsDisabled] = useState(false);
  const [roles, setRoles] = useState<TMemberRoles>({
    observer: false, performer: false, responsible: false });

  const [isAuthor, setIsAuthor] = useState(hasRole('author', rolesArray, member.user_id));
  const can = usePermissions(
    ['change.responsible', 'change.observer', 'change.performer'],
    rolesArray,
  );

  useEffect(() => {
    setIsAuthor(hasRole('author', rolesArray, member.user_id));
  }, [rolesArray]);

  useEffect(() => {
    if (rolesInTask !== null) setRoles(getMemberRoles(member, rolesInTask));
  }, [rolesInTask]);

  const onChangeUserRole = (
    roleId: RolesIds,
    roleName: string,
    roleType: TRoleType,
    roleArrayKey: TRoleArrayKey,
    maxOnRole: RoleMaxAmounts,
  ) => {
    if (roles[roleType]) {
      dispatch(removeUserRole({
        userId: member.user_id,
        userName: member.name,
        taskId: currentTaskId,
        roleId,
        roleName,
      }));
    } else {
      if (rolesInTask && isAuthor && roleId === RolesIds.PERFORMER) {
        alert('?????????? ???????????? ???? ?????????? ???????? ???????????????? ???? ???????? ??????????????????????!', 'error');
        return;
      }

      if (rolesInTask && rolesInTask[roleArrayKey].length >= maxOnRole) {
        const amountUsersOnRemove = rolesInTask[roleArrayKey].length - maxOnRole + 1;
        const removedUsers = [];
        for (let i = 0; i < amountUsersOnRemove; i += 1) {
          removedUsers.push(rolesInTask[roleArrayKey][i]);
        }
        removedUsers.forEach((user) => {
          dispatch(removeUserRole({
            userId: user.userId,
            userName: user.userName,
            taskId: currentTaskId,
            roleId,
            roleName,
          }));
        });
      }

      dispatch(addUserRole({
        userId: member.user_id,
        userName: member.name,
        taskId: currentTaskId,
        roleId,
        roleName,
      }));
    }

    const newState = { ...roles };
    newState[roleType] = !roles[roleType];
    setRoles(newState);
    setIsDisabled(true);
    afterAddRole();
  };

  const content = () => (
    <div className={styles.popupCheckboxes}>
      {
        can['change.observer']
        && (
          <Checkbox
            onChange={() => onChangeUserRole(
              RolesIds.OBSERVER,
              '??????????????????????',
              'observer',
              'observers',
              RoleMaxAmounts.OBSERVER,
            )}
            checked={roles.observer}
            disabled={isDisabled}
          >
            ??????????????????????
          </Checkbox>
        )
      }
      {
        can['change.performer']
        && (
          <Checkbox
            onChange={() => onChangeUserRole(
              RolesIds.PERFORMER,
              '??????????????????????',
              'performer',
              'performers',
              RoleMaxAmounts.PERFORMER,
            )}
            checked={roles.performer}
            disabled={isDisabled}
          >
            ??????????????????????
          </Checkbox>
        )
      }
      {
        can['change.responsible']
        && (
          <Checkbox
            onChange={() => onChangeUserRole(
              RolesIds.RESPONSIBLE,
              '??????????????????????????',
              'responsible',
              'responsible',
              RoleMaxAmounts.RESPONSIBLE,
            )}
            checked={roles.responsible}
            disabled={isDisabled}
          >
            ??????????????????????????
          </Checkbox>
        )
      }
    </div>
  );

  return (
    <Popover
      placement="rightTop"
      title="???????? ??????????????????:"
      content={content}
      trigger="click"
      overlayClassName={styles.popup}
    >
      { children }
    </Popover>
  );
};

export default MemberChangerPopover;
