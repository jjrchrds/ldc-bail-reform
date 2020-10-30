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
              }
            }
          }
        }
      }
    }`
  )

  const slides = data.allContentfulNarrativePageBackground.edges[0].node.slides

  console.log('georgeslides', slides)

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
                      {slides[3].heading}
                    </h1>
                    <RichText json={slides[3].story.json}/>
                    <div className="d-flex justify-content-center">
                      <div className={`d-inline-block slide-from-bottom ${progress > .1 ? 'active' : ''}`}>
                        <Button
                          onClick={() => showModal(
                            {
                              title: slides[3].modalButtons[0].heading,
                              json: slides[3].modalButtons[0].content.json,
                              fluid: slides[3].modalButtons[0].image.fluid
                            }
                          )}
                          className={`text-uppercase btn-stories btn-rotate-right text-white py-2 mr-3`} variant="pink"
                        >
                          <span>Work</span>
                        </Button>
                      </div>
                      <div className={`d-inline-block slide-from-bottom ${progress > .1 ? 'active' : ''}`}>
                        <Button
                          onClick={() => showModal(
                            {
                              title: slides[3].modalButtons[1].heading,
                              json: slides[3].modalButtons[1].content.json,
                              fluid: slides[3].modalButtons[1].image.fluid
                            }
                          )}
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
                <Row className="h-100 d-flex align-items-center text-white">
                  <Col>
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