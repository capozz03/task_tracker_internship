import React from 'react';
import { Dropdown, Menu, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.scss';
import { TaskFormSlice } from 'store/slice';
import PlusIcons from 'shared/ui/icons/PlusIcons';
import { alert } from 'shared';

const AttachMenu = () => {
  const dispatch = useDispatch();
  const { Item } = Menu;

  const checklists = useSelector(TaskFormSlice.getCheckLists);
  const task = useSelector(TaskFormSlice.getTask);
  const taskId = task?.task_id;

  const uploadFiles = async (options: any) => {
    const { file } = options;
    const fileData = new FormData();
    fileData.append('file', file);
    dispatch(TaskFormSlice.createStorageFile({ nameOriginal: file.name, file: fileData, taskId }));
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
          accept=".pdf, .txt, .doc, .docx, .avi, .mp4, .wmv, .csv, .xls, .jpeg, .jpg, .png"
          customRequest={uploadFiles}
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
