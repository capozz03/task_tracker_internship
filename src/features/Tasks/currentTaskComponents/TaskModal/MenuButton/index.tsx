import Icon from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import React from 'react';
import PlusIcons from 'shared/ui/icons/PlusIcons';
import style from './index.module.scss';

const MenuButton = () => {
  const { Item } = Menu;

  // const props: any = {
  //   action: '//jsonplaceholder.typicode.com/posts/',
  //   listType: 'picture',
  //   previewFile(file: any) {
  //     console.log('Your upload file:', file);
  //     // Your process logic. Here we just mock to the same file
  //     return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
  //       method: 'POST',
  //       body: file,
  //     })
  //       .then((res) => res.json())
  //       .then(({ thumbnail }) => thumbnail);
  //   },
  // };

  const menu = (
    <Menu className={style.dropdownMenu}>
      <Item key="1">Добавить чек-лист</Item>
      <Item key="2">
        {/* <Upload {...props}> */}
        Прикрепить вложение
        {/* </Upload> */}
      </Item>
    </Menu>
  );

  return (
    <div>
      <Dropdown.Button
        className={style.dropdownButton}
        overlay={menu}
        icon={<Icon className={style.dropdownIcon} component={PlusIcons} />}
        destroyPopupOnHide
        trigger={['click']}
      />
    </div>
  );
};

export default MenuButton;
