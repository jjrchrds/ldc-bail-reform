import React, { useState, useRef } from "react"
import { StaticQuery, graphql } from "gatsby"
import { Controller, Scene } from 'react-scrollmagic';
import { Container, Row, Col, Button } from "react-bootstrap"
import { querySlideContent, queryModalContent } from './common'
import { BLOCKS } from "@contentful/rich-text-types"
import Img from 'gatsby-image'


const GeorgeComponent = ({ handleShow, handleBg }) => (
  <StaticQuery
    query={graphql`
          query GeorgeSlideQuery {
            allContentfulNarrativePageTemplate(
              filter: { character: { regex: "/george/" } }
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
              filter: { character: { regex: "/george/" } }
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

      const Text = ({ children }) => <p>{children}</p>
      const ListItem = ({ children }) => <li>{children}</li>
      const UnorderedList = ({ children }) => <ul className="x">{children}</ul>
      const OrderedList = ({ children }) => <ol>{children}</ol>
      const richTextOptions = {
        renderNode: {
          [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
          [BLOCKS.LIST_ITEM]: (node, children) => <ListItem>{children}</ListItem>,
          [BLOCKS.UL_LIST]: (node, children) => (
            <UnorderedList>{children}</UnorderedList>
          ),
          [BLOCKS.OL_LIST]: (node, children) => <OrderedList>{children}</OrderedList>,
        },
      }

      const showModal = (data) => {
        handleShow(data);
      }
      return (
        <Controller>

          {/* meet george - portrait */}
          <Scene
            // indicators={true}
            triggerHook={0}
            duration={"150%"}
            pinSettings={{ pushFollowers: false }}
            pin
          >
            {(progress, event) => {
              if (event.scrollDirection === "REVERSE" && event.type === "leave") {
                // console.log(event.type);
                handleBg('kara');
              }
              return (
                <div className={`vh-100`}>
                  <Container className={`h-100`}>
                    <Row className="h-100 d-flex align-items-center text-white">
                      <Col md={{ span: 6, offset: 0 }} className="h-100">
                        <img
                          src="https://via.placeholder.com/500x600"
                          // fluid={querySlideContent(narrativeContent, 1, "image", richTextOptions)}
                          alt=""
                          className={`img-fluid bottom-locked opacity-0 ${progress < .9 ? 'opacity-1' : ''}`}
                        />
                      </Col>
                    </Row>
                  </Container>
                </div>
              )
            }}
          </Scene>

          {/* meet george - text */}
          <Scene
            // indicators={true}
            triggerHook={0}
            duration={"50%"}
            pin
          >
            {(progress, event) => {
              return (
                <div className={`vh-100`}>
                  <Container className={`h-100`}>
                    <Row className="h-100 d-flex align-items-center text-white">
                      <Col md={{ span: 6, offset: 6 }}>
                        <h1>
                          {querySlideContent(narrativeContent, 1, "heading", richTextOptions)}
                        </h1>
                        {querySlideContent(narrativeContent, 1, "body", richTextOptions)}
                      </Col>
                    </Row>
                  </Container>
                </div>
              )
            }}
          </Scene>

          {/* conditions */}
          <Scene
            // indicators={true}
            triggerHook={0}
            duration={"50%"}
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
                            {querySlideContent(
                              narrativeContent,
                              2,
                              "heading",
                              richTextOptions
                            )}
                          </h1>
                          {querySlideContent(narrativeContent, 2, "body", richTextOptions)}
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
              )
            }}
          </Scene>

          {/* out on bail - keys img */}
          <Scene
            // indicators={true}
            triggerHook={0}
            duration={"150%"}
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
                          className={`img-fluid slide-from-right ${progress > 0 ? 'active' : ''}`}
                          // fluid={querySlideContent(
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

          {/* out on bail - text */}
          <Scene
            // indicators={true}
            triggerHook={0}
            duration={"50%"}
            pin
          >
            {(progress, event) => {
              return (
                <div>
                  <Container className={`vh-100`}>
                    <Row className="h-100 d-flex align-items-center text-white">
                      <Col className="text-left col-6">
                        <h1>
                          {querySlideContent(narrativeContent, 3, "heading", richTextOptions)}
                        </h1>
                        {querySlideContent(narrativeContent, 3, "body", richTextOptions)}
                      </Col>
                    </Row>
                  </Container>
                </div>
              )
            }}
          </Scene>


          {/* working while on bail - watch img */}
          <Scene
            // indicators={true}
            triggerHook={0}
            duration={"50%"}
            pinSettings={{ pushFollowers: false }}
            pin
          >
            {(progress, event) => {
              return (
                <div className={`vh-100 character-01`}>
                  <Container className={`h-100`}>
                    <Row className="h-100 d-flex align-items-center text-white">
                      <Col className="text-center col-6 offset-6">
                        <img
                          className={`img-fluid slide-from-left w-100 ${progress > 0 ? 'active' : ''}`}
                          // src="./assets/watch.png"
                          src="https://via.placeholder.com/500x300"
                        />
                      </Col>
                    </Row>
                  </Container>
                </div>
              )
            }}
          </Scene>

          {/* working while on bail */}
          <Scene
            // indicators={true}
            triggerHook={0}
            duration={"70%"}
            pin
          >
            {(progress, event) => {
              return (
                <div className={`vh-100`}>
                  <Container className={`h-100`}>
                    <Row className="h-100 d-flex justify-content-center align-items-center text-white">
                      <Col lg="7" className="text-left">
                        <h1>
                          {querySlideContent(narrativeContent, 4, "heading", richTextOptions)}
                        </h1>
                        {querySlideContent(narrativeContent, 4, "body", richTextOptions)}
                        <div className="d-flex justify-content-center">
                          <div className={`d-inline-block slide-from-bottom ${progress > .1 ? 'active' : ''}`}>
                            <Button
                              onClick={() => showModal(
                                {
                                  title:
                                    queryModalContent(modalContent, 5, "heading", richTextOptions),
                                  body:
                                    queryModalContent(modalContent, 5, "body", richTextOptions)
                                })}
                              className={`text-uppercase btn-stories btn-rotate-right text-white py-2 mr-3`} variant="pink"
                            >

                              <span>Work</span>
                            </Button>
                          </div>
                          <div className={`d-inline-block slide-from-bottom ${progress > .1 ? 'active' : ''}`}>
                            <Button
                              onClick={() => showModal(
                                {
                                  title:
                                    queryModalContent(modalContent, 6, "heading", richTextOptions),
                                  body:
                                    queryModalContent(modalContent, 6, "body", richTextOptions)
                                })}
                              className={`text-uppercase btn-stories btn-rotate-left text-white py-2 mr-3`} variant="pink"
                            >
                              <span>Go Home</span>
                            </Button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
              )
            }}
          </Scene >

          {/* police check */}
          < Scene
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
                      <Col className="text-center h-100 d-flex align-items-center">
                        <img
                          className={`img-fluid ${progress > .1 ? 'active' : ''}`}
                          // src={querySlideContent(
                          //   narrativeContent,
                          //   5,
                          //   "image"
                          // )}
                          src="http://via.placeholder.com/500x600"
                        />
                      </Col>
                      <Col lg="7" className="text-left">
                        <h1>
                          {querySlideContent(narrativeContent, 5, "heading")}
                        </h1>
                        {querySlideContent(narrativeContent, 5, "body")}
                      </Col>
                    </Row>
                  </Container>
                </div>
              )
            }}
          </Scene >


          {/* what happened next */}
          < Scene
            // indicators={true}
            triggerHook={0}
            duration={"50%"}
            pin
          >
            {(progress, event) => {
              return (
                <div className={`vh-100 character-01`}>
                  <Container className={`h-100`}>
                    <Row className="h-100 d-flex align-items-center text-white">
                      <Col>
                        <h1>
                          {querySlideContent(narrativeContent, 6, "heading")}
                        </h1>
                        {querySlideContent(narrativeContent, 6, "body")}
                      </Col>
                    </Row>
                  </Container>
                </div>
              )
            }}
          </Scene >
        </Controller >
      )
    }} />
)

export default GeorgeComponent