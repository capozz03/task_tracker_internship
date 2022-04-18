import React from 'react';
import { ClipIcon } from 'shared/ui/icons/ClipIcon';
import style from './index.module.scss';

const Attachments = () => {
  const s = '';
  console.log(s);
  return (
    <div className={style.taskDescription}>
      <div className={style.headerDescription}>
        <div className={style.iconDescription}>
          <ClipIcon />
        </div>
        <h5 className={style.description}>Вложения</h5>
      </div>
    </div>
  );
};

export default Attachments;
