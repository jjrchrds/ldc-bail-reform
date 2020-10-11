import React, { Component } from "react"
import "intersection-observer"

class IntroNarrative extends Component {
  render() {
    return (
      <div id="narrative-intro" className="narrative-step">
        <div className="fixed-content">
          <h1 className="main-heading">LOREM IPSUM DOLOR SIT AMET</h1>
          <p className="kicker">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
            commodo at rhoncus, vitae. Consequat, condimentum convallis nisl
            hac. Et a, sed suscipit egestas fringilla. Eu non tristique facilisi
            fringilla facilisi arcu urna sociis nibh.
          </p>
          <div className="scroll-down-instructions">
            <span className="action-text">Start scrolling</span>
            <svg
              width="53"
              height="33"
              viewBox="0 0 53 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="scroll-down-icon"
            >
              <path
                d="M26.5858 23.7187L0 0V9.28125L26.5858 33L53 9.28125V0L26.5858 23.7187Z"
                fill="#E5521D"
              />
            </svg>
          </div>
        </div>
      </div>
    )
  }
}

export default IntroNarrative
