import DropdownMenu from '../DropdownMenu';
import React, { useState } from 'react';
import style from './index.module.scss';
import { TStorageFiles } from 'store/slice/task/entities';
import { setImageUrl } from './setImageUrl';

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

  const imagePreview = setImageUrl(modifications);

  return (
    <div className={style.taskImages__wrapper}>
      <div
        className={style.taskImages__item}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ backgroundImage: `url(${imagePreview})` }}
      >
        {isHovering && <HoverMenu taskId={taskId} storageFileId={storageFileId} name={name} />}
      </div>
      <div className={style.taskFiles__content}>
        <div className={style.taskFiles__name}>{name}</div>
      </div>
    </div>
  );
};

export default ImagesAttachments;
