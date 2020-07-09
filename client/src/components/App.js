import React from 'react'
import { useSelector } from 'react-redux'


import Map from './Map'
import Menu from './Menu'
import SnackBar from './SnackBar/SnackBar'
import ActiveFilter from './ActiveFilter'
import NoStationWarning from './NoStationWarning'


import '../css/index.scss'

const App = () => {

   const snackbar = useSelector(state => state.nav.snackbar)

   return (
      <div className="App">
         <Map />
         <Menu />
         {snackbar && <SnackBar />}
         <ActiveFilter />
         <NoStationWarning />
      </div>
   )

}

export default App