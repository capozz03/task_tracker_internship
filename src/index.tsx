import React from 'react';
import ReactDOM from 'react-dom';
import AppErrorBoundary from 'app/errorBoundary';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';

ReactDOM.render(
  <React.StrictMode>
    <AppErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <ConfigProvider
            locale={ruRU}
          >
            <App />
          </ConfigProvider>
        </BrowserRouter>
      </Provider>
      <ToastContainer />
    </AppErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
