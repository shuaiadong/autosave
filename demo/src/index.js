import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import './index.css';
import App from './App';

import axios from 'axios';

React.Component.prototype.http = axios;

ReactDOM.render(
    <Provider>
        <App />
    </Provider>
    , document.getElementById('root'));