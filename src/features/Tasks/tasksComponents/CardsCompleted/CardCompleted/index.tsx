import { Progress } from 'antd';
import React from 'react';
import { TTag, TTagsTask } from 'store/slice/task/entities';
import { TUser } from 'store/slice/user/entities';
import CardName from '../../CardName';
import { DropdownMenu } from '../../DropdownMenu';
import TagsGroup from '../../TagsGroup';
import { TaskStatus } from '../../TaskStatus';
import UserAvatar from '../../UserAvatar';
import style from './index.module.scss';

type CardCompletedProps = {
  user: TUser;
  tags: TTagsTask[];
};

export const CardCompleted = ({ user, tags }: CardCompletedProps) => (
  <div className={style.cardCompletedTask}>
    <div className={style.main}>
      <CardName
        name="Презентация новой системы взаимодействия"
        attachments={4}
        checkListChecked={4}
        checkListTotal={5}
      />
      <TaskStatus defaultValue="Выполнена" />
      <TagsGroup tags={tags} />
      <div style={{ width: 170 }}>
        <Progress percent={30} size="small" strokeColor="#3DD598" />
      </div>
      <UserAvatar user={user} color="#000" />
    </div>
    <div className={style.dropdown}>
      <DropdownMenu />
    </div>
  </div>
);
