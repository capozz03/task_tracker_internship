import React from 'react';
import ReactDOM from 'react-dom';
import AppErrorBoundary from 'app/errorBoundary';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from 'store';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import { ConfigProvider } from 'antd';
import { PersistGate } from 'redux-persist/integration/react';
import ruRU from 'antd/lib/locale/ru_RU';

ReactDOM.render(
  <React.StrictMode>
    <AppErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <ConfigProvider
              locale={ruRU}
            >
              <App />
            </ConfigProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
      <ToastContainer />
    </AppErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
