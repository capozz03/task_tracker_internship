import { Typography } from 'antd';
import classnames from 'classnames';
import Button from 'features/Tasks/tasksComponents/Button';
import React, { useEffect, useRef, useState } from 'react';
import { IconDescription } from 'shared/ui/icons/TasksIcons';
import DescriptionEditor from './DescriptionEditor';
import style from './index.module.scss';

type descriptionProps = {
  description: string;
  taskId: string;
};

const { Text } = Typography;

const Description = ({ description, taskId }: descriptionProps) => {
  const [isVisibleEditor, setIsVisibleEditor] = useState<boolean>(false);
  const [content, setContent] = useState<string>(description);
  const [stringLength, setStringLength] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const [isExpandDesc, setIsExpandDesc] = useState(true);
  const checkDescriptionIsEmpty = (): string => {
    if (!description) {
      return 'Введите описание, чтобы сделать задачу понятнее';
    }
    return description;
  };

  const descriptionEditor = (): void => {
    setIsVisibleEditor(true);
  };

  const typoClose = () => {
    setIsExpandDesc(true);
  };

  const typoExpand = () => {
    setIsExpandDesc(false);
  };

  const renderParagraph = () => {
    const isHiddenText = isExpandDesc && stringLength > 150;
    return (
      <div>
        <div
          className={classnames([style.desc, isHiddenText && style.expanded])}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: checkDescriptionIsEmpty() }}
          ref={ref}
        />
        {isHiddenText && (
          <Text className={style.expandBtn} onClick={typoExpand} underline>
            Показать целиком
          </Text>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (ref.current) setStringLength(ref.current.innerText.length);
  });

  useEffect(() => {
    setContent(description);
  }, [description]);

  return (
    <div className={style.taskDescription}>
      <div className={style.headerDescription}>
        <div className={style.iconDescription}>
          <IconDescription />
        </div>
        <h5 className={style.description}>Описание</h5>
        <Button className={style.changeButton} onClick={descriptionEditor} type="default">
          Изменить
        </Button>
      </div>
      <div className={style.placeholderDecription}>
        {isVisibleEditor ? (
          <DescriptionEditor
            setIsVisibleEditor={setIsVisibleEditor}
            setContent={setContent}
            content={content}
            taskId={taskId}
          />
        ) : (
          <div className={style.descriptionPreview}>
            <div>
              {renderParagraph()}
              {!isExpandDesc && (
                <Text className={style.expandBtn} onClick={typoClose} underline>
                  Скрыть
                </Text>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Description;
