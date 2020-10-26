import React, { Component } from "react"
import { Row, Col, Container } from "react-bootstrap"
import { useStaticQuery, graphql, StaticQuery } from "gatsby"
import "./issues-expl.scss"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import * as D3 from "d3"
// import svgExplImport from "../../static/assets/system-map/EE_1.svg"
import svgExplImport from "../../static/assets/system-map/EE_1b.svg"
import TurnDeviceModal from "./turn-device-modal"
import ExplSidebar from "./issues-expl-sidebar"



class ExplFirst extends Component {
  scroller
  layerSteps
  layer0
  layer1
  layer2
  s0Bbox1
  s0Bbox2
  s0Bbox3
  s1Bbox1
  s1Bbox2
  s2Bbox1
  s2Bbox2

  state = {
    issue_id: 1,
    step_index: 0,
    showMobileModal: false,
    viewportWidth: 0,
  }

  // List of ids for arrows to animate
  nodeList = [
    "arrow-path-1",
    "arrow-path-2",
    "arrow-path-3",
    "arrow-path-4",
    "arrow-path-5",
    "arrow-path-6",
    "arrow-path-7",
  ]


  handleScrollStepEnter = ({ element, index, direction }) => {
    // Updating current step index
    this.setState({
      step_index: index,
    })

    // Animating main steps ("layers")
    if (
      this.state.step_index === 1 ||
      this.state.step_index === 2 ||
      this.state.step_index === 3
    ) {
      this.layer0.style("display", "block")
      this.layer1.style("display", "none")
      this.layer2.style("display", "none")

      // Hiding text for other layers
      D3.selectAll(".text-layer-2").style("display", "none")
      D3.selectAll(".text-layer-3").style("display", "none")

      // When scroll direction = up, display all text for this layer
      if (direction === "up") {
        D3.selectAll(".text-layer-1").style("display", "block")
      }
    } else if (this.state.step_index === 4 || this.state.step_index === 5) {
      this.layer0.style("display", "none")
      this.layer1.style("display", "block")
      this.layer2.style("display", "none")

      // Hiding text for other layers
      D3.selectAll(".text-layer-1").style("display", "none")
      D3.selectAll(".text-layer-3").style("display", "none")

      // When scroll direction = up, display all text for this layer
      if (direction === "up") {
        D3.selectAll(".text-layer-2").style("display", "block")
      }
    } else if (this.state.step_index === 6 || this.state.step_index === 7) {
      this.layer0.style("display", "none")
      this.layer1.style("display", "none")
      this.layer2.style("display", "block")

      // Hiding text for other layers
      D3.selectAll(".text-layer-1").style("display", "none")
      D3.selectAll(".text-layer-2").style("display", "none")

      // When scroll direction = up, display all text for this layer
      if (direction === "up") {
        D3.selectAll(".text-layer-3").style("display", "block")
      }
    }

    // Animating arrows
    if (this.state.step_index === 0) {
      // Resetting arrow clip paths to original position
      // -> when back at step 0, arrows are hidden
      // so they can be animated again later

      for (let i = 1; i < this.nodeList.length + 1; i++) {
        if (i <= 3) {
          // For vertical animation
          D3.select(`#rect-arrow-path-${i}`)
            .attr("x", this[`bbox${i}`].x)
            .attr("y", this[`bbox${i}`].y + this[`bbox${i}`].height)
        } else {
          // For horizontal animation
          D3.select(`#rect-arrow-path-${i}`)
            .attr("x", this[`bbox${i}`].x + this[`bbox${i}`].width)
            .attr("y", this[`bbox${i}`].y)
        }
      }

      // Reset main arrow groups as display: none
      D3.select("#arrow-1").style("display", "none")
      D3.select("#arrow-2").style("display", "none")
      D3.select("#arrow-3").style("display", "none")

      // Reset explanation texts as display: none
      D3.selectAll(".explanation-text").style("display", "none")
    } else {
      //debug
      console.log(D3.select(`#arrow-path-${this.state.step_index}`).node())
      console.log(this[`bbox${this.state.step_index}`])

      // If this.state.step_index > 0
      // Show arrow group
      D3.select(`#arrow-${this.state.step_index}`).style("display", "block")

      // Show explanation text
      D3.select(`#ee-text-${this.state.step_index}`).style("display", "block")

      // Animating arrows by moving corresponding clip-path
      // Differentiating between vertical/horizontal animations
      if (this.state.step_index <= 3) {
        D3.select(`#rect-arrow-path-${this.state.step_index}`)
          .transition()
          .duration(1000)
          .attr("y", this[`bbox${this.state.step_index}`].y)
      } else {
        D3.select(`#rect-arrow-path-${this.state.step_index}`)
          .transition()
          .duration(1000)
          .attr("x", this[`bbox${this.state.step_index}`].x)
      }
    }
  }

  handleScrollStepExit = ({ element, index, direction }) => {}

  handleProgress = ({ progress }) => {}

  handleResize = () => {
    this.setState({
      showMobileModal:
        window.innerWidth < 650 && window.innerHeight > window.innerWidth,
        viewportWidth: window.innerWidth,
    })

    this.layerSteps.style("height", window.innerHeight * 0.75 + "px")

    D3.select("#expl-sidebar-wrapper")
      .style("height", window.innerHeight * 0.8 + "px")
      .style("top", (window.innerHeight * 0.2) / 2 + "px")

    // Vertically centering the svg when it becomes sticky
    D3.select("#expl-svg-wrapper").style(
      "top",
      d => `${(window.innerHeight * 0.2) / 2}px`
    )

    this.scroller.resize()
  }

