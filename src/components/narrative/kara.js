import React, { Component } from "react"
import "intersection-observer"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import { StaticQuery, graphql } from "gatsby"
import { BLOCKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const Text = ({ children }) => <p>{children}</p>

const RichTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
  },
}

class KaraNarrative extends Component {
  state = {
    karaModal1: false,
    karaModal2: false,
  }

  handleKaraModal1Show = () => {
    this.setState({
      karaModal1: true,
    })
  }

  handleKaraModal2Show = () => {
    this.setState({
      karaModal2: true,
    })
  }

  handleModalClose = () => {
    this.setState({
      karaModal1: false,
      karaModal2: false,
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
        return query.filter(edge => edge.node.modalId == id)[0].node.image.fluid
          .src
    }
  }

  render() {
    const { karaModal1, karaModal2 } = this.state
    return (
      <StaticQuery
        query={graphql`
          query KaraQuery {
            allContentfulNarrativePageTemplate(
              filter: { character: { regex: "/kara/" } }
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
              filter: { character: { regex: "/kara/" } }
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
            <div id="narrative-kara">
              <div className="narrative-step">
                <div className="sticky">
                  <div className="narrative-content">
                    <Row className="justify-content-md-center">
                      <Col md={5} className="narrative-text-container">
                        <span>
                          <h1>
                            {this.querySlideContent(narrativeContent, 1, "heading")}
                          </h1>
                          {this.querySlideContent(narrativeContent, 1, "body")}
                        </span>
                      </Col>
                      <Col md={4}>
                        <img src="./assets/kara.png" width="100%" />
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="scroll-height"></div>


              </div>

              <div className="narrative-step">
                <div className="sticky">
                  <div className="narrative-content">
                    <Row className="justify-content-md-center" md={4}>
                      <Col>
                        <Card className="kara-phone-card">
                          <Card.Body className="kara-phone-card-content">
                            <Row className="justify-content-md-center">
                              <Col md={5}>
                                <img src="./assets/avatar.svg" width="100%" />
                              </Col>
                              <Col md={7}>
                                <p>Jason M.</p>
                                <p>905-225-0101</p>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col>
                        <Card className="kara-phone-card">
                          <Card.Body className="kara-phone-card-content">
                            <Row className="justify-content-md-center">
                              <Col md={5}>
                                <img src="./assets/avatar.svg" width="100%" />
                              </Col>
                              <Col md={7}>
                                <p>Mark R.</p>
                                <p>418-543-0901</p>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col>
                        <Card className="kara-phone-card">
                          <Card.Body className="kara-phone-card-content">
                            <Row className="justify-content-md-center">
                              <Col md={5}>
                                <img src="./assets/avatar.svg" width="100%" />
                              </Col>
                              <Col md={7}>
                                <p>Amy Z.</p>
                                <p>905-555-0123</p>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
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

              <div className="narrative-step">
                <div className="sticky" id="kara-choice-slide">
                  <div className="narrative-content">
                    <Row className="justify-content-md-center">
                      <Col md={8}>
                        <h1>
                          {this.querySlideContent(narrativeContent, 3, "heading")}
                        </h1>
                        {this.querySlideContent(narrativeContent, 3, "body")}
                        <div style={{ display: "flex", justifyContent: "center" }}>
                          <Button
                            size="lg"
                            onClick={this.handleKaraModal1Show}
                            className="narrative-button-left"
                          >
                            Buy Landline
                      </Button>
                          <Button
                            size="lg"
                            onClick={this.handleKaraModal2Show}
                            className="narrative-button-right"
                          >
                            Call Amy
                      </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="scroll-height"></div>
              </div>

              <Modal
                show={karaModal1}
                onHide={this.handleModalClose}
                animation={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title className="narrative-modal-title">
                    <h1>
                      {this.queryModalContent(modalContent, 3, "heading")}
                    </h1>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row>
                    <Col md={9}>
                      {this.queryModalContent(modalContent, 3, "body")}
                    </Col>
                    <Col md={2}>
                      <img
                        src={this.queryModalContent(modalContent, 3, "image")}
                        height="200px"
                      />
                    </Col>
                  </Row>
                </Modal.Body>
              </Modal>

              <Modal
                show={karaModal2}
                onHide={this.handleModalClose}
                animation={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title className="narrative-modal-title">
                    <h1>
                      {this.queryModalContent(modalContent, 4, "heading")}
                    </h1>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row>
                    <Col md={9}>
                      {this.queryModalContent(modalContent, 4, "body")}
                    </Col>
                    <Col>
                      <img
                        src={this.queryModalContent(modalContent, 4, "image")}
                        width="125px"
                      />
                    </Col>
                  </Row>
                </Modal.Body>
              </Modal>

              <div className="narrative-step">
                <div className="sticky">
                  <div className="narrative-content">
                    <Row className="justify-content-md-center">
                      <Col md={8}>
                        <h1>
                          {this.querySlideContent(narrativeContent, 4, "heading")}
                        </h1>
                        {this.querySlideContent(narrativeContent, 4, "body")}
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="scroll-height"></div>

              </div>

              <div className="narrative-step">
                <div className="sticky">
                  <div className="narrative-content">
                    <Row className="justify-content-md-center">
                      <Col md={8}>
                        <h1>
                          {this.querySlideContent(narrativeContent, 5, "heading")}
                        </h1>
                        {this.querySlideContent(narrativeContent, 5, "body")}
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="scroll-height"></div>
              </div>

              <div className="narrative-step">
                <div className="sticky">
                  <div className="narrative-content">
                    <Row className="justify-content-md-center" >
                      <Col>
                        <Card className="kara-card">
                          <Card.Body className="kara-card-content">
                            <h1>Monique</h1>
                            <ul>
                              <li>Recently lost her job as a bank teller</li>
                              <li>Instacart worker</li>
                            </ul>
                          </Card.Body>
                        </Card>
                        <Card className="kara-card">
                          <Card.Body className="kara-card-content">
                            <h1>Lisa</h1>
                            <ul>
                              <li>Home-care worker</li>
                              <li>Lives with employer</li>
                            </ul>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col>
                        <Card className="kara-card">
                          <Card.Body className="kara-card-content">
                            <h1>Alex</h1>
                            <ul>
                              <li>Uber driver</li>
                            </ul>
                          </Card.Body>
                        </Card>
                        <Card className="kara-card">
                          <Card.Body className="kara-card-content">
                            <h1>Mike</h1>
                            <ul>
                              <li>Starbucks barista</li>
                              <li>Night shift janitor</li>
                              <li>Has a kid entering university</li>
                            </ul>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                      <h1>None fits the requirements</h1>
                    </Row>
                  </div>
                </div>
                <div className="scroll-height"></div>
              </div>

              <div className="narrative-step">
                <div className="sticky">
                  <div className="narrative-content">
                    <Row className="justify-content-md-center">
                      <Col md={3}>
                        <img src="./assets/mobile.png" width="80%" />
                      </Col>
                      <Col md={5}>
                        <h1>
                          {this.querySlideContent(narrativeContent, 7, "heading")}
                        </h1>
                        {this.querySlideContent(narrativeContent, 7, "body")}
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="scroll-height"></div>

              </div>

              <div className="narrative-step">
                <div className="sticky">
                  <div className="narrative-content">
                    <Row className="justify-content-md-center">
                      <Col md={7}>
                        <h1>
                          {this.querySlideContent(narrativeContent, 8, "heading")}
                        </h1>
                        {this.querySlideContent(narrativeContent, 8, "body")}
                      </Col>
                    </Row>
                  </div>
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

export default KaraNarrative
