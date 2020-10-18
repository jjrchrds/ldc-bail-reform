import React, { Component } from "react"
import "intersection-observer"
import clsx from "clsx"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { StaticQuery, graphql } from "gatsby"
import { BLOCKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const RichTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
  },
}

class NathanNarrative extends Component {
  //no need for explicit constructor anymore
  //https://hackernoon.com/the-constructor-is-dead-long-live-the-constructor-c10871bea599
  constructor(props) {
    super(props)
    this.nathanRef = React.createRef()
    this.nathanMeetTextRef = React.createRef()
    this.nathanPortraitRef = React.createRef()
    this.nathanMeetTextElm = null
    this.policeCarImgRef = React.createRef()
  }

  state = {
    nathanModal2: false,
    nathanModal1: false,
  }

  componentDidMount() {
    this.props.attachNathanRef(this.nathanRef)

    this.meetNathanSlideHeight = this.nathanRef.current.querySelector(
      ".meet-nathan"
    ).offsetHeight

    try {
      this.nathanMeetTextElm = this.nathanMeetTextRef.current
    } catch (e) {
      console.error(e.message)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleNathanModal1Show = () => {
    this.setState({
      nathanModal1: true,
    })
  }

  handleNathanModal2Show = () => {
    this.setState({
      nathanModal2: true,
    })
  }

  handleModalClose = () => {
    this.setState({
      nathanModal2: false,
      nathanModal1: false,
    })
  }

  querySlideContent = (query, slideNumber, queryType) => {
    switch (queryType) {
      case "heading":
        return query.filter(edge => edge.node.slideNumber === slideNumber)[0]
          .node.heading
      case "body":
        return documentToReactComponents(
          query.filter(edge => edge.node.slideNumber === slideNumber)[0].node
            .story.json,
          RichTextOptions
        )
      case "image":
        return query.filter(edge => edge.node.slideNumber === slideNumber)[0]
          .node.slideImage.fluid.src
      default:
      //no default
    }
  }

  queryModalContent = (query, id, queryType) => {
    switch (queryType) {
      case "heading":
        return query.filter(edge => edge.node.modalId === id)[0].node.heading
      case "body":
        return documentToReactComponents(
          query.filter(edge => edge.node.modalId === id)[0].node.content.json,
          RichTextOptions
        )
      case "image":
        return query.filter(edge => edge.node.modalId === id)[0].node.image
          .fluid.src
      default:
      //no default
    }
  }

  scrollHeight = () => {
    return {
      height: "100vh",
    }
  }

  render() {
    const { nathanModal1, nathanModal2 } = this.state
    const { progress } = this.props

    return (
      <StaticQuery
        query={graphql`
          query NathanQuery {
            allContentfulNarrativePageTemplate(
              filter: { character: { regex: "/nathan/" } }
            ) {
              edges {
                node {
                  slideNumber
                  heading
                  story {
                    json
                  }
                  slideImage {
                    fluid(maxWidth: 500) {
                      src
                    }
                  }
                }
              }
            }
            allContentfulNarrativeModalTemplate(
              filter: { character: { regex: "/nathan/" } }
            ) {
              edges {
                node {
                  modalId
                  heading
                  content {
                    json
                  }
                  image {
                    fluid(maxWidth: 500) {
                      src
                    }
                  }
                  slide
                }
              }
            }
          }
        `}
        render={data => {
          const narrativeContent = data.allContentfulNarrativePageTemplate.edges
          const modalContent = data.allContentfulNarrativeModalTemplate.edges

          //decide on standard -- put px in
          //place where vbl is being used
          const nathanPortraitTotalDist = 125
          const nathanPortraitOffset = `${
            -(progress * nathanPortraitTotalDist)
          }px`

          const CAR_IMG_MAX_PROGRESS = 0.54
          const offsetFraction = Math.min(progress, CAR_IMG_MAX_PROGRESS)
          const policeCarImgOffset =
            this.policeCarImgRef.current != null
              ? Math.round(
                  offsetFraction * window.innerWidth -
                    this.policeCarImgRef.current.offsetWidth / 2
                )
              : 0

          return (
            <div id="narrative-nathan" ref={this.nathanRef}>
              <div className="narrative-step meet-nathan scroll-start">
                <Container className="relative-content">
                  <Row className="justify-content-center">
                    <Col 
                    xs="auto"  
                    className="d-flex align-items-center">
                      <img
                        src={this.querySlideContent(
                          narrativeContent,
                          1,
                          "image"
                        )}
                        className="nathan-portrait-img"
                        ref={this.nathanPortraitRef}
                        alt=""
                        style={{
                          position: 'relative',
                          transform: `translate3d(0, ${nathanPortraitOffset}, 0)`,
                        }}
                      />
                    </Col>
                    <Col className="d-flex flex-column justify-content-center">
                      <h1>
                        {this.querySlideContent(narrativeContent, 1, "heading")}
                      </h1>
                      {this.querySlideContent(narrativeContent, 1, "body")}
                    </Col>
                  </Row>
                </Container>
              </div>

              <div className="narrative-step arrest">
                <Container className="relative-content">
                  <Row>
                    <Col style={{ marginBottom: 500 }}>
                      <img
                        ref={this.policeCarImgRef}
                        className={clsx(
                          "police-car-img",
                          offsetFraction < CAR_IMG_MAX_PROGRESS && "max-offset"
                        )}
                        src={this.querySlideContent(
                          narrativeContent,
                          2,
                          "image"
                        )}
                        alt=""
                        style={{
                          position: "fixed",
                          transform: `rotate(1.79deg) translate3d(${policeCarImgOffset}px, 0, 0)`,
                          opacity:
                            offsetFraction < CAR_IMG_MAX_PROGRESS ? 1 : 0.15,
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h1>
                        {this.querySlideContent(narrativeContent, 2, "heading")}
                      </h1>
                      {this.querySlideContent(narrativeContent, 2, "body")}
                    </Col>
                  </Row>
                </Container>
              </div>

              <div className="narrative-step police-station-intro">
                <Container className="relative-content">
                  <Row className="justify-content-center">
                    <Col xs="auto" className="d-flex align-items-end">
                      <img
                        className="payphone-img"
                        src={this.querySlideContent(
                          narrativeContent,
                          3,
                          "image"
                        )}
                        alt=""
                      />
                    </Col>
                    <Col className="d-flex flex-column justify-content-end police-station-intro-text">
                      <h1>
                        {this.querySlideContent(narrativeContent, 3, "heading")}
                      </h1>
                      {this.querySlideContent(narrativeContent, 3, "body")}
                    </Col>
                  </Row>
                </Container>
              </div>

              <div className="narrative-step ">
                <Container
                  className="relative-content police-station-choice"
                  id="nathan-choice-slide"
                >
                  <Row className="justify-content-center">
                    <Col>
                      <h1>
                        {this.querySlideContent(narrativeContent, 4, "heading")}
                      </h1>
                      {this.querySlideContent(narrativeContent, 4, "body")}
                      <div className="narrative-btns-container">
                        <Button
                          size="lg"
                          onClick={this.handleNathanModal1Show}
                          className="narrative-btn left"
                        >
                          Speak Up
                        </Button>
                        <Button
                          size="lg"
                          onClick={this.handleNathanModal2Show}
                          className="narrative-btn right"
                        >
                          Wait
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Container>
                <Modal
                  show={nathanModal1}
                  onHide={this.handleModalClose}
                  animation={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title className="narrative-modal-title">
                      <h1>
                        {this.queryModalContent(modalContent, 1, "heading")}
                      </h1>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Row>
                      <Col md={9}>
                        {this.queryModalContent(modalContent, 1, "body")}
                      </Col>
                      <Col md={2}>
                        <img
                          src={this.queryModalContent(modalContent, 1, "image")}
                          height="200px"
                          alt=""
                        />
                      </Col>
                    </Row>
                  </Modal.Body>
                </Modal>

                <Modal
                  show={nathanModal2}
                  onHide={this.handleModalClose}
                  animation={false}
                  id="nathan-wait-modal"
                >
                  <Modal.Header closeButton>
                    <Modal.Title className="narrative-modal-title">
                      <h1>
                        {" "}
                        {this.queryModalContent(modalContent, 2, "heading")}
                      </h1>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Row>
                      <Col md={8}>
                        {this.queryModalContent(modalContent, 2, "body")}
                      </Col>
                      <Col>
                        <img
                          src={this.queryModalContent(modalContent, 2, "image")}
                          width="200px"
                          alt=""
                        />
                      </Col>
                    </Row>
                  </Modal.Body>
                </Modal>
              </div>

              <div className="narrative-step the-court">
                <Container className="relative-content the-court">
                  <Row className="justify-content-center">
                    <Col xs="auto" className="d-flex align-items-center">
                      <img
                        className="calendar-img"
                        src={this.querySlideContent(
                          narrativeContent,
                          5,
                          "image"
                        )}
                        alt=""
                      />
                    </Col>
                    <Col className="d-flex flex-column justify-content-center">
                      <h1>
                        {this.querySlideContent(narrativeContent, 5, "heading")}
                      </h1>
                      {this.querySlideContent(narrativeContent, 5, "body")}
                    </Col>
                  </Row>
                </Container>
              </div>

              <div className="narrative-step what-happened-next">
                <Container className="relative-content">
                  <Row className="justify-content-center">
                    <Col>
                      <h1>
                        {this.querySlideContent(narrativeContent, 6, "heading")}
                      </h1>
                      {this.querySlideContent(narrativeContent, 6, "body")}
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          )
        }}
      />
    )
  }
}

export default NathanNarrative
