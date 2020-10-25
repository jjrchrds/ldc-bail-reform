import React, { Component } from "react"
import "intersection-observer"
import Layout from "../components/layout"
import Head from "../components/head"
import { graphql, StaticQuery } from "gatsby"
import { Card, Col, Container, Row } from "react-bootstrap"
import * as D3 from "d3"
// import svgSystemMap from "../../static/assets/system-map/SM_jun25.svg"
import svgSystemMap from "../../static/assets/system-map/SM_oct7_good.svg"
import turnPhoneImg from "../../static/assets/system-map/turnPhone.png"
import BottomButtons from "../components/bottom-buttons"
import StaticModal from "../components/system-map/static-modal"
import CogModal from "../components/system-map/cog-modal"
import ZapModal from "../components/system-map/zap-modal"
import SmLegendSymbol from "../components/system-map/sm-legend-symbol"
import Accordion from "react-bootstrap/Accordion"
import { Link } from "gatsby"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


class SystemMapPage extends Component {
  scroller
  steps
  systemMap
  modalX
  modalY
  modalMargin
  currentImage = ""
  currentStep

  state = {
    showStaticModal: false,
    showCogModal: false,
    showZapModal: false,
    staticModalActiveContent: "",
    cogModalActiveContent: "",
    zapModalActiveContent: "",
    showMobileModal: false,
  }

  setShow = ({ isVisible }) => {
    let show = isVisible
    this.setState({ showCogModal: show })
  }

  // handleClose = () => this.setShow(false)
  // handleShow = () => this.setShow(true)
  handleCloseStatic = () => this.setState({ showStaticModal: false })
  handleCloseCog = () => this.setState({ showCogModal: false })
  handleCloseZap = () => this.setState({ showZapModal: false })
  onHide = () => false

  handleScrollStepEnter = ({ element, index, direction }) => {
    console.log(index)

    this.currentStep = index

    // Handling visibility of "layer" elements based on step number
    // Step 0: initial state, Meet the Characters
    if (index === 0) {
      D3.select("#prompt-1").style("display", "none")
      // D3.select("#sm-legend").style("display", "none")
      D3.select(".sm-layer__title").text("System map - layer 1")
      D3.select(".sm-legend__third-item").style("visibility", "hidden")
    }

    if (index === 1) {
      D3.select("#prompt-1").style("display", "none")
      // D3.select("#sm-legend").style("display", "none")
      D3.select(".sm-legend__third-item").style("visibility", "hidden")
    }

    if (index === 2) {
      D3.select("#cogs").style("display", "none")
      D3.select("#zaps").style("display", "none")
      D3.select("#base").selectAll("image").style("pointer-events", "auto")
      D3.select("#prompt-1")
        .style("display", "block")
        .text(
          "Click on the pictures to get details on each stage. Once you’re done, keep scrolling!"
        )
      D3.select("#sm-legend").style("display", "block")
      D3.select(".sm-layer__title").text("System map - layer 1")
      D3.select(".sm-legend__third-item").style("visibility", "hidden")
    }

    if (index === 3) {
      D3.select("#cogs").style("display", "block")
      D3.select("#zaps").style("display", "none")
      D3.select("#base").selectAll("image").style("pointer-events", "none")
      D3.select("#prompt-1").text(
        "Click on the icons to see what happens at each decision point. Keep scrolling!"
      )
      D3.select(".sm-layer__title").text("Key Decisions")
      D3.select(".sm-legend__third-item").style("visibility", "visible")
      D3.select("#cog-legend").style("display", "block")
      D3.select("#zap-legend").style("display", "none")
    }

    if (index === 4) {
      D3.select("#cogs").style("display", "none")
      D3.select("#zaps").style("display", "block")
      D3.select("#base").selectAll("image").style("pointer-events", "none")
      D3.select("#prompt-1").text(
        "Click on the icons to know more about lorem ipsum dolor."
      )
      D3.select(".sm-layer__title").text("How the system fails")
      D3.select(".sm-legend__third-item").style("visibility", "visible")
      D3.select("#cog-legend").style("display", "none")
      D3.select("#zap-legend").style("display", "block")
    }
  }

  handleScrollStepExit = ({ element, index, direction }) => {
    if (index === 2 && direction === "up") {
      D3.select("#prompt-1").style("display", "none")
      D3.select("#sm-legend").style("display", "none")
    }
  }

  // handleProgress = ({ progress }) => {}

