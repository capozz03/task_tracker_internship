import React, { useState } from 'react';
import { ClipIcon } from 'shared/ui/icons';
import style from './index.module.scss';
import Button from 'features/Tasks/tasksComponents/Button';
import { useDispatch, useSelector } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import FilesAttachments from './FilesAttachments';
import ImagesAttachments from './ImagesAttachments';
import { setCarouselImages, useBreakPoint } from 'shared';
import DraggerAttachments from './DraggerAttachments';
import { usePermissions } from 'shared/helpers';

type attachmentsProps = {
  taskId: string;
};

const Attachments = ({ taskId }: attachmentsProps) => {
  const dispatch = useDispatch();
  const roles = useSelector(TaskFormSlice.getTaskFormRoles);
  const storageFiles = useSelector(TaskFormSlice.getStorageFiles);
  const storageImages = useSelector(TaskFormSlice.getStorageImages);
  const storageCount = useSelector(TaskFormSlice.getStorageCount);
  const carouselImages = setCarouselImages(storageImages);

  const [isVisibleAttachments, setIsVisibleAttachments] = useState<boolean>(true);
  const [isVisibleDropdownMenu] = useState<boolean>(true);
  const [isVisibleCarousel] = useState<boolean>(true);
  const can = usePermissions(
    ['add/remove.file'],
    roles,
  );

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

  const isShowBlockOfAttachments = isShowAttachments();
  const isShowDraggerAttachments = !useBreakPoint(992) && storageCount && storageCount < 15;

  return (
    <div className={style.taskAttachments}>
      {isShowBlockOfAttachments && (
        <>
          <div className={style.headerAttachments}>
            <div className={style.iconAttachments}>
              <ClipIcon />
            </div>
            <h5 className={style.attachments}>????????????????</h5>
            <h5 className={style.attachments}>{storageCount}</h5>
            <Button className={style.changeButton} onClick={visibleAttachments} type="default">
              {isVisibleAttachments ? '????????????????' : '????????????????????'}
            </Button>
          </div>
          {isVisibleAttachments && (
            <div>
              <div className={style.taskFiles__fileList}>
                {storageFiles?.map(
                  ({
                    name_original: nameOriginal,
                    size,
                    storage_file_id: storageFileId,
                    uploaded,
                  }) => (
                    <FilesAttachments
                      key={storageFileId}
                      name={nameOriginal}
                      size={size}
                      storageFileId={storageFileId}
                      taskId={taskId}
                      uploaded={uploaded}
                      isVisibleDropdownMenu={isVisibleDropdownMenu}
                      canChange={can['add/remove.file']}
                    />
                  ),
                )}
                { can['add/remove.file'] && isShowDraggerAttachments && (
                  <DraggerAttachments taskId={taskId} storageCount={storageCount} />
                )}
              </div>
              <div className={style.taskFiles__imageList}>
                {storageImages?.map(
                  ({ name_original: nameOriginal, storage_file_id: storageFileId, uploaded }) => (
                    <ImagesAttachments
                      key={storageFileId}
                      name={nameOriginal}
                      storageFileId={storageFileId}
                      taskId={taskId}
                      carouselImages={carouselImages}
                      uploaded={uploaded}
                      isVisibleDropdownMenu={isVisibleDropdownMenu}
                      isVisibleCarousel={isVisibleCarousel}
                      canChange={can['add/remove.file']}
                    />
                  ),
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Attachments;
