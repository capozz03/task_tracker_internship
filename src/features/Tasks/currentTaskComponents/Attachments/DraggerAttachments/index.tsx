import React from 'react';
import { PlusSquareFilled } from '@ant-design/icons';
import Dragger from 'antd/lib/upload/Dragger';
import style from './index.module.scss';
import { useDispatch } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import { RcFile } from 'antd/lib/upload';
import { alert } from 'shared';
import { validFileType } from 'shared/helpers/validFileType';

type DraggerAttachmentsProps = {
  taskId: string;
  storageCount?: number;
};

const DraggerAttachments = ({ taskId, storageCount }: DraggerAttachmentsProps) => {
  const dispatch = useDispatch();

  const uploadFiles = async (options: any) => {
    const { file } = await options;
    const fileData = new FormData();
    fileData.append('file', file);
    dispatch(
      TaskFormSlice.createStorageFile({
        nameOriginal: file.name,
        file: fileData,
        taskId,
      }),
    );
  };

  const beforeUpload = (file: RcFile) => {
    if (storageCount && storageCount >= 15) {
      alert('Максимальное кол-во файлов 15', 'error');
      return false;
    }
    const sizeFileBytes = file.size;
    if (sizeFileBytes > 52428800) {
      alert('Максимальный размер файла 50мб', 'error');
      return false;
    }
    if (!validFileType(file)) {
      alert('Разрешенные форматы: .pdf, .txt, .doc, .docx, .avi, .mp4, .wmv, .csv, .xls, .xlsx, .jpeg, .png', 'error');
      return false;
    }
    return file;
  };
  return (
    <Dragger
      className={style.dragUpload}
      showUploadList={false}
      multiple
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
