import React, { Component } from "react"
import "intersection-observer"
import { graphql, StaticQuery } from "gatsby"

import NathanNarrative from "./narrative/nathan"
import KaraNarrative from "./narrative/kara"
import GeorgeNarrative from "./narrative/george"
import IntroNarrative from "./narrative/intro"
import EndingNarrative from "./narrative/ending"

import ProgressBar from "./progress-bar/index"

import "./narrative-body.scss"

//set beginning/end overall_step indicies for
//each narrative section
//(a way to avoid magic numbers) -- not used
//right now -- delete if will not be used
const NATHAN_NARRATIVE_SLIDES = [1, 6]

//maybe obtain this dynamcially
const LAST_SLIDE_INDEX = 21

class NarrativeSection extends Component {
  constructor(props) {
    super(props)
    this.nathanRef = React.createRef()
    this.karaRef = React.createRef()
    this.georgeRef = React.createRef()

    this.nathanRef = null
    this.nathanPortraitImgElm = null
    this.nathanMeetTextElm = null
    this.nathanCountElm = null

    this.narrativeRef = React.createRef()

    this.handleAttachNathanRef.bind(this)
  }
  scroller

  state = {
    story_stp: 0,
    story_sect_stp: 0,
    progress: 0,
    slide_elm: null,
    slide_elm_height: null,
    overall_step: 0,
    kara_opacity: 0,
    george_opacity: 0,
  }

  handleAttachNathanRef = nathanRef => {
    this.nathanRef = nathanRef
    this.nathanPortraitImgElm = nathanRef.current.querySelector(
      ".nathan-portrait-img"
    )
    this.nathanCountElm = nathanRef.current.querySelector(".nathan-count")
    this.nathanMeetTextElm = nathanRef.current.querySelector(
      ".nathan-meet-text"
    )
  }

  handleScrollStepEnter = ({ element, index, direction }) => {
    if (element.classList.contains("meet-nathan")) {
      if (direction === "down") {
        element.classList.remove("scroll-start")
      }
    }

    element.classList.add("active")
    this.setState({
      overall_step: index,
    })

    if (index === 0) {
      this.setState({
        kara_opacity: 0,
        george_opacity: 0,
        story_stp: 0,
      })
    } else if (index > 0 && index <= 6) {
      this.setState({
        kara_opacity: 0,
        george_opacity: 0,
        story_stp: 1,
      })
    } else if (index >= 6 && index <= 14) {
      this.setState({
        kara_opacity: 1,
        george_opacity: 0,
        story_stp: 2,
      })
    } else if (index > 13 && index <= 20) {
      this.setState({
        kara_opacity: 0,
        george_opacity: 1,
        story_stp: 3,
      })
    } else if (index > LAST_SLIDE_INDEX - 1) {
      this.setState({
        kara_opacity: 0,
        george_opacity: 0,
        story_stp: 4,
      })
    }
  }
  handleScrollStepExit = ({ element, index, direction }) => {
    if (element.classList.contains("meet-nathan")) {
      if (direction === "up") {
        element.classList.add("scroll-start")
      }
    }

    if (index !== LAST_SLIDE_INDEX || direction === "up") {
      element.classList.remove("active")
    }
  }

  handleProgress = ({ element, progress, index }) => {
    console.log("progress: ", progress, index)

    this.setState({ progress })
    this.setState({ story_sect_stp: index })
    this.setState({ slide_elm: element })
    this.setState({ slide_elm_height: element.scrollHeight })
  }

  componentDidMount() {
    const scrollama = require("scrollama")
    // const scrollThreshold = 1s
    this.scroller = scrollama()

    this.scroller
      .setup({
        container: "#narrative-scroll",
        step: ".narrative-step",
        // threshold: scrollThreshold,
        progress: true,
        // offset: 0.8,
        offset: 1,
        debug: true,
      })
      .onStepEnter(this.handleScrollStepEnter)
      .onStepExit(this.handleScrollStepExit)
      .onStepProgress(this.handleProgress)

    // setup resize event
    window.addEventListener("resize", this.scroller.resize)
  }

