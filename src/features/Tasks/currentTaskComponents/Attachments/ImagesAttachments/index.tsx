import DropdownMenu from '../DropdownMenu';
import React, { useState } from 'react';
import style from './index.module.scss';
import { setImageUrl, TCarouselImages } from 'shared/helpers';
import CarouselImages from './CarouselImages';
import { Modal } from 'antd';
import { TaskFormSlice } from 'store/slice';
import { useSelector } from 'react-redux';

type ImagesAttachmentsProps = {
  name: string;
  storageFileId: string;
  taskId: string;
  carouselImages?: TCarouselImages[];
  uploaded: boolean;
};

const ImagesAttachments = ({
  name,
  storageFileId,
  taskId,
  carouselImages,
  uploaded,
}: ImagesAttachmentsProps) => {
  const [isShowCarousel, setIsShowCarousel] = useState(false);
  const [nameFile, setNameFile] = useState(name);
  const [currentImage, setCurrentImage] = useState(0);
  const imagePreview = useSelector(TaskFormSlice.imagePreview);
  const imgUploaded = setImageUrl(storageFileId);

  const setImage = () => (uploaded ? imgUploaded : imagePreview);

  const currentImageClicked = (): number => {
    if (carouselImages) {
      const findClickedObj = carouselImages.find((clickedImg) => clickedImg.id === storageFileId);
      if (findClickedObj) return findClickedObj.idCurrent;
    } return currentImage;
  };

  const showCarousel = () => {
    setIsShowCarousel(true);
    setNameFile(name);
    setCurrentImage(currentImageClicked);
  };

  const handleCancel = () => {
    setIsShowCarousel(false);
  };

  return (
    <>
      <div className={style.taskImages__wrapper}>
        <div className={style.taskImages__item} style={{ backgroundImage: `url(${setImage()})` }}>
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
        closable={false}
        centered
        onCancel={handleCancel}
        footer={null}
        visible={isShowCarousel}
        className={style.imagesModal}
      >
        <CarouselImages
          carouselImages={carouselImages}
          name={nameFile}
          setIsShowCarousel={setIsShowCarousel}
          currentImage={currentImage}
          storageFileId={storageFileId}
          taskId={taskId}
        />
      </Modal>
    </>
  );
};

export default ImagesAttachments;
