import React from 'react'
import Map from './Map'

import { Provider } from 'react-redux'
import store from '../store/store'


import '../css/index.scss'

const App = () => {

   return (
      <Provider store={store}>
         <div className="App">
            <Map />
         </div>
      </Provider>
   )

}

export default App