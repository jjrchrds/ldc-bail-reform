import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Controller, Scene } from 'react-scrollmagic';
import { Container, Row, Col, Button } from "react-bootstrap"
import RichText from "./rich-text"
import Img from 'gatsby-image'


const GeorgeComponent = ({ handleShow, handleBg }) => {

  const data = useStaticQuery(graphql`
    query {
      allContentfulNarrativePageBackground(filter: { pageTitle:{eq:"George"}}) {
        edges {
          node {
            pageTitle
            backgroundImage {
              fluid(maxWidth: 1920) {
                ...GatsbyContentfulFluid
              }
            }
            slides {
              heading
              story {
                json
              }
              slideImage {
                fluid(maxWidth: 600) {
                  ...GatsbyContentfulFluid
                }
              }
              modalButtons {
                heading
                content {
                  json
                }
                image {
                  fluid(maxWidth: 400) {
                    ...GatsbyContentfulFluid
                  }
                }
                buttonLabel
              }
            }
          }
        }
      }
    }`
  )

  const slides = data.allContentfulNarrativePageBackground.edges[0].node.slides

  // console.log('georgeslides', slides)

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
                    <div className="h-100 w-100 position-relative">
                      <Img
                        fluid={slides[0].slideImage.fluid}
                        alt=""
                        className={`w-100 position-absolute bottom-locked opacity-0 ${progress < .9 ? 'opacity-1' : ''}`}
                      />
                    </div>
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
                      {slides[0].heading}
                    </h1>
                    <RichText json={slides[0].story.json} />
                  </Col>
                </Row>
              </Container>
            </div>
          )
        }}
      </Scene>


      {/* Arrest - police car img*/}
      <Scene
        // indicators={true}
        triggerHook={0}
        duration={"70%"}
        pinSettings={{ pushFollowers: false }}
        pin
      >
        {(progress, event) => {
          return (
            <div className={`vh-100 character-01`}>
              <Container className={`h-100`}>
                <Row className="h-100 d-flex align-items-center text-white">
                  <Col className="text-center">
                    <Img fluid={slides[1].slideImage.fluid} className={`d-inline-block w-50 slide-from-left ${progress > 0 ? 'active' : ''}`} />
                  </Col>
                </Row>
              </Container>
            </div>
          )
        }}
      </Scene>

      {/* arrest - text */}
      <Scene
        // indicators={true}
        triggerHook={0}
        duration={"60%"}
        pin
      >
        {(progress, event) => {
          return (
            <div className={`vh-100`}>
              <Container className={`h-100`}>
                <Row className="h-100 d-flex justify-content-center align-items-center text-white">
                  <Col lg="8">
                    <div>
                      <h1>
                        {slides[1].heading}
                      </h1>
                      <RichText json={slides[1].story.json} />
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          )
        }}
      </Scene>

      {/* bail conditions - keys */}
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
                    <Img
                      className={`img-fluid slide-from-right ${progress > 0 ? 'active' : ''}`}
                      fluid={slides[2].slideImage ? 
                        slides[2].slideImage.fluid : null}
                    />
                  </Col>
                </Row>
              </Container>
            </div>
          )
        }}
      </Scene>

      {/*  bail conditions - text */}
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
                      {slides[2].heading}
                    </h1>
                    <RichText json={slides[2].story.json} />
                  </Col>
                </Row>
              </Container>
            </div>
          )
        }}
      </Scene>


      {/* working extra shift */}
      <Scene
        // indicators={true}
        triggerHook={0}
        duration={"80%"}
        pin
      >
        {(progress, event) => {
          return (
            <div className={`vh-100`}>
              <Container className={`h-100`}>
                <Row className="h-100 d-flex justify-content-center align-items-center text-white">
                  <Col lg="7" className="text-left">
                    <h1>
                      {slides[3].heading}
                    </h1>
                    <RichText json={slides[3].story.json} />
                    <div className="d-flex mt-5 justify-content-center">
                      <div className={`d-inline-block slide-from-bottom ${progress > .1 ? 'active' : ''}`}>
                        <Button
                          onClick={() => showModal(
                            {
                              title: slides[3].modalButtons[0].heading,
                              json: slides[3].modalButtons[0].content.json,
                              fluid: slides[3].modalButtons[0].image ?
                                slides[3].modalButtons[0].image.fluid : null
                            }
                          )}
                          className={`text-uppercase btn-stories btn-rotate-right text-white py-2 mr-3`} variant="pink"
                        >
                          <span>{slides[3].modalButtons[0].buttonLabel}</span>
                        </Button>
                      </div>
                      <div className={`d-inline-block slide-from-bottom ${progress > .1 ? 'active' : ''}`}>
                        <Button
                          onClick={() => showModal(
                            {
                              title: slides[3].modalButtons[1].heading,
                              json: slides[3].modalButtons[1].content.json,
                              fluid: slides[3].modalButtons[1].image ?
                                slides[3].modalButtons[1].image.fluid : null
                            }
                          )}
                          className={`text-uppercase btn-stories btn-rotate-left text-white py-2 mr-3`} variant="pink"
                        >
                          <span>{slides[3].modalButtons[1].buttonLabel}</span>
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
                  <Col className="text-center h-100 w-100 d-flex justify-content-center align-items-center col-3">
                    <Img
                      className={`w-100 ${progress > 0 ? 'active' : ''}`}
                      fluid={slides[4].slideImage ? 
                        slides[4].slideImage.fluid : null}
                    />
                  </Col>
                  <Col className="text-left d-flex flex-column justify-content-center">
                    <h1>
                      {slides[4].heading}
                    </h1>
                    <RichText json={slides[4].story.json} />
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
                <Row className="h-100 d-flex justify-content-center align-items-center text-white">
                  <Col lg="10">
                    <h1>
                      {slides[5].heading}
                    </h1>
                    <RichText json={slides[5].story.json} />
                  </Col>
                </Row>
              </Container>
            </div>
          )
        }}
      </Scene >
    </Controller >
  )
}

export default GeorgeComponent