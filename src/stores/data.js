import {observable, action} from 'mobx'
import {getData} from '../api'

const dataStore = observable({
  data: {},
  error: null,
  loading: false,
  rsa: localStorage.getItem('rsa') || null,
  setRSA: action((rsa) => {
    localStorage.setItem('rsa', rsa)
    dataStore.rsa = rsa
  }),
  getData: action(() => {
    dataStore.loading = true
    dataStore.error = null
    getData(dataStore.rsa).then((data) => {
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
