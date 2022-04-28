import DropdownMenu from '../DropdownMenu';
import React, { useState } from 'react';
import style from './index.module.scss';
import { TStorageFiles } from 'store/slice/task/entities';
import { setImageUrl } from './setImageUrl';
import { CarouselImages } from './CarouselImages';
import { Modal } from 'antd';

type ImagesAttachmentsProps = {
  name: string;
  storageFileId: string;
  taskId: string;
  modifications: TStorageFiles[];
  backgroundImages: string[] | undefined;
};

const ImagesAttachments = ({
  name,
  storageFileId,
  taskId,
  modifications,
  backgroundImages,
}: ImagesAttachmentsProps) => {
  const [isShowCarousel, setIsShowCarousel] = useState(false);

  const showCarousel = (): void => {
    setIsShowCarousel(true);
  };

  const handleCancel = (): void => {
    setIsShowCarousel(false);
  };

  const imagePreview = setImageUrl(modifications);

  return (
    <>
      <div className={style.taskImages__wrapper}>
        <div className={style.taskImages__item} style={{ backgroundImage: `url(${imagePreview})` }}>
          <div
            className={style.dropdown}
            onClick={showCarousel}
            role="button"
            tabIndex={0}
            onKeyDown={showCarousel}
          >
            <div className={style.menu}>
              <div
                onKeyDown={(e) => e.preventDefault()}
                role="button"
                tabIndex={-1}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <DropdownMenu taskId={taskId} storageFileId={storageFileId} name={name} />
              </div>
            </div>
          </div>
        </div>
        <div className={style.taskFiles__content}>
          <div className={style.taskFiles__name}>{name}</div>
        </div>
      </div>
      <Modal
        centered
        closable={false}
        onCancel={handleCancel}
        width="50%"
        footer={null}
        visible={isShowCarousel}
        className={style.imagesModal}
      >
        <CarouselImages
          backgroundImages={backgroundImages}
          name={name}
          setIsShowCarousel={setIsShowCarousel}
        />
      </Modal>
    </>
  );
};

export default ImagesAttachments;
