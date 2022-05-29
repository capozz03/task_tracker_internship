import React from 'react';
import { Dropdown, Menu, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.scss';
import { TaskFormSlice } from 'store/slice';
import PlusIcons from 'shared/ui/icons/PlusIcons';
import { alert, validFileType } from 'shared';
import { RcFile } from 'antd/lib/upload/interface';

const AttachMenu = () => {
  const dispatch = useDispatch();
  const { Item } = Menu;

  const checklists = useSelector(TaskFormSlice.getCheckLists);
  const storageCount = useSelector(TaskFormSlice.getStorageCount);
  const task = useSelector(TaskFormSlice.getTask);

  const uploadFiles = async (options: any) => {
    const { file } = await options;
    const fileData = new FormData();
    fileData.append('file', file);
    dispatch(
      TaskFormSlice.createStorageFile({
        nameOriginal: file.name,
        file: fileData,
        taskId: task?.task_id,
      }),
    );
  };

  const beforeUpload = (file: RcFile) => {
    console.log(file.type);
    if (storageCount && storageCount >= 15) {
      alert('Максимальное кол-во файлов 15', 'error');
      return false;
    }

    const sizeFileBytes = file.size;
    if (sizeFileBytes > 52428800) {
      alert('Максимальный размер файла 50мб', 'error');
      return false;
    }

    const isValidFileType = validFileType(file);
    if (!isValidFileType) {
      alert(
        'Разрешенные форматы: .pdf, .txt, .doc, .docx, .avi, .mp4, .wmv, .csv, .xls, .xlsx, .jpeg, .png',
        'error',
      );
      return false;
    }
    return file;
  };

  const checklistHandle = () => {
    if (checklists && checklists.length >= 3) {
      alert('В задаче не может быть более 3-х чеклистов', 'error');
    } else {
      dispatch(TaskFormSlice.showFormCreateChecklist());
    }
  };

  const menu = (
    <Menu className={styles.dropdownMenu}>
      <Item key="1" onClick={checklistHandle}>
        Добавить чек-лист
      </Item>
      <Item key="2" onClick={uploadFiles}>
        <Upload
          showUploadList={false}
          accept=".pdf, .txt, .doc, .docx, .avi, .mp4, .wmv, .csv, .xls, .xlsx, .jpeg, .jpg, .png"
          customRequest={uploadFiles}
          beforeUpload={beforeUpload}
        >
          Прикрепить вложение
        </Upload>
      </Item>
    </Menu>
  );

  return (
    <Dropdown.Button
      className={styles.dropdownButton}
      overlay={menu}
      trigger={['click']}
      icon={<PlusIcons />}
    />
  );
};

export default AttachMenu;
