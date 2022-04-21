import { Upload } from 'antd';
import React, { useState } from 'react';
import { ClipIcon } from 'shared/ui/icons/ClipIcon';
import style from './index.module.scss';
import Button from 'features/Tasks/tasksComponents/Button';
import { useDispatch } from 'react-redux';
import {
  createStorageFile,
  uploadStorageFile,
} from 'store/slice/task/taskForm/setStorageForFiles';

type attachmentsProps = {
  title: string;
  taskStatusId: string;
};

const Attachments = ({ title, taskStatusId }: attachmentsProps) => {
  const [isVisibleAttachments, setIsVisibleAttachments] = useState<boolean>(false);
  const dispatch = useDispatch();
  console.log(taskStatusId);

  const uploadFiles = async (options: any) => {
    const { onSuccess, file } = options;
    const fileData = new FormData();
    fileData.append('file', file);
    try {
      dispatch(createStorageFile({ nameOriginal: title }));
      dispatch(
        uploadStorageFile({
          storageFileId: 'a9f923f8-3210-45ad-aa47-408a7777cce5',
          nameOriginal: 'string',
          file: fileData,
        }),
      );
      onSuccess('Ok');
    } catch (err) {
      console.log('Eroor: ', err);
    }
  };

  const props: any = {
    listType: 'picture',
    accept: '.pdf, .txt, .doc, .docx, .avi, .mp4, .wmv, .csv, .xls, .jpeg, .png',
    customRequest: uploadFiles,
  };

  const visibleAttachments = (): void => {
    setIsVisibleAttachments(!isVisibleAttachments);
  };

  return (
    <div className={style.taskAttachments}>
      <div className={style.headerAttachments}>
        <div className={style.iconAttachments}>
          <ClipIcon />
        </div>
        <h5 className={style.attachments}>Вложения</h5>
        <Button className={style.changeButton} onClick={visibleAttachments} type="default">
          {isVisibleAttachments ? 'Свернуть' : 'Развернуть'}
        </Button>
      </div>
      <div>
        {isVisibleAttachments && (
          <Upload {...props}>
            <Button>Click to Upload</Button>
          </Upload>
        )}
      </div>
    </div>
  );
};

export default Attachments;
