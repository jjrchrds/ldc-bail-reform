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
        return query.filter(edge => edge.node.modalId === id)[0].node.image.fluid
          .src
      default:
        //no default
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
              <div className="narrative-step meet-kara">
                <div className="relative-content">
                  <Row className="justify-content-center">
                    <Col className="d-flex flex-column justify-content-center">
                      <h1>
                        {this.querySlideContent(narrativeContent, 1, "heading")}
                      </h1>
                      {this.querySlideContent(narrativeContent, 1, "body")}
                    </Col>
                    <Col
                      md="auto"
                      className="d-flex flex-column justify-content-center"
                    >
                      <img
                        src="./assets/kara.png"
                        width="100%"
                        className="kara-portrait-img"
                        alt=""
                      />
                    </Col>
                  </Row>
                </div>
              </div>

              <div className="narrative-step contacting-family">
                <div className="relative-content">
                  <Row className="justify-content-center">
                    <Col className="d-flex justify-content-between">
                      <Card className="kara-phone-card">
                        <Card.Body className="kara-phone-card-content">
                          <img src="./assets/avatar.svg" 
                          alt=""/>
                          <div>
                            <p>Jason M.</p>
                            <p>905-225-0101</p>
                          </div>
                        </Card.Body>
                      </Card>
                      <Card className="kara-phone-card">
                        <Card.Body className="kara-phone-card-content">
                          <img src="./assets/avatar.svg" 
                          alt=""/>
                          <div>
                            <p>Mark R.</p>
                            <p>418-543-0901</p>
                          </div>
                        </Card.Body>
                      </Card>
                      <Card className="kara-phone-card">
                        <Card.Body className="kara-phone-card-content">
                          <img src="./assets/avatar.svg" 
                          alt=""/>
                          <div>
                            <p>Amy Z.</p>
                            <p>905-555-0123</p>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Row className="justify-content-center contacting-family-text">
                    <Col>
                      <h1>
                        {this.querySlideContent(narrativeContent, 2, "heading")}
                      </h1>
                      {this.querySlideContent(narrativeContent, 2, "body")}
                    </Col>
                  </Row>
                </div>
              </div>

              <div className="narrative-step family-or-money">
                <div className="relative-content" id="kara-choice-slide">
                  <Row className="justify-content-center">
                    <Col>
                      <h1>
                        {this.querySlideContent(narrativeContent, 3, "heading")}
                      </h1>
                      {this.querySlideContent(narrativeContent, 3, "body")}
                      <div className="narrative-btns-container">
                        <Button
                          size="lg"
                          onClick={this.handleKaraModal1Show}
                          className="narrative-btn left"
                        >
                          Buy Landline
                        </Button>
                        <Button
                          size="lg"
                          onClick={this.handleKaraModal2Show}
                          className="narrative-btn right"
                        >
                          Call Amy
                        </Button>
                      </div>
                    </Col>
                  </Row>
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
                            src={this.queryModalContent(
                              modalContent,
                              3,
                              "image"
                            )}
                            height="200px"
                            alt=""
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
                            src={this.queryModalContent(
                              modalContent,
                              4,
                              "image"
                            )}
                            width="125px"
                            alt=""
                          />
                        </Col>
                      </Row>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>

              <div className="narrative-step life-in-jail">
                <div className="relative-content">
                  <Row>
                    <Col>
                      <div className="life-in-jail-text">
                        <h1>
                          {this.querySlideContent(
                            narrativeContent,
                            4,
                            "heading"
                          )}
                        </h1>
                        {this.querySlideContent(narrativeContent, 4, "body")}
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>

              <div className="narrative-step opportunity-for-bail">
                <div className="relative-content">
                  <Row className="justify-content-center">
                    <Col>
                      <h1>
                        {this.querySlideContent(narrativeContent, 5, "heading")}
                      </h1>
                      {this.querySlideContent(narrativeContent, 5, "body")}
                    </Col>
                  </Row>
                </div>
              </div>

              <div className="narrative-step opportunity-for-bail-cards">
                <div className="relative-content">
                  <Row className="justify-content-center">
                    <Col>
                      <Card className="kara-card monique">
                        <Card.Body className="kara-card-content">
                          <span>Monique</span>
                          <ul>
                            <li>Recently lost her job as a bank teller</li>
                            <li>Instacart worker</li>
                          </ul>
                        </Card.Body>
                      </Card>
                      <Card className="kara-card lisa">
                        <Card.Body className="kara-card-content">
                          <span>Lisa</span>
                          <ul>
                            <li>Home-care worker</li>
                            <li>Lives with employer</li>
                          </ul>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col>
                      <Card className="kara-card alex">
                        <Card.Body className="kara-card-content">
                          <span>Alex</span>
                          <ul>
                            <li>Uber driver</li>
                          </ul>
                        </Card.Body>
                      </Card>
                      <Card className="kara-card mike">
                        <Card.Body className="kara-card-content">
                          <span>Mike</span>
                          <ul>
                            <li>Starbucks barista</li>
                            <li>Night shift janitor</li>
                            <li>Has a kid entering university</li>
                          </ul>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Row className="justify-content-center none-fits-requirements-text">
                    <p>None fits the requirements</p>
                  </Row>
                </div>
              </div>

              <div className="narrative-step phone-call">
                <div className="relative-content">
                  <Row className="justify-content-center">
                    <Col 
                      md="auto"
                      className="d-flex flex-column justify-content-center"
                    >
                      <img src="./assets/mobile.png" className="cell-phone-img" alt=""/>
                    </Col>
                    <Col className="d-flex flex-column justify-content-center">
                      <h1>
                        {this.querySlideContent(narrativeContent, 7, "heading")}
                      </h1>
                      {this.querySlideContent(narrativeContent, 7, "body")}
                    </Col>
                  </Row>
                </div>
              </div>

              <div className="narrative-step what-happend-next">
                <div className="relative-content">
                  <Row className="justify-content-md-center">
                    <Col>
                      <h1>
                        {this.querySlideContent(narrativeContent, 8, "heading")}
                      </h1>
                      {this.querySlideContent(narrativeContent, 8, "body")}
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          )
        }}
      />
    )
  }
}

export default KaraNarrative
