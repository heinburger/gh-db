import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'mobx-react'

import Root from './components/root'
import dataStore from './stores/data'
require('./styles/root.scss')
require('offline-plugin/runtime').install()

render(
  (<Provider dataStore={dataStore}>
    <Root />
  </Provider>),
  document.getElementById('root')
)
