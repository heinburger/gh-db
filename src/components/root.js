import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {setRSA, removeRSA, hasRSA} from '../api'

class Root extends Component {
  componentDidMount () {
    const {checkOnline} = this.props.dataStore
  }
  render () {
    const {loading, data, getData, error, isOnline} = this.props.dataStore
    return (
      <div>
        {hasRSA()
          ? <span>rsa key saved <button onClick={() => removeRSA()}>remove</button></span>
          : <textarea onChange={(e) => setRSA(e.target.value)} />
        }
        <div><button onClick={() => getData()}>get data</button></div>
        <div>data:
          {loading
            ? <span>loading</span>
            : JSON.stringify(data)
          }
        </div>
        {error
          ? <p>errors... {error}</p>
          : null
        }
      </div>
    )
  }
}

const RootWrapped = inject('dataStore')(observer(Root))
export default RootWrapped
