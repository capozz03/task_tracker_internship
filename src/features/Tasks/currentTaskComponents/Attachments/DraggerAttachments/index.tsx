import React from 'react';
import { PlusSquareFilled } from '@ant-design/icons';
import Dragger from 'antd/lib/upload/Dragger';
import style from './index.module.scss';
import { useDispatch } from 'react-redux';
import { acceptedFiles, beforeUploadWrapper, uploadFilesWrapper } from 'shared';

type DraggerAttachmentsProps = {
  taskId: string;
  storageCount?: number;
};

const DraggerAttachments = ({ taskId, storageCount }: DraggerAttachmentsProps) => {
  const dispatch = useDispatch();

  const uploadFiles = uploadFilesWrapper(dispatch, taskId);
  const beforeUpload = beforeUploadWrapper(storageCount);

  return (
    <Dragger
      className={style.dragUpload}
      showUploadList={false}
      accept={acceptedFiles}
      customRequest={uploadFiles}
      beforeUpload={beforeUpload}
    >
      <div className={style.dragWrapper}>
        <div className={style.dragIconWrap}>
          <PlusSquareFilled className={style.dragIcon} />
        </div>
        <div className={style.dragText}>Перетащите сюда или загрузите файл</div>
      </div>
    </Dragger>
  );
};

export default DraggerAttachments;
