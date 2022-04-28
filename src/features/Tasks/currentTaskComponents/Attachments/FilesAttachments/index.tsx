import DropdownMenu from '../DropdownMenu';
import React from 'react';
import { FileTextIcon } from 'shared/ui/icons/FileTextIcon';
import style from './index.module.scss';
import { formatBytes } from 'shared/helpers/formatBytes';

type FilesAttachmentsProps = {
  name: string;
  size: number;
  storageFileId: string;
  taskId: string;
};

const FilesAttachments = ({ name, size, storageFileId, taskId }: FilesAttachmentsProps) => {
  const fileSize = formatBytes(size, 2);
  return (
    <div className={style.taskFiles__item}>
      <div className={style.dropdown}>
        <div className={style.menu}>
          <DropdownMenu taskId={taskId} storageFileId={storageFileId} name={name} />
        </div>
      </div>
      <div className={style.taskFiles__inner}>
        <div className={style.taskFiles__icon}>
          <FileTextIcon />
        </div>
        <div className={style.taskFiles__content}>
          <div className={style.taskFiles__name}>{name}</div>
          <div className={style.taskFiles__size}>{fileSize}</div>
        </div>
      </div>
    </div>
  );
};

export default FilesAttachments;
