import React from 'react'
import { useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import LoadingGif from '../../assets/loading.gif'

import '../../css/Loading.scss'

const Loading = () => {

   const loading = useSelector(state => state.nav.loading)

   if (loading){
      return (
         <CSSTransition
            in={loading}
            classNames="loading-transition">
            <div className="Loading">
               <img src={LoadingGif} />
            </div>
         </CSSTransition>
      )
   } else {
      return null
   }


}

export default Loading