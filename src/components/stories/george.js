import React, { useState, useRef } from "react"
import { StaticQuery, graphql } from "gatsby"
import { Controller, Scene } from 'react-scrollmagic';
import { Container, Row, Col, Button } from "react-bootstrap"
import { querySlideContent } from './common'


const GeorgeComponent = () => (
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

      return (
        <Controller>

          {/* meet george - portrait */}
          <Scene
            indicators={true}
            triggerHook={0}
            duration={"150%"}
            pinSettings={{ pushFollowers: false }}
            pin
          >
            {(progress, event) => {
              return (
                <div className={`vh-100 character-01`}>
                  <Container className={`h-100`}>
                    <Row className="h-100 d-flex align-items-center text-white">
                      <Col md={{ span: 6 }} className="h-100">
                        <img
                          src="./assets/george.png"
                          alt=""
                          className={`george-portrait-img img-fluid bottom-locked opacity-0 w-100 ${progress < .9 ? 'opacity-1' : ''}`}
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
            indicators={true}
            triggerHook={0}
            duration={"50%"}
            // pinSettings={{ pushFollowers: false }}
            pin
          >
            {(progress, event) => {
              return (
                <div className={`vh-100`} style={{ paddingBottom: '150vh', paddingTop: '30vh' }}>
                  <Container className={`h-100`}>
                    <Row className="h-100 d-flex align-items-center text-white">
                      <Col md={{ span: 6, offset: 6 }}>
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

          {/* conditions */}
          <Scene
            indicators={true}
            triggerHook={0}
            duration={"50%"}
            // pinSettings={{ pushFollowers: false }}
            pin
          >
            {(progress, event) => {
              return (
                <div className={`vh-100`} style={{ marginBottom: '-25vh' }}>
                  <Container className={`h-100`}>
                    <Row className="h-100 d-flex align-items-center text-white">
                      <Col>
                        <div>
                          <h1>
                            {querySlideContent(
                              narrativeContent,
                              2,
                              "heading"
                            )}
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

          {/* out on bail - keys img */}
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
                          src={querySlideContent(
                            narrativeContent,
                            3,
                            "image"
                          )}
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
            indicators={true}
            triggerHook={0}
            duration={"60vh"}
            pin
          >
            {(progress, event) => {
              return (
                <div>
                  <Container className={`h-100`}>
                    <Row className="h-100 d-flex align-items-center text-white">
                      <Col className="text-left col-6">
                        <h1>
                          {querySlideContent(narrativeContent, 3, "heading")}
                        </h1>
                        {querySlideContent(narrativeContent, 3, "body")}
                      </Col>
                    </Row>
                  </Container>
                </div>
              )
            }}
          </Scene>


          {/* working while on bail - watch img */}
          <Scene
            indicators={true}
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
                          src="./assets/watch.png"
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
                          {querySlideContent(narrativeContent, 4, "heading")}
                        </h1>
                        {querySlideContent(narrativeContent, 4, "body")}
                        <div className="d-flex justify-content-center">
                          <Button className={`text-uppercase btn-stories btn-rotate-right text-white py-2 mr-3 slide-from-bottom ${progress > .1 ? 'active' : ''}`} variant="pink">
                            <span>Work</span>
                          </Button>
                          <Button className={`text-uppercase btn-stories btn-rotate-left text-white py-2 slide-from-bottom ${progress > .2 ? 'active' : ''}`} variant="pink">
                            <span>Go Home</span>
                          </Button>
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
                      <Col className="text-center">
                        <img
                          className={`ringing ${progress > .1 ? 'active' : ''}`}
                          src={querySlideContent(
                            narrativeContent,
                            5,
                            "image"
                          )}
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
            indicators={true}
            triggerHook={- 3}
            duration={"50%"}
            // pinSettings={{ pushFollowers: false }}
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