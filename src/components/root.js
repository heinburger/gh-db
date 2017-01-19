import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'

class Root extends Component {
  componentDidMount () {
    // something
  }
  render () {
    const {loading, data, getData, setRSA, rsa, error} = this.props.dataStore
    return (
      <div>
        {loading
          ? <span>loading</span>
          : null
        }
        {rsa
          ? <span>rsa key saved <button onClick={() => localStorage.removeItem('rsa')}>remove</button></span>
          : <textarea onChange={(e) => setRSA(e.target.value)} />
        }
        <button onClick={() => getData()}>get data</button>
        <p>data: {JSON.stringify(data)}</p>
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
