import React, { useState } from 'react';
import classNames from 'classnames';
import { ArrowIcon } from 'shared/ui/icons';
import { TStateData } from 'store/slice/task/taskForm/roles/entities';
import styles from '../../index.module.scss';

export const CollapseHeader = ({ name, children }: {name: string, children: any}) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <button
      type="button"
      className={classNames(styles.memberHeader, { [styles.arrowRotate]: isOpened })}
      onClick={() => setIsOpened(!isOpened)}
    >
      <ArrowIcon />
      <p>{ name }</p>
      <hr />
      { children }
    </button>
  );
};

export const CollapseMembersHeader = ({ roles }: {roles: TStateData | null}) => (
  <CollapseHeader name="Участники">
    <span>
      { (roles?.observers.length || 0) + (roles?.responsible.length || 0) }
    </span>
  </CollapseHeader>
);
