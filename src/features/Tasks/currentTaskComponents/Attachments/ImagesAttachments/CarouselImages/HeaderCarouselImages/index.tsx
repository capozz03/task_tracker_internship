import React from 'react';
import { DeleteOutlined, CloudDownloadOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { usePermissions } from 'shared/helpers';
import { TaskFormSlice } from 'store/slice';
import style from './index.module.scss';

type HeaderCarouselImagesProps = {
  nameFile: string;
  storageFileId: string;
  closeModal: () => void;
  setIsVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderCarouselImages = ({
  nameFile,
  storageFileId,
  closeModal,
  setIsVisibleModal,
}: HeaderCarouselImagesProps) => {
  const dispatch = useDispatch();
  const downloadAttachment = (): void => {
    dispatch(TaskFormSlice.downloadStorageFile({ storageFileId }));
  };
  const roles = useSelector(TaskFormSlice.getTaskFormRoles);
  const can = usePermissions(
    ['add/remove.file'],
    roles,
  );

  const deleteAttachment = (): void => {
    setIsVisibleModal(true);
  };

  return (
    <div className={style.headerCarousel}>
      <h4 className={style.headerTitle}>{nameFile}</h4>
      <div className={style.icons}>
        {
          can['add/remove.file']
          && (
            <Button
              className={style.deleteIcon}
              onClick={deleteAttachment}
              icon={<DeleteOutlined />}
            />
          )
        }
        <Button
          className={style.downloadIcon}
          onClick={downloadAttachment}
          icon={<CloudDownloadOutlined />}
        />
        <div className={style.separator} />
        <Button className={style.closeIcon} onClick={closeModal} icon={<CloseCircleOutlined />} />
      </div>
    </div>
  );
};

export default HeaderCarouselImages;
