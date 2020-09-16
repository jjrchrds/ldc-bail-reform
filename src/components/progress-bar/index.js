import React, { Component } from "react"
// import {HashLink as Link} from 'react-router-hash-link'
import { Link, navigate } from "gatsby"
import "./progress-bar.scss"

export default class ProgressBar extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    progress: 0,
  }

  componentDidMount() {
    window.onscroll = () => {
      var winScroll =
        document.body.scrollTop || document.documentElement.scrollTop
      var height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      var scrolled = (winScroll / height) * 100
      this.setState({
        progress: scrolled,
      })
    }
  }

  handleScrollJump = e => {
    const character = e.target.value
    if (character === "george") {
      navigate("#narrative-george")
    } else if (character === "nathan") {
      navigate("#narrative-nathan")
    } else if (character === "kara"){
      navigate("#narrative-kara")
    } else {
      navigate("#")
    }
  }

  render() {
    const { progress } = this.state // in percentage whole numbers
    const { sections } = this.props
    const bar_height = 30 //rem

    var totalSections = 0

    sections.forEach(section => {
      totalSections += section.stepCount
    })

    var section_percentage_accumulate = 0

    sections.forEach(section => {
      const percentage = section.stepCount / totalSections
      section_percentage_accumulate += percentage
      section.section_percentage = section_percentage_accumulate
    })

    return (
      <div className="progress-bar">
        <div
          className="progress-dot"
          style={{ top: `${(progress / 100) * bar_height}rem` }}
        ></div>
        {/* <button
          className="progress-step"
          id="starter-progress-step"
          value="home"
          onClick={this.handleScrollJump}
        /> */}
        <button
          className="progress-step"
          value="nathan"
          onClick={this.handleScrollJump}
          style={{ top: "0.5rem" }}
        />
        <div class="narrative-bar" id="nathan-bar" />
        <button
          className="progress-step"
          value="kara"
          onClick={this.handleScrollJump}
          style={{ top: "9.3rem" }}
        />
        <div class="narrative-bar" id="kara-bar" />
        <button
          className="progress-step"
          value="george"
          onClick={this.handleScrollJump}
          style={{ top: "21.4rem" }}
        />
        <div class="narrative-bar" id="george-bar" />
        <div
          className="progress-step"
          value="george"
          
          style={{ top: "30rem" }}
        />

        {/* <a className="progress-step"  href="#narrative-kara" />
        <a className="progress-step"  href="#narrative-george" /> */}
        {/* <div className="sections">
          {sections.map((section, idx) => {
            return (
              <a
                href={`#narrative-${section.title}`}
                className="progress-step section-progress-step"
                style={{
                  top: `${section.section_percentage * bar_height + 1.1}rem`,
                }}
                onClick={this.handleScrollJump}
              ></a>
            )
          })}
        </div>
        <div className="progress-step" id="end-progress-step"></div> */}
      </div>
    )
  }
}
