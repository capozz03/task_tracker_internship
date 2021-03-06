import DropdownMenu from '../DropdownMenu';
import React, { useEffect } from 'react';
import style from './index.module.scss';
import { useSelector } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import { Progress } from 'antd';
import Icon from '@ant-design/icons';
import { checkFileExtension, formatBytes, slicedName } from 'shared';

type FilesAttachmentsProps = {
  name: string;
  size: number;
  storageFileId: string;
  taskId: string;
  uploaded: boolean;
  isVisibleDropdownMenu: boolean;
  canChange?: boolean;
};

const FilesAttachments = ({
  name,
  size,
  storageFileId,
  taskId,
  uploaded,
  isVisibleDropdownMenu,
  canChange = false,
}: FilesAttachmentsProps) => {
  const fileSize = formatBytes(size, 2);
  const progressBar = useSelector(TaskFormSlice.progressBar);
  const fileExtension = name.split('.')[1];

  const { icon, bgColor } = checkFileExtension(fileExtension);
  const styleOfFileItem = { border: `1px solid ${bgColor}`, backgroundColor: bgColor };

  useEffect(() => {
    checkFileExtension(fileExtension);
  }, [fileExtension]);

  return (
    <div className={style.taskFiles__item} style={styleOfFileItem}>
      <div className={style.dropdown}>
        {isVisibleDropdownMenu && (
          <div>
            <DropdownMenu
              taskId={taskId}
              storageFileId={storageFileId}
              name={name}
              canChange={canChange}
            />
          </div>
        )}
      </div>
      <div className={style.taskFiles__inner}>
        <div className={style.taskFiles__icon}>
          <Icon component={icon} />
        </div>
        <div className={style.taskFiles__content}>
          <div className={style.taskFiles__name}>{slicedName(name)}</div>
          <div className={style.taskFiles__size}>
            {!uploaded ? <Progress percent={progressBar} size="small" /> : fileSize}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilesAttachments;