  handleResize = () => {
    // console.log("resize")
    // console.log(window.innerWidth)
    // console.log(this.steps)
    // console.log(this.systemMap)

    this.setState({ showMobileModal: (window.innerWidth < 800 && (window.innerHeight > window.innerWidth)) });

    // let stepH = Math.floor(window.innerHeight * 0.75)
    this.layerSteps.style("height", window.innerHeight * 1.5 + "px")

    D3.select("#sidebar-wrapper")
      .style("height", window.innerHeight * 0.8 + "px")
      .style("top", (window.innerHeight * 0.2) / 2 + "px")

    // Vertically centering the svg when it becomes sticky
    D3.select("#svg-wrapper")
      .style("top", d => `${(window.innerHeight * 0.2) / 2}px`)
      .style("height", `${window.innerHeight * 0.8}px`)

    this.scroller.resize()
  }

  componentDidMount() {

    // Storing the global "this" object to later reference it in D3 event functions
    const self = this
    // console.log(this.state)

    // Storing a selection of the steps element
    this.layerSteps = D3.select("#step-wrapper").selectAll(".step-layer")

    // Creating the scroller
    const scrollama = require("scrollama")
    this.scroller = scrollama()

    // Firing resize function
    this.handleResize()

    // Setting up the Scroller
    const scrollThreshold = 0.9
    this.scroller
      .setup({
        step: ".stepx",
        offset: 0.7,
        threshold: scrollThreshold,
        progress: true,
        debug: false,
      })
      .onStepEnter(this.handleScrollStepEnter)
      .onStepExit(this.handleScrollStepExit)
    // .onStepProgress(this.handleProgress)

    // setup resize event
    window.addEventListener("resize", this.scroller.resize)
    // Probably the way to resize, below
    window.addEventListener("resize", this.handleResize)

    // Loading the Systemp Map svg
    D3.xml(svgSystemMap).then(function (smSvg) {
      const viewBoxWidth = 1400 // svg container width
      const viewBoxHeight = 600 // svg container height. Needs to be the same as height for svg-wrapper specified in SCSS
      const scaleFactor = 1.4

      // Storing a selection of the root node for the imported SVG
      let svgMap = D3.select(smSvg).select("svg").node()

      // Appending the layer title paragraph
      D3.select("#svg-wrapper")
        .append("p")
        .classed("sm-layer__title", "true")
        .text("System map - layer 1")

      // Appending the imported SVG to svg-wrapper
      D3.select("#svg-wrapper").node().appendChild(svgMap)

      D3.select(svgMap)
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 " + viewBoxWidth + " " + viewBoxHeight)
        .selectAll("title")
        .remove()

      // Hiding elements that shouldn't appear right away
      // These will later be shown based on scrollama triggers
      D3.select("#cogs").style("display", "none")
      D3.select("#zaps").style("display", "none")

      // Making triggers for events invisible
      D3.selectAll("#cog-click").style("opacity", 0)
      D3.selectAll("#zap-click").style("opacity", 0)

      D3.select("#base")
        .selectAll("image")
        .on("click", function () {
          console.log(this.id)
          self.modalX = "0px"
          self.modalY = "0px"
          self.setState({ showStaticModal: true })
          self.setState({ showCogModal: false })
          self.setState({ showZapModal: false })
          self.setState({ staticModalActiveContent: this.id })
          self.currentImage = this.id
        })

      // Adding event listeners: layer 1 (cogs)
      D3.select("#cog-click")
        .selectAll("rect")
        // Test to make symbols bigger on hover
        .on("mouseover", function (d, i, n) {
          let bbox = D3.select(`#${this.id}-symbol`).node().getBBox()
          // console.log(bbox)
          // Making cogs bigger - scaling relative to their center
          D3.select(`#${this.id}-symbol`)
            .node()
            .setAttribute(
              "transform",
              `translate(${(1 - scaleFactor) * (bbox.x + bbox.width / 2)}, ${
                (1 - scaleFactor) * (bbox.y + bbox.height / 2)
              }) scale(${scaleFactor})`
            )
        })
        .on("mouseout", function (d, i, n) {
          let bbox = D3.select(`#${this.id}-symbol`).node().getBBox()
          // console.log(bbox)
          // Cogs back to original size - scaling relative to their center
          D3.select(`#${this.id}-symbol`)
            .node()
            .setAttribute(
              "transform",
              `translate(${
                (1 - 1 / scaleFactor) * (bbox.x + bbox.width / 2)
              }, ${
                (1 - 1 / scaleFactor) * (bbox.y + bbox.height / 2)
              }) scale(1/${scaleFactor})`
            )
        })
        .on("click", function (d) {
          console.log(this.id)
          self.modalX = D3.event.clientX + "px"
          self.modalY = D3.event.clientY + "px"
          self.setState({ showStaticModal: false })
          self.setState({ showCogModal: true })
          self.setState({ showZapModal: false })
          self.setState({ cogModalActiveContent: this.id })
        })

      // Adding event listeners: layer 2 (zaps)
      D3.select("#zap-click")
        .selectAll("rect")
        .on("mouseover", function (d, i, n) {
          let bbox = D3.select(`#${this.id}-symbol`).node().getBBox()
          // console.log(bbox)
          // Making zaps bigger - scaling relative to their center
          D3.select(`#${this.id}-symbol`)
            .node()
            .setAttribute(
              "transform",
              `translate(${(1 - scaleFactor) * (bbox.x + bbox.width / 2)}, ${
                (1 - scaleFactor) * (bbox.y + bbox.height / 2)
              }) scale(${scaleFactor})`
            )
        })
        .on("mouseout", function (d, i, n) {
          let bbox = D3.select(`#${this.id}-symbol`).node().getBBox()
          // console.log(bbox)
          // Zaps back to original size - scaling relative to their center
          D3.select(`#${this.id}-symbol`)
            .node()
            .setAttribute(
              "transform",
              `translate(${
                (1 - 1 / scaleFactor) * (bbox.x + bbox.width / 2)
              }, ${
                (1 - 1 / scaleFactor) * (bbox.y + bbox.height / 2)
              }) scale(1/${scaleFactor})`
            )
        })
        .on("click", function () {
          console.log(this)
          // console.log(self)
          self.modalX = D3.event.clientX + "px"
          self.modalY = D3.event.clientY + "px"
          self.setState({ showStaticModal: false })
          self.setState({ showCogModal: false })
          self.setState({ showZapModal: true })
          self.setState({ zapModalActiveContent: this.id })
        })
    })
    // .then(d => {

    //   if (window.innerWidth <= 768) {

    //     console.log(D3.select("#cogs")
    //     .selectAll("g")
    //     .nodes())

    //     let arr = [];
    //     D3.select("#cogs")
    //     .selectAll("g")
    //     .nodes().forEach(d => arr.push(d.getBBox()))

    //     console.log(arr)

    //     D3.select("#cogs")
    //       .selectAll("g")
    //       .nodes().forEach(d=>d.setAttribute("transform", "scale(1)")

    //       // .setAttribute("transform", "scale(1.5)"
    //       // function(d) {
    //       //   // let bbox = d.getBBox();
    //       //   // console.log(bbox)
    //       //   // return `translate(${(1 - 10) * (bbox.x + bbox.width / 2)}, ${
    //       //   //   (1 - 10) * (bbox.y + bbox.height / 2)
    //       //   // }) scale(${10})`
    //       //   // return `translate(${(1 - 10) * (100 + 50 / 2)}, ${
    //       //   //   (1 - 10) * (200 + 50 / 2)
    //       //   // }) scale(${10})`
    //       //   return "scale(1.1)"
    //       // }
    //       )
    //   }
    // })
  }

