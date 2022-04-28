import {
  CloseCircleOutlined,
  CloudDownloadOutlined,
  DeleteOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useBreakPoint } from 'shared/helpers/hooks/useBreakPoint';
import style from './index.module.scss';

export const CarouselImages = ({ backgroundImages, name, setIsShowCarousel }: any) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const mobileCarousel = useBreakPoint(768);

  const closeModal = () => {
    setIsShowCarousel(false);
  };

  const next = () => {
    if (currentImageIndex >= backgroundImages.length - 1) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex((currentImageIndex) => currentImageIndex + 1);
    }
  };

  const prev = () => {
    if (currentImageIndex <= 0) {
      setCurrentImageIndex(backgroundImages.length - 1);
    } else {
      setCurrentImageIndex((currentImageIndex) => currentImageIndex - 1);
    }
  };
  return (
    <>
      <div className={style.headerCarousel}>
        <h4 className={style.headerTitle}>{name}</h4>
        <div className={style.icons}>
          <Button className={style.deleteIcon} onClick={closeModal} icon={<DeleteOutlined />} />
          <Button className={style.downloadIcon} icon={<CloudDownloadOutlined />} />
          <div className={style.separator} />
          <Button className={style.closeIcon} onClick={closeModal} icon={<CloseCircleOutlined />} />
        </div>
      </div>
      <div className={style.carouselWrapper}>
        {!mobileCarousel && (
          <Button className={style.gallery_previous} onClick={prev}>
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
          className={style.carouselGallery}
        >
          {backgroundImages.map((img: string) => (
            <div className={style.contentStyle}>
              <img src={img} alt="img" />
            </div>
          ))}
        </Carousel>
        {!mobileCarousel && (
          <Button className={style.gallery_next} onClick={next}>
            <RightOutlined />
          </Button>
        )}
      </div>
    </>
  );
};
