import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ModalDelete } from 'shared';
import { useBreakPoint } from 'shared/helpers/hooks/useBreakPoint';
import { TCarouselImages } from 'shared/helpers';
import HeaderCarouselImages from './HeaderCarouselImages';
import style from './index.module.scss';

type CarouselImagesProps = {
  carouselImages: TCarouselImages[] | undefined;
  setIsShowCarousel: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  currentImage: number;
  storageFileId: string;
  taskId: string;
};

const CarouselImages = ({
  carouselImages,
  setIsShowCarousel,
  name,
  currentImage,
  storageFileId,
  taskId,
}: CarouselImagesProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(currentImage);
  const [fileProperties, setFileProperties] = useState({
    file_id: storageFileId,
    file_name: name,
  });
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);

  const mobileCarousel = useBreakPoint(768);

  const closeModal = () => {
    setIsShowCarousel(false);
  };

  const changeHandler = (index: any) => {
    if (carouselImages) {
      setFileProperties({
        file_id: carouselImages[index].id,
        file_name: carouselImages[index].name,
      });
    }
  };

  const nextImgButton = () => {
    if (carouselImages) {
      if (currentImageIndex >= carouselImages.length - 1) {
        setCurrentImageIndex(0);
      } else {
        setCurrentImageIndex((currentImageIndex: number) => currentImageIndex + 1);
      }
    }
  };

  const prevImgButton = () => {
    if (carouselImages) {
      if (currentImageIndex <= 0) {
        setCurrentImageIndex(carouselImages.length - 1);
      } else {
        setCurrentImageIndex((currentImageIndex: number) => currentImageIndex - 1);
      }
    }
  };

  return (
    <>
      <HeaderCarouselImages
        nameFile={fileProperties.file_name}
        storageFileId={fileProperties.file_id}
        closeModal={closeModal}
        setIsVisibleModal={setIsVisibleModal}
        setIsShowCarousel={setIsShowCarousel}
      />
      <div className={style.carouselWrapper}>
        {!mobileCarousel && (
          <Button className={style.gallery_previous} onClick={prevImgButton}>
            <LeftOutlined />
          </Button>
        )}
        <Carousel
          selectedItem={currentImageIndex}
          showStatus={false}
          showIndicators={false}
          showArrows={false}
          useKeyboardArrows
          dynamicHeight
          swipeable
          infiniteLoop
          onChange={changeHandler}
          className={style.carouselGallery}
        >
          {carouselImages?.map(({ img }) => (
            <div className={style.contentStyle} key={currentImageIndex}>
              <img src={img} alt="img" />
            </div>
          ))}
        </Carousel>
        {!mobileCarousel && (
          <Button className={style.gallery_next} onClick={nextImgButton}>
            <RightOutlined />
          </Button>
        )}
      </div>
      <ModalDelete
        isVisibleModal={isVisibleModal}
        setIsVisibleModal={setIsVisibleModal}
        taskId={taskId}
        storageFileId={fileProperties.file_id}
        name={fileProperties.file_name}
      />
    </>
  );
};

export default CarouselImages;
