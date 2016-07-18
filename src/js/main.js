import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)
import _ from 'lodash';

console.log(_);

import app from "../css/app.css";
console.log(app);
render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)