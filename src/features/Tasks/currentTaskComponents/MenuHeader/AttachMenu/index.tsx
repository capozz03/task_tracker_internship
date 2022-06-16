import React, { useEffect, useState } from 'react';
import { Dropdown, Menu, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.scss';
import { TaskFormSlice } from 'store/slice';
import PlusIcons from 'shared/ui/icons/PlusIcons';
import { acceptedFiles, alert, beforeUploadWrapper, uploadFilesWrapper } from 'shared';
import Tooltip from 'features/Tasks/tasksComponents/TooltipForModal';
import { checkPermission } from 'shared/helpers';

type AttachMenuProps = {
  taskId: string;
};

const tooltip = (canAddFile: boolean, canAddChecklist: boolean) => {
  if (canAddFile && canAddChecklist) return 'Добавить чек-лист или вложение';
  if (canAddFile) return 'Добавить вложение';
  if (canAddChecklist) return 'Добавить чек-лист';
  return '';
};

const AttachMenu = ({ taskId }: AttachMenuProps) => {
  const dispatch = useDispatch();
  const { Item } = Menu;
  const storageCount = useSelector(TaskFormSlice.getStorageCount);
  const checklists = useSelector(TaskFormSlice.getCheckLists);
  const roles = useSelector(TaskFormSlice.getTaskFormRoles);
  const [can, setCan] = useState({
    addChecklist: checkPermission('add/change/remove.checklist', roles),
    addFile: checkPermission('add/remove.file', roles),
  });

  useEffect(() => {
    setCan({
      addChecklist: checkPermission('add/change/remove.checklist', roles),
      addFile: checkPermission('add/remove.file', roles),
    });
  }, [roles]);

  const uploadFiles = uploadFilesWrapper(dispatch, taskId);
  const beforeUpload = beforeUploadWrapper(storageCount);

  const checklistHandle = () => {
    if (checklists && checklists.length >= 3) {
      alert('В задаче не может быть более 3-х чеклистов', 'error');
    } else {
      dispatch(TaskFormSlice.showFormCreateChecklist());
    }
  };

  const menu = (
    <Menu className={styles.dropdownMenu}>
      {
        can.addChecklist
        && (
          <Item key="1" onClick={checklistHandle}>
            Добавить чек-лист
          </Item>
        )
      }
      {
        can.addFile
        && (
          <Item key="2" onClick={uploadFiles}>
            <Upload
              showUploadList={false}
              accept={acceptedFiles}
              customRequest={uploadFiles}
              beforeUpload={beforeUpload}
            >
              Прикрепить вложение
            </Upload>
          </Item>
        )
      }
    </Menu>
  );

  return (
    <Tooltip
      title={tooltip(can.addFile, can.addChecklist)}
      placement="left"
      getPopupContainer={() => document.querySelector('.ant-modal-wrap') as HTMLElement}
    >
      <Dropdown.Button
        getPopupContainer={() => document.querySelector('.ant-modal-wrap') as HTMLElement}
        className={styles.dropdownButton}
        overlay={menu}
        trigger={['click']}
        icon={<PlusIcons />}
      />
    </Tooltip>
  );
};

export default AttachMenu;
