import { Modal } from 'antd';
import React from 'react';
import DescriptionTask from '../DescriptionTask';

const ModalTask = ({ isModalVisible, setIsModalVisible, taskId }: any) => {
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
      <DescriptionTask taskId={taskId} />
    </Modal>
  );
};

export default ModalTask;
