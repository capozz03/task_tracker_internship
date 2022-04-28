import React, { useState } from 'react';
import { ClipIcon } from 'shared/ui/icons/ClipIcon';
import style from './index.module.scss';
import Button from 'features/Tasks/tasksComponents/Button';
import { useDispatch, useSelector } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import FilesAttachments from './FilesAttachments';
import ImagesAttachments from './ImagesAttachments';

type attachmentsProps = {
  taskId: string;
};

const Attachments = ({ taskId }: attachmentsProps) => {
  const [isVisibleAttachments, setIsVisibleAttachments] = useState<boolean>(true);
  const dispatch = useDispatch();
  const storageFiles = useSelector(TaskFormSlice.getStorageFiles);
  const storageImages = useSelector(TaskFormSlice.getStorageImages);
  const storageCount = useSelector(TaskFormSlice.getStorageCount);
  const backgroundImages = storageImages?.map(({ modifications }) => {
    const defaultImage = 'https://rus-traktor.ru/upload/iblock/6e3/6e3f5afeaf9b58a1cfd954f0aeb24d0a.jpg';
    const imagePreview = modifications.length > 0
      ? `${process.env.REACT_APP_TASK_BACKEND_URL}/api/v1.0/storage/files/${modifications[1].storage_file_id}/download`
      : defaultImage;
    return imagePreview;
  });
  console.log(backgroundImages);
  console.log(storageImages);

  const isShowAttachments = (): boolean => {
    const isVisibleStorageFiles = useSelector(TaskFormSlice.isVisibleStorageFiles);
    if (storageFiles?.length || storageImages?.length) {
      dispatch(TaskFormSlice.showFormStorageFiles());
    } else {
      dispatch(TaskFormSlice.hiddenFormStorageFiles());
    }
    return isVisibleStorageFiles;
  };

  const visibleAttachments = (): void => {
    setIsVisibleAttachments(!isVisibleAttachments);
  };

  return (
    <div className={style.taskAttachments}>
      {isShowAttachments() && (
        <>
          <div className={style.headerAttachments}>
            <div className={style.iconAttachments}>
              <ClipIcon />
            </div>
            <h5 className={style.attachments}>Вложения</h5>
            <h5 className={style.attachments}>{storageCount}</h5>
            <Button className={style.changeButton} onClick={visibleAttachments} type="default">
              {isVisibleAttachments ? 'Свернуть' : 'Развернуть'}
            </Button>
          </div>
          <div>
            {isVisibleAttachments && (
              <>
                <div className={style.taskFiles__fileList}>
                  {storageFiles?.map(
                    ({
                      name_original: nameOriginal,
                      size,
                      storage_file_id: storageFileId,
                    }) => (
                      <FilesAttachments
                        name={nameOriginal}
                        size={size}
                        storageFileId={storageFileId}
                        taskId={taskId}
                      />
                    ),
                  )}
                </div>
                <div className={style.taskFiles__imageList}>
                  {storageImages?.map(
                    ({
                      name_original: nameOriginal,
                      storage_file_id: storageFileId,
                      modifications,
                    }) => (
                      <ImagesAttachments
                        name={nameOriginal}
                        storageFileId={storageFileId}
                        taskId={taskId}
                        modifications={modifications}
                        backgroundImages={backgroundImages}
                      />
                    ),
                  )}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Attachments;
