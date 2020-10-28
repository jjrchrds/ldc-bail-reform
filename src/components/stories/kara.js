import React, { useState, useRef } from "react"
import { StaticQuery, graphql } from "gatsby"
import { Controller, Scene } from 'react-scrollmagic';
import { Container, Row, Col, Button, Card } from "react-bootstrap"
import { BLOCKS } from "@contentful/rich-text-types"
import { querySlideContent, queryModalContent } from './common'
import Img from "gatsby-image"





const KaraComponent = ({ handleShow, handleBg }) => {
  return (
    <StaticQuery
      query={graphql`
        query KaraSlideQuery {
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
        const Text = ({ children }) => <p>{children}</p>
        const richTextOptions = {
          renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
          },
        }

        const showModal = (data) => {
          handleShow(data);
        }
        const narrativeContent = data.allContentfulNarrativePageTemplate.edges
        const modalContent = data.allContentfulNarrativeModalTemplate.edges
        return (
          <Controller>
            {/* Kara */}

            {/* meet kara - portrait img */}
            <Scene
              // indicators={true}
              triggerHook={-.5}
              duration={"150%"}
              pinSettings={{ pushFollowers: false }}
              pin
            >
              {(progress, event) => {
                if (event.scrollDirection === "REVERSE" && event.type === "leave") {
                  // console.log(event.type);
                  handleBg('nathan');
                }
                return (
                  <div className={`vh-100 character-01`}>
                    <Container className={`h-100 position-relative`}>
                      <Row className="h-100 d-flex align-items-end text-white">
                        <Col lg={{ span: 6, offset: 6 }}>

                          <img
                            // fluid={querySlideContent(narrativeContent, 1, 'image', richTextOptions)}
                            src="https://via.placeholder.com/500x600"
                            className={`img-fluid bottom-locked opacity-0 ${progress < .9 ? 'opacity-1' : ''}`}
                          />
                        </Col>
                      </Row>
                    </Container>
                  </div>
                )
              }}
            </Scene>

            {/* meet kara - text */}
            <Scene
              // indicators={true}
              triggerHook={-1}
              duration={"50%"}
              pin
            >
              {(progress, event) => {
                return (
                  <div className={`vh-100 character-01`}>
                    <Container className={`h-100`}>
                      <Row className="h-100 d-flex align-items-center text-white">
                        <Col md={{ span: 6, offset: 0 }}>
                          <h1>
                            {querySlideContent(narrativeContent, 1, "heading")}
                          </h1>
                          {querySlideContent(narrativeContent, 1, "body")}
                        </Col>
                      </Row>
                    </Container>
                  </div>
                )
              }}
            </Scene>

            {/* contacting family */}
            <Scene
              // indicators={true}
              triggerHook={0}
              duration={"70%"}
              pin
            >
              {(progress, event) => {
                return (
                  <div className={`vh-100 character-01`}>
                    <Container className={`h-100`}>
                      <Row className="h-100 d-flex justify-content-center align-items-center">
                        <Col lg="10" className="text-left">
                          <Row className="d-flex justify-content-between mt-5">
                            <Col className={`opacity-0 slide-from-top ${progress > .15 ? 'active opacity-1' : ''}`}>

                              <Card>
                                <Card.Body className="px-3 py-2">
                                  <p className="mb-0">Jason M.</p>
                                  <p className="mb-0">905-555-2323</p>
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col className={`opacity-0 slide-from-top ${progress > .25 ? 'active opacity-1' : ''}`}>
                              <Card>
                                <Card.Body className="px-3 py-2">
                                  <p className="mb-0">Jason M.</p>
                                  <p className="mb-0">905-555-2323</p>
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col className={`opacity-0 slide-from-top ${progress > .35 ? 'active opacity-1' : ''}`}>
                              <Card>
                                <Card.Body className="px-3 py-2">
                                  <p className="mb-0">Jason M.</p>
                                  <p className="mb-0">905-555-2323</p>
                                </Card.Body>
                              </Card>
                            </Col>
                          </Row>
                          <div className="text-white mt-5">
                            <h1>
                              {querySlideContent(narrativeContent, 2, "heading")}
                            </h1>
                            {querySlideContent(narrativeContent, 2, "body")}
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                )
              }}
            </Scene>

            {/* family or money  */}
            <Scene
              // indicators={true}
              triggerHook={0}
              duration={"50%"}
              pin
            >
              {(progress, event) => {
                return (
                  <div className={`vh-100 character-01`}>
                    <Container className={`h-100`}>
                      <Row className="h-100 d-flex justify-content-center align-items-center text-white">
                        <Col lg="7" className="text-left">
                          <h1>
                            {querySlideContent(narrativeContent, 3, "heading")}
                          </h1>
                          <p>
                            {querySlideContent(narrativeContent, 3, "body")}
                          </p>
                          <div className="text-center mt-5">
                            <Button
                              className="text-uppercase btn-stories btn-rotate-right text-white py-2 mr-3" variant="pink"
                              onClick={() => showModal(
                                {
                                  title:
                                    queryModalContent(modalContent, 3, "heading", richTextOptions),
                                  body:
                                    queryModalContent(modalContent, 3, "body", richTextOptions)
                                })}
                            >
                              <span>Buy Landline</span>
                            </Button>
                            <Button
                              className="text-uppercase btn-stories btn-rotate-left text-white py-2" variant="pink"
                              onClick={() => showModal(
                                {
                                  title:
                                    queryModalContent(modalContent, 4, "heading", richTextOptions),
                                  body:
                                    queryModalContent(modalContent, 4, "body", richTextOptions)
                                })}
                            >
                              <span>Call Amy</span>
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                )
              }}
            </Scene>


            {/* life in jail  - lightbulb img */}
            <Scene
              indicators={true}
              triggerHook={-3}
              duration={"50%"}
              pinSettings={{ pushFollowers: false }}
              pin
            >
              {(progress, event) => {
                return (
                  <div className={`vh-100`}>
                    <Container className={`h-100`}>
                      <Row className="h-100 d-flex align-items-center text-white">
                        <Col className="text-center col-6 offset-6">
                          <img
                            className={`img-fluid slide-from-left ${progress > 0 ? 'active' : ''}`}
                            // src={querySlideContent(
                            //   narrativeContent,
                            //   3,
                            //   "image",
                            //   richTextOptions
                            // )}
                            src="https://via.placeholder.com/500x600"
                          />
                        </Col>
                      </Row>
                    </Container>
                  </div>
                )
              }}
            </Scene>


            {/* opportunity for bail */}
            <Scene
              indicators={true}
              triggerHook={0}
              duration={"50%"}
              // pinSettings={{ pushFollowers: false }}
              pin
            >
              {(progress, event) => {
                return (
                  <div className={`vh-100`}>
                    <Container className={`h-100`}>
                      <Row className="h-100 d-flex align-items-center text-white">
                        <Col>
                          <div>
                            <h1>
                              {querySlideContent(narrativeContent, 5, "heading")}
                            </h1>
                            {querySlideContent(narrativeContent, 5, "body")}
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                )
              }}
            </Scene>

            {/* opportunity for bail - cards */}
            <Scene
              indicators={true}
              triggerHook={0}
              duration={"50%"}
              // pinSettings={{ pushFollowers: false }}
              pin
            >
              {(progress, event) => {
                return (
                  <div className={`vh-100`}>
                    <Container className={`h-100`}>
                      <Row className="justify-content-center">
                        <Col className="d-flex flex-column align-items-center">
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
                        <Col className="d-flex flex-column align-items-center">
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
                    </Container>
                  </div>
                )
              }}
            </Scene>

            {/* phone call */}
            <Scene
              // indicators={true}
              triggerHook={0}
              duration={"70%"}
              pin
            >
              {(progress, event) => {
                return (
                  <div className={`vh-100 character-01`}>
                    <Container className={`h-100`}>
                      <Row className="h-100 d-flex justify-content-center align-items-center text-white">
                        <Col className="text-center">
                          <img
                            // src="./assets/mobile.png"
                            src="https://via.placeholder.com/500x600"
                            className="w-100"
                            alt=""
                          />

                        </Col>
                        <Col lg="7" className="text-left">
                          <h1>
                            {querySlideContent(narrativeContent, 7, "heading")}
                          </h1>
                          {querySlideContent(narrativeContent, 7, "body")}
                        </Col>
                      </Row>
                    </Container>
                  </div>
                )
              }}
            </Scene>

            {/* what happened next */}
            < Scene
              indicators={true}
              triggerHook={- 3}
              duration={"50%"}
              // pinSettings={{ pushFollowers: false }}
              pin
            >
              {(progress, event) => {
                if (event.scrollDirection === "FORWARD" && event.type === "leave") {
                  // console.log(event.type);
                  handleBg('george');
                } else if (event.scrollDirection === "REVERSE" && event.type === "enter") {
                  // console.log(event.type);
                  handleBg('kara');
                }
                return (
                  <div className={`vh-100 character-01`}>
                    <Container className={`h-100`}>
                      <Row className="h-100 d-flex align-items-center text-white">
                        <Col>
                          <h1>
                            {querySlideContent(narrativeContent, 8, "heading")}
                          </h1>
                          {querySlideContent(narrativeContent, 8, "body")}
                        </Col>
                      </Row>
                    </Container>
                  </div>
                )
              }}
            </Scene >
          </Controller>
        )
      }}
    />
  )
}

export default KaraComponent