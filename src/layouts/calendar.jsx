import React, { useState } from 'react'
import "animate.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import styles from './index.less'

const customDrawer = () => {
  const customCalendar = styles.customDrawer
  const w = `${window.innerWidth}px`
  console.log(w)
  const [visible, setVisible] = useState(false)
  return (
    // <ReactCSSTransitionGroup
    //   transitionEnter
    //   transitionLeave
    //   transitionEnterTimeout={2500}
    //   transitionLeaveTimeout={1500}
    //   transitionName="animated"
    // >
    //   <div style={{position:'absolute',zIndex:15, top:'64px'}} >
    //     <div key="amache" className="animated bounce" >
    //       <div className={customCalendar} >
    //         12123333333333333333333333333333333333333333
    //       </div>
    //       <a href="" style={{width:200,height:200,backgroundColor:'red'}} >1241414</a>
    //     </div>
    //   </div>
    // </ReactCSSTransitionGroup>
    <div className={customCalendar} >
      12123333333333333333333333333333333333333333
          </div>

  )
}

export default customDrawer