  onHide = () => false

  componentDidMount() {
    const self = this

    window.addEventListener("resize", this.handleResize)

    // Storing a selection of the layer steps element
    this.layerSteps = D3.select("#expl-step-wrapper").selectAll(
      ".expl-step-layer"
    )

    D3.xml(svgExplImport)
      .then(function (explSvg) {
        const viewBoxWidth = 1500 // svg container width
        const viewBoxHeight = 1200 // svg container height. Needs to be the same as height for svg-wrapper specified in SCSS

        // Storing a selection of the root node for the imported SVG
        let explMap = D3.select(explSvg).select("svg").node()

        // Appending the imported SVG to svg-wrapper
        D3.select("#svg").node().appendChild(explMap)

        D3.select(explMap)
          .attr("width", "100%")
          .attr("height", "100%")
          .attr("viewBox", "0 0 " + viewBoxWidth + " " + viewBoxHeight)
          .selectAll("title")
          .remove()

        ///////// BOUNDING BOXES /////////

        // Looping through nodeList to calculate bounding boxes
        // Order of operations is important, this must happen before
        // setting the layers to display: none
        self.nodeList.forEach((d, i) => {
          self[`bbox${i + 1}`] = D3.select("#" + d)
            .node()
            .getBBox()
        })

        ///////// LAYERS /////////

        // Creating variables for layers
        self.layer0 = D3.select("#layer-1")
        self.layer1 = D3.select("#layer-2")
        self.layer2 = D3.select("#layer-3")

        // Initially hide layers - will later be shown based on scrollama triggers
        self.layer0.style("display", "none")
        self.layer1.style("display", "none")
        self.layer2.style("display", "none")

        ///////// SCROLLAMA /////////

        // Creating the scroller
        // Inside D3.svg response, otherwise would throw error
        const scrollama = require("scrollama")
        self.scroller = scrollama()

        // Firing resize function
        self.handleResize()

        // Setting up the Scroller
        const scrollThreshold = 0.9
        self.scroller
          .setup({
            step: ".expl-step",
            offset: 0.7,
            threshold: scrollThreshold,
            progress: true,
            debug: false,
          })
          .onStepEnter(self.handleScrollStepEnter)
          .onStepExit(self.handleScrollStepExit)
          .onStepProgress(self.handleProgress)

        // setup resize event
        window.addEventListener("resize", self.scroller.resize())
      })
      .then(d => {
        ///////// CLIP PATHS /////////

        // Setting up clip paths to animate arrows
        // In a separate promise response, otherwise would throw error

        // Selecting the SVG
        let mainSvg = D3.select("#expl-svg-wrapper").select("svg")

        // Looping through nodeList to append clippaths
        this.nodeList.forEach((d, i) => {
          let clipPath = mainSvg
            .append("clipPath")
            .attr("id", `clip-${d}`)
            .append("rect")
            .attr("id", `rect-${d}`)
            .attr("width", self[`bbox${i + 1}`].width)
            .attr("height", self[`bbox${i + 1}`].height)

          // Animating arrows. First 3 arrows animate bottom to top
          // Other 4 arrows animate right to left
          if (i < 3) {
            clipPath
              .attr("x", self[`bbox${i + 1}`].x)
              .attr("y", self[`bbox${i + 1}`].y + self[`bbox${i + 1}`].height)
          } else if (i >= 3) {
            clipPath
              .attr("x", self[`bbox${i + 1}`].x + self[`bbox${i + 1}`].width)
              .attr("y", self[`bbox${i + 1}`].y)
          }

          D3.select(`#${d}`)
            .attr("clip-path", `url(#clip-${d})`)
            .style("-webkit-clip-path", `url(#clip-${d})`)
        })
      })
  }

  componentWillUnmount() {
    this.scroller.destroy()
  }

  render() {
    return (
      <Container>
        <Row id="explanation-1__row">
          <Col sm={11} md={9} id="main-col">
            <div id="explanation-map" className="expl-step">
              <div id="expl-svg-wrapper">
                <div id="svg"></div>
                <div id="expl-sidebar-col-mobile" className="text-dark">
                <ExplSidebar
                issue_id={this.state.issue_id}
                />
                </div>
              </div>

              <div id="expl-step-wrapper">
                <div className="expl-step expl-step-layer"></div>
                <div className="expl-step expl-step-layer"></div>
                <div className="expl-step expl-step-layer"></div>
                <div className="expl-step expl-step-layer"></div>
                <div className="expl-step expl-step-layer"></div>
                <div className="expl-step expl-step-layer"></div>
                <div className="expl-step expl-step-layer"></div>
              </div>
            </div>
          </Col>
          
          <Col sm={1} md={3} id="expl-sidebar-col">
            <div id="expl-sidebar-wrapper" className="text-dark">
            <ExplSidebar
                issue_id={this.state.issue_id}
                />
            </div>
          </Col>
        </Row>
        {/* <TurnDeviceModal
        show={this.state.showMobileModal} 
        onHide={this.onHide}
        /> */}
      </Container>
    )
  }
}

export default ExplFirst