  componentWillUnmount() {
    this.scroller.destroy()
  }

  // scrollToRef = character => {
  // console.log(character)
  // window.scrollTo(0, this.karaRef.current.offsetTop)
  // }

  render() {
    const {
      slide_elm_height,
      progress,
      overall_step,
      kara_opacity,
      george_opacity,
      contentPosition,
      story_stp,
    } = this.state

    //distance from offset to end of current slide
    // var content_opacity = 1 - progress

    return (
      <>
        <ProgressBar
          // scrollTo={this.scrollToRef}
          sections={[
            {
              title: "nathan",
              stepCount: 5,
            },
            {
              title: "kara",
              stepCount: 8,
            },
            {
              title: "george",
              stepCount: 6,
            },
          ]}
        />

        <StaticQuery
          query={graphql`
            query {
              intro_bg: file(relativePath: { eq: "images/intro_bg.jpg" }) {
                childImageSharp {
                  fluid(maxWidth: 2000) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              nathan_bg: file(relativePath: { eq: "images/nathan_bg.jpg" }) {
                childImageSharp {
                  fluid(maxWidth: 2000) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              kara_bg: file(relativePath: { eq: "images/kara_bg.jpg" }) {
                childImageSharp {
                  fluid(maxWidth: 2000) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              george_bg: file(relativePath: { eq: "images/george_bg.jpg" }) {
                childImageSharp {
                  fluid(maxWidth: 2000) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          `}
          render={data => {
            return (
              <div id="narrative-page">
                {/* the narrative bg that corresponds
                to the current story_stp will have 
                opacity: 1, all the others will 
                have opacity: 0 */}
                {/* <div
                  className="narrative-background"
                  style={{
                    backgroundImage: `url("${data.intro_bg.childImageSharp.fluid.src}")`,
                    opacity: story_stp === 0 ? 1 : 0,
                  }}
                /> */}
                <div className="gradient-background" />
                <div
                  className="narrative-background"
                  style={{
                    backgroundImage: `url("${data.nathan_bg.childImageSharp.fluid.src}")`,
                    opacity: story_stp <= 1 ? 1 : 0,
                  }}
                />
                <div
                  className="narrative-background"
                  style={{
                    backgroundImage: `url("${data.kara_bg.childImageSharp.fluid.src}")`,
                    opacity: story_stp === 2 ? 1 : 0,
                  }}
                />
                <div
                  className="narrative-background"
                  style={{
                    backgroundImage: `url("${data.george_bg.childImageSharp.fluid.src}")`,
                    opacity: story_stp === 3 ? 1 : 0,
                  }}
                />
                <div
                  className="narrative-background"
                  style={{
                    backgroundImage: `url("${data.intro_bg.childImageSharp.fluid.src}")`,
                    opacity: story_stp === 4 ? 1 : 0,
                  }}
                />

                {/* scrollama is intiated based 
                on content inside here  */}
                <div
                  id="narrative-scroll"
                  // style={{ opacity: content_opacity }}
                  ref={this.narrativeRef}
                >
                  <div>
                    <IntroNarrative
                      backgroundImg={data.intro_bg.childImageSharp.fluid.src}
                    />
                  </div>

                  <div ref={this.nathanRef}>
                    <NathanNarrative
                      progress={progress}
                      overall_step={overall_step}
                      // contentPosition={contentPosition}
                      // story_stp={story_stp}
                      // startAndEnd={NATHAN_NARRATIVE_SLIDES}
                      attachNathanRef={this.handleAttachNathanRef}
                    />
                  </div>

                  <div ref={this.karaRef}>
                    <KaraNarrative
                      progress={progress}
                      step={overall_step}
                      contentPosition={contentPosition}
                    />
                  </div>

                  <div ref={this.georgeRef}>
                    <GeorgeNarrative
                      progress={progress}
                      step={overall_step}
                      contentPosition={contentPosition}
                    />
                  </div>

                  <div>
                    <EndingNarrative />
                  </div>
                </div>
              </div>
            )
          }}
        />
      </>
    )
  }
}

export default NarrativeSection
