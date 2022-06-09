import { DeleteOutlined, CloudDownloadOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
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

  const deleteAttachment = (): void => {
    setIsVisibleModal(true);
  };
  return (
    <div className={style.headerCarousel}>
      <h4 className={style.headerTitle}>{nameFile}</h4>
      <div className={style.icons}>
        <Button className={style.deleteIcon} onClick={deleteAttachment} icon={<DeleteOutlined />} />
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
