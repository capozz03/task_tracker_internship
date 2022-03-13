import React from 'react';
import Catch, { IAppErrorBoundary } from './Catch';

import style from './AppErrorBoundary.module.scss';

const AppErrorBoundary = Catch((props: IAppErrorBoundary, error?: Error) => {
  if (error) {
    return (
      <div className={style.appErrorContainer}>
        <div className={style.left}>
          <div>
            <h2>
              <div>
                Возникла
                <br />
                непредвиденная ошибка
              </div>
            </h2>
          </div>
          Если она повторяется после перезагрузки окна браузера, пожалуйста,
          свяжитесь со службой технической поддержки
          <div>
            <button
              type="button"
              onClick={() => {
                window.location.reload();
              }}
              className={style.button}
            >
              Обновить
            </button>
          </div>
        </div>
      </div>
    );
  }
  return props.children;
});

export default AppErrorBoundary;
