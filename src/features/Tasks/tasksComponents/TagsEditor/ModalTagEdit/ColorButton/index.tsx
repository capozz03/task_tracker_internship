import React from 'react';
import SquareColor from 'shared/ui/icons/SquareColor';
import { TTag } from 'store/slice/task/entities';
import { useDispatch } from 'react-redux';
import { TagsSlice } from 'store/slice';
import styles from './index.module.scss';

type ColorButtonProps = {
  tag: TTag;
  color: string;
}

const ColorButton = ({ tag, color }: ColorButtonProps) => {
  const dispatch = useDispatch();
  const changeColorHandle = () => {
    if (tag) {
      dispatch(TagsSlice.setCurrentTag({
        ...tag,
        color,
      }));
    }
  };
  return (
    <button type="button" onClick={changeColorHandle} className={styles.btn}>
      <SquareColor color={color} check={color === tag.color} />
    </button>
  );
};

export default ColorButton;
