import React from 'react';
import ImagesAttachments from 'features/Tasks/currentTaskComponents/Attachments/ImagesAttachments';
import { THistoryUnit } from 'store/slice/task/taskForm/history/entities';
import { TParams } from '.';
import styles from './index.module.scss';

function getFilesParams(unit: THistoryUnit) {
  const file = unit.params.storage_file;
  const result: TParams = {
    title: '',
    details: (
      <div className={styles.FilesContainer}>
        {
        file
          ? <ImagesAttachments
              name={file.name_original}
              storageFileId={file.storage_file_id}
              taskId="0"
              uploaded={file.uploaded}
              isVisibleCarousel={false}
              isVisibleDropdownMenu={false}
          />
          : ''
        }
      </div>
    ),
  };

  switch (unit.command_code) {
    case 'task.storage_file_assign':
      result.title = 'добавление файла';
      break;
    case 'task.storage_file_un_assign':
      result.title = 'удаление файла';
      break;
    default:
      break;
  }

  return result;
}

export default getFilesParams;
