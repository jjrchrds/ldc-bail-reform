import React, { Component } from "react"
import "intersection-observer"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { StaticQuery, graphql } from "gatsby"
import { BLOCKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const RichTextOptions = {

  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>
  },
}

class NathanNarrative extends Component {
  state = {
    nathanModal2: false,
    nathanModal1: false,
  }

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
        return query.filter(edge => edge.node.modalId === id)[0].node.image.fluid.src
    }
  }

  scrollHeight = () => {
    return {
      height: "100vh"
    }
  }

  render() {
    const { nathanModal1, nathanModal2 } = this.state

    var nathan1Style = () => {
      console.log(this.props.allContentfulNarrativePageTemplatestep)
      if (this.props.step <= 1) {
        return {
          position: "sticky",
          top: 0
        }
      } else {
        return {
          position: "relative"
        }
      }

    }

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

          return (
            <div id="narrative-nathan">
              <div className="narrative-step">
                <div className="sticky">
                  <div className="narrative-content">
                    <Row className="justify-content-md-center">
                      <Col md={5}>
                        <img
                          src={this.querySlideContent(narrativeContent, 1, "image")}
                          width="100%"
                        />
                      </Col>
                      <Col md={5} className="narrative-text-container">
                        <span>
                          <h1>
                            {this.querySlideContent(narrativeContent, 1, "heading")}
                          </h1>
                        
                            {this.querySlideContent(narrativeContent, 1, "body")}
                          
                        </span>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div style={this.scrollHeight("100vh")}></div>
              </div>

              <div className="narrative-step ">
                <div className="sticky">
                  <div className="narrative-content">
                    <img
                      src={this.querySlideContent(narrativeContent, 2, "image")}
                      id="police-car-image"
                    />
                    <Row className="justify-content-md-center">
                      <Col md={9}>
                        <h1>
                          {this.querySlideContent(narrativeContent, 2, "heading")}
                        </h1>
                        {this.querySlideContent(narrativeContent, 2, "body")}
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="scroll-height"></div>
              </div>

              <div className="narrative-step " >
                <div className="sticky" >
                  <div className="narrative-content">
                    <Row className="justify-content-md-center">
                      <Col md={4}>
                        <img
                          src={this.querySlideContent(narrativeContent, 3, "image")}
                          width="100%"
                        />
                      </Col>
                      <Col md={6} style={{ position: "relative" }}>
                        <span>
                          <h1>
                            {this.querySlideContent(narrativeContent, 3, "heading")}
                          </h1>
                          
                          {this.querySlideContent(narrativeContent, 3, "body")}
                          
                        </span>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="scroll-height"></div>
              </div>
              <div className="narrative-step " >
                <div className="sticky" id="nathan-choice-slide">
                  <div className="narrative-content">
                    <Row className="justify-content-md-center">
                      <Col md={8}>
                        <h1>
                          {this.querySlideContent(narrativeContent, 4, "heading")}
                        </h1>
                        {this.querySlideContent(narrativeContent, 4, "body")}
                        <div style={{ display: "flex", justifyContent: "center" }}>
                          <Button
                            size="lg"
                            onClick={this.handleNathanModal1Show}
                            className="narrative-button-left"
                          >
                            Speak Up
                      </Button>
                          <Button
                            size="lg"
                            onClick={this.handleNathanModal2Show}
                            className="narrative-button-right"
                          >
                            Wait
                      </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div style={this.scrollHeight("100vh")}></div>
                </div>
                <div className="scroll-height"></div>
              </div>
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
                    <h1> {this.queryModalContent(modalContent, 2, "heading")}</h1>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row>
                    <Col md={8}>
                      {this.queryModalContent(modalContent, 2, "body")}
                    </Col>
                    <Col>
                      <img src={this.queryModalContent(modalContent, 2, "image")} width="200px" />
                    </Col>
                  </Row>
                </Modal.Body>
              </Modal>

              <div className="narrative-step" >
                <div className="sticky">
                  <div className="narrative-content">
                    <Row className="justify-content-md-center">
                      <Col md={4}>
                        <img
                          src={this.querySlideContent(narrativeContent, 5, "image")}
                          width="100%"
                        />
                      </Col>
                      <Col md={6} style={{ position: "relative" }}>
                        <span>
                          <h1>
                            {this.querySlideContent(narrativeContent, 5, "heading")}
                          </h1>
                          
                            {this.querySlideContent(narrativeContent, 5, "body")}
                          
                        </span>
                      </Col>
                    </Row>
                  </div>
                  <div style={this.scrollHeight("100vh")}></div>
                </div>
                <div className="scroll-height"></div>
              </div>

              <div className="narrative-step" >
                <div className="sticky">
                  <div className="narrative-content">
                    <Row className="justify-content-md-center">
                      <Col md={8}>
                        <h1>
                          {this.querySlideContent(narrativeContent, 6, "heading")}
                        </h1>
                        {this.querySlideContent(narrativeContent, 6, "body")}
                      </Col>
                    </Row>
                  </div>
                  <div style={this.scrollHeight("100vh")}></div>
                </div>
                <div className="scroll-height"></div>
              </div>
            </div>
          )
        }}
      />
    )
  }
}

export default NathanNarrative
