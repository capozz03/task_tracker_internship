import React from 'react';
import { Modal, ModalProps } from 'antd';
import styles from './index.module.scss';

const TaskModal = (props: ModalProps) => (
  <Modal {...props} width="75%" footer={null}>
    <div className={styles.wrap}>
      <div className={styles.title}>
        <div className={styles.name}>name</div>
        <div className={styles.menu}>menu</div>
      </div>
      <div className={styles.columnA}>
        <div className={styles.description}>description</div>
        <div className={styles.checklists}>checklists</div>
        <div className={styles.attachments}>attachments</div>
        <div className={styles.actions}>actions</div>
      </div>
      <div className={styles.columnB}>
        <div className={styles.details}>details</div>
        <div className={styles.contributors}>contributors</div>
      </div>
    </div>
  </Modal>
);

export default TaskModal;
