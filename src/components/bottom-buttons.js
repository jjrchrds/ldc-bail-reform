import React from "react"
import { Link } from "gatsby"
import "./bottom-buttons.scss"

const BottomButtons = props => {
  // let classes = classNames({
  //   'bottom-buttons-btns': true,
  //   'light-background': props.color === "light-background",
  //   'dark-background': props.color === "dark-background"

  // });

  return (
    <div className="bottom-buttons-wrapper">
      <h2 className={`bottom-buttons-cta ${props.ctaColor}`}>keep exploring!</h2>
      <div className="bottom-buttons-btns">
        <Link to={props.btn1Url}>{props.btn1}</Link>
        <Link to={props.btn2Url}>{props.btn2}</Link>
      </div>
    </div>
  )
}

export default BottomButtons
