import React from 'react';
import { TTaskCheckListItem } from 'store/slice/task/entities';

type CheckItemProps = {
  item: TTaskCheckListItem
}

const CheckItem = ({ item }: CheckItemProps) => (
  <li>{ item.message }</li>
);

export default CheckItem;
