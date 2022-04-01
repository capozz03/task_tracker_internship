import React from 'react';
import { AppRouter } from './routing/AppRouter';
import 'shared/assets/styles/index.scss';
import moment from 'moment';
import 'moment/locale/ru';

moment().locale('ru');

const App = () => <AppRouter />;

export default App;
