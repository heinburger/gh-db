import {observable, action} from 'mobx'
import {getData} from '../api'
import db from '../db'

const dataStore = observable({
  items: [],
  error: null,
  loading: false,
  isOnline: navigator.onLine,
  checkOnline: action(() => {
    dataStore.isOnline = navigator.onLine
  }),
  getData: action(() => {
    dataStore.loading = true
    dataStore.error = null
    getData().then((data) => {
      dataStore.dataSuccess(data)
    }).catch((err) => dataStore.dataFailure(err))
  }),
  dataSuccess: action((data) => {
    dataStore.loading = false
    dataStore.data = data
  }),
  dataFailure: action((err) => {
    dataStore.loading = false
    dataStore.error = err
  })
})

export default dataStore
