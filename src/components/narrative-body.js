import React, { Component } from "react"
import "intersection-observer"
import { graphql, StaticQuery } from "gatsby"
// import Img from "gatsby-image"

import NathanNarrative from "./narrative/nathan"
import KaraNarrative from "./narrative/kara"
import GeorgeNarrative from "./narrative/george"
import IntroNarrative from "./narrative/intro"
import EndingNarrative from "./narrative/ending"

import ProgressBar from "./progress-bar/index"

import "./narrative-body.scss"

//distance (in pixels) from scrollama offset
//where slide should start its closing
//transition
const SLIDE_TRANSITION_HEIGHT = "30"

//set beginning/end overall_step indicies for
//each narrative section
//(a way to avoid magic numbers)
const NATHAN_NARRATIVE_SLIDES = [1, 6]
const KARA_NARRATIVE_INDICIES = []
const GEORGE_NARRATIVE_INDICIES = []

const LAST_SLIDE_INDEX = 21

class NarrativeSection extends Component {
  constructor(props) {
    super(props)
    // this.nathanRef = React.createRef()
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
    // console.log(ref.current)

    this.nathanPortraitImgElm = nathanRef.current.querySelector(
      ".nathan-portrait-img"
    )
    this.nathanCountElm = nathanRef.current.querySelector(".nathan-count")
    this.nathanMeetTextElm = nathanRef.current.querySelector(
      ".nathan-meet-text"
    )

    // console.log(this.nathanPortraitImgElm.className)
  }

  handleScrollStepEnter = ({ element, index, direction }) => {
    element.classList.add("active")

    // element.style.backgroundColor = 'lightgoldenrodyellow';
    this.setState({
      overall_step: index,
    })

    if (index === 0) {
      // console.log("less eq than 1")
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
    if (index !== LAST_SLIDE_INDEX || 
      direction === 'up') {
      element.classList.remove("active")
    }
    // this.setState({
    //   contentPosition: {
    //     position: "relative",
    //     top: 0
    //   }
    // })
  }

  handleProgress = ({ element, progress, index }) => {
    console.log("progress: ", progress, index)

    this.setState({ progress })
    this.setState({ story_sect_stp: index })
    this.setState({ slide_elm: element })
    this.setState({ slide_elm_height: element.scrollHeight })

    /////////////////////////////////
    //nathan narrative

    //meet nathan elememnts
    // this.nathanPortraitImgElm.style.top =
    //   `${60 - (60 * progress)}%`;

    // this.nathanPortraitImgElm.style.opacity =
    //   progress
    // this.nathanMeetTextElm.style.top =
    //   `-${100 * progress}%`;

    //to show progrfess coutn speed
    // this.nathanCountElm.innerHTML = progress;

    // console.log(this.nathanRef) //dbg

    // try {
    //   console.log(this.nathanPortraitImgElm.className);
    // } catch (e) {
    //   console.error(e.message);
    //   //do nothing
    // }

    //distance from offset to end of current slide
    //  var distanceToEnd = slide_elm_height * (1 - progress)
    //  var content_opacity = 1 - progress
    //  this.narrativeRef.style.opacity = 1 - progress;
  }

  componentDidMount() {
    const scrollama = require("scrollama")
    const scrollThreshold = 1
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

  scrollToRef = character => {
    // console.log(character)
    // window.scrollTo(0, this.karaRef.current.offsetTop)
  }

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

    var content_opacity
    // content_opacity =
    //   progress < 0.3
    //     ? (1 / 0.23) * progress - 0.3
    //     : progress > 0.7
    //     ? -(1 / 0.3) * progress + 3
    //     : 1

    //distance from offset to end of current slide
    var distanceToEnd = slide_elm_height * (1 - progress)
    content_opacity = 1 - progress

    // content_opacity =
    //   distanceToEnd < 700 && distanceToEnd >= 200 ?
    //   0.5 : distanceToEnd < 200 ? 0 : 1;

    // console.log('opaciotycalc', slide_elm_height * (1 - progress), window.innerHeight );

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
        <div className="gradient-background"></div>

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
            // switch (story_stp) {
            //   case 0:
            //     var narrativeBGSrc = data.intro_bg.childImageSharp.fluid.src
            //     break
            //   case 1:
            //     var narrativeBGSrc = data.nathan_bg.childImageSharp.fluid.src
            //     break
            //   case 2:
            //     var narrativeBGSrc = data.kara_bg.childImageSharp.fluid.src
            //     break
            //   case 3:
            //     var narrativeBGSrc = data.george_bg.childImageSharp.fluid.src
            //     break
            //   default:
            //     var narrativeBGSrc = ""
            // }

            return (
              <>
                {/* the narrative bg that corresponds
                to the current story_stp will have 
                opacity: 1, all the others will 
                have opacity: 0 */}
                <div
                  className="narrative-background"
                  style={{
                    backgroundImage: `url("${data.intro_bg.childImageSharp.fluid.src}")`,
                    opacity: story_stp === 0 ? 1 : 0,
                  }}
                />
                <div
                  className="narrative-background"
                  style={{
                    backgroundImage: `url("${data.nathan_bg.childImageSharp.fluid.src}")`,
                    opacity: story_stp === 1 ? 1 : 0,
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
                    <IntroNarrative />
                  </div>

                  {/* NATHAN */}
                  <div ref={this.nathanRef}>
                    <NathanNarrative
                      // progress={progress}
                      // step={overall_step}
                      // contentPosition={contentPosition}
                      // story_stp={story_stp}
                      startAndEnd={NATHAN_NARRATIVE_SLIDES}
                      attachNathanRef={this.handleAttachNathanRef}
                    />
                  </div>
                  {/* KARA */}
                  <div ref={this.karaRef}>
                    <KaraNarrative
                      progress={progress}
                      step={overall_step}
                      contentPosition={contentPosition}
                    />
                  </div>

                  {/* GEORGE */}
                  <div ref={this.georgeRef}>
                    <GeorgeNarrative
                      progress={progress}
                      step={overall_step}
                      contentPosition={contentPosition}
                    />
                  </div>

                  {/* EndingNarrative */}
                  <div>
                    <EndingNarrative />
                  </div>
                </div>
              </>
            )
          }}
        />
      </>
    )
  }
}

export default NarrativeSection