  componentWillUnmount() {
    this.scroller.destroy()
  }

  render() {
    return (
      <Layout>
        <Head title="System Map" />
        <Container className="my-5 pt-5">
          {/* New Row */}
          <Row>
            <div className="text-center col-md-12">
              <h1 className="display-1 mb-5 text-rust">System Map</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
                commodo at rhoncus, vitae. Consequat, condimentum convallis nisl
                hac. Et a, sed suscipit egestas fringilla. Eu non tristique
                facilisi fringilla facilisi arcu urna sociis nibh. Volutpat
                gravida tincidunt ut venenatis egestas in tellus. Ridiculus
                commodo vel arcu, facilisis velit, mattis fermentum
                pellentesque.
              </p>
            </div>
            <div className="text-dark" id="characters__title">
              <p>Meet the characters</p>
            </div>

            <StaticQuery
              query={graphql`
                query {
                  allContentfulSystemMapCharacters(
                    sort: { fields: [characterName] }
                  ) {
                    edges {
                      node {
                        id
                        characterInitial
                        characterName
                        characterDescription {
                          characterDescription
                        }
                      }
                    }
                  }
                }
              `}
              render={data => (
                <Container id="characters__wrapper" className="stepx">
                  <Row>
                    {data.allContentfulSystemMapCharacters.edges.map(edge => {
                      return (
                        <Col
                          key={edge.node.id}
                          xs={10}
                          sm={10}
                          md={6}
                          lg={4}
                          className="mb-5 card-custom-column"
                        >
                          <Accordion
                            className="accordion-characters"
                            style={{ position: "relative" }}
                          >
                            <Card className="bg-dark text-light card-custom-dark">
                              <Accordion.Toggle
                                as={Card.Header}
                                variant="link"
                                eventKey="0"
                              >
                                <Card.Title className="character-card__title">
                                  {edge.node.characterName}
                                </Card.Title>
                              </Accordion.Toggle>

                              <Accordion.Collapse eventKey="0">
                                <Card.Body
                                  className="character-card__body"
                                  style={{
                                    padding: "0 1.25rem 1.25rem 1.25rem",
                                  }}
                                >
                                  <Card.Text id="character-card__text">
                                    {edge.node.characterDescription
                                      ? edge.node.characterDescription
                                          .characterDescription
                                      : ""}
                                  </Card.Text>
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                            <div id="character-card__id">
                              {edge.node.characterInitial}
                            </div>
                          </Accordion>
                        </Col>
                      )
                    })}
                  </Row>

                  <div id="prompt-0" className="prompt text-center">
                    Lorem ipsum
                  </div>
                  <div id="arrow-down" className="stepx">
                    <svg
                      width="53"
                      height="33"
                      viewBox="0 0 53 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M26.5858 23.7187L0 0V9.28125L26.5858 33L53 9.28125V0L26.5858 23.7187Z"
                        fill="#E5521D"
                      />
                    </svg>
                  </div>
                </Container>
              )}
            />
          </Row>
          {/* Old Row */}
          <Row>
            <Col sm={11} md={9} id="main-col">
              <div id="system-map">
                {/* <div id="sm-layer__title">
                  <p></p>
                </div> */}
                <div id="svg-wrapper"></div>
                <div id="step-wrapper">
                  <div className="stepx step-layer"></div>
                  <div className="stepx step-layer"></div>
                  <div className="stepx step-layer"></div>
                </div>
              </div>
            </Col>
            <Col sm={1} md={3} id="sidebar-col">
              <div id="sidebar-wrapper">
                <p id="prompt-1" className="prompt"></p>
                <div id="sm-legend" className="text-dark">
                  <h4>Legend</h4>
                  <div className="sm-legend__item">
                    <div className="sm-legend__symbol">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 62 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M61.7071 8.70711C62.0976 8.31658 62.0976 7.68342 61.7071 7.29289L55.3431 0.928932C54.9526 0.538408 54.3195 0.538408 53.9289 0.928932C53.5384 1.31946 53.5384 1.95262 53.9289 2.34315L59.5858 8L53.9289 13.6569C53.5384 14.0474 53.5384 14.6805 53.9289 15.0711C54.3195 15.4616 54.9526 15.4616 55.3431 15.0711L61.7071 8.70711ZM0 9H61V7H0V9Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                    <p>Lorem ipsum dolor</p>
                  </div>
                  <div className="sm-legend__item sm-legend__third-item">
                    <div className="sm-legend__symbol">
                      <SmLegendSymbol></SmLegendSymbol>
                    </div>
                    <p>Lorem ipsum dolor</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <BottomButtons
          btn1={"Themes"}
          btn1Url={"/issue1"}
          btn2={"Timeline"}
          btn2Url={"/methodology"}
          ctaColor={"text-dark"}
          />
        </Container>


        <Modal show={this.state.showMobileModal} 
        onHide={this.onHide}
        className="turn-device-modal">
          <Modal.Header>
            <Modal.Title>View in landscape mode only</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>This page isn't optimized for portrait mobile view.</p>
            <p>Please turn your device to access landscape mode.</p>
          <img src={turnPhoneImg} style={{}}></img>

          </Modal.Body>

        </Modal>

        <StaticModal
          show={this.state.showStaticModal}
          onHide={this.handleCloseStatic}
          activeContent={this.state.staticModalActiveContent}
        />

        <CogModal
          show={this.state.showCogModal}
          onHide={this.handleCloseCog}
          activeContent={this.state.cogModalActiveContent}
        />

        <ZapModal
          show={this.state.showZapModal}
          onHide={this.handleCloseZap}
          activeContent={this.state.zapModalActiveContent}
        />
      </Layout>
    )
  }
}

export default SystemMapPage
