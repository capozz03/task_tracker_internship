import DropdownMenu from '../DropdownMenu';
import React, { useState } from 'react';
import style from './index.module.scss';
import { TStorageFiles } from 'store/slice/task/entities';

type HoverProps = {
  storageFileId: string;
  taskId: string;
  name: string;
};

const HoverMenu = ({ taskId, storageFileId, name }: HoverProps) => (
  <div className={style.dropdown}>
    <div className={style.menu}>
      <DropdownMenu taskId={taskId} storageFileId={storageFileId} name={name} />
    </div>
  </div>
);

type ImagesAttachmentsProps = {
  name: string;
  storageFileId: string;
  taskId: string;
  modifications: TStorageFiles[];
};

const ImagesAttachments = ({
  name,
  storageFileId,
  taskId,
  modifications,
}: ImagesAttachmentsProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const defaultImage = 'https://rus-traktor.ru/upload/iblock/6e3/6e3f5afeaf9b58a1cfd954f0aeb24d0a.jpg';
  const imagePreview = modifications.length > 0
    ? `${process.env.REACT_APP_TASK_BACKEND_URL}/api/v1.0/storage/files/${modifications[0].storage_file_id}/download`
    : defaultImage;

  return (
    <div className={style.taskImages__wrapper}>
      <div
        className={style.taskImages__item}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ backgroundImage: `url(${imagePreview})` }}
      >
        {isHovering && (
          <HoverMenu taskId={taskId} storageFileId={storageFileId} name={name} />
        )}
      </div>
      <div className={style.taskFiles__content}>
        <div className={style.taskFiles__name}>{name}</div>
      </div>
    </div>
  );
};

export default ImagesAttachments;
