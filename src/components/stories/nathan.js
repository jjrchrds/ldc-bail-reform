import React, { useState, useRef } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Controller, Scene } from 'react-scrollmagic';
import { Container, Row, Col, Button} from "react-bootstrap"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Img from "gatsby-image"


const NathanComponent = ({handleShow}) => {

  const data = useStaticQuery(graphql`
    query {
      allContentfulNarrativePageBackground(filter: { pageTitle:{eq:"Nathan"}}) {
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
            }
          }
        }
      }
    }`
  )
  
  const slides = data.allContentfulNarrativePageBackground.edges[0].node.slides

  const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p className="align-center">{children}</p>

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
  },
}

  console.log(slides[0].story);

  const showModal = (data) => {
    handleShow(data);
  }
  return (
    <Controller>
      {/* Meet Nathan */}
      <Scene 
          // indicators={true}
          triggerHook={-.5} 
          duration={"150%"} 
          pinSettings={{pushFollowers: false}}
          pin
        >
          {(progress, event) => {
            return (
            <div className={`vh-100 character-01`}>
              <Container className={`h-100`}>
                <Row className="h-100 d-flex align-items-center text-white">
                  <Col className="h-100" md="6">
                    <div className="h-100 w-100 position-relative">
                      <Img fluid={slides[0].slideImage.fluid } className={`w-100 position-absolute bottom-locked opacity-0 ${ progress < .9 ? 'opacity-1' : ''}`}/>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          )}}
        </Scene>

        <Scene 
          // indicators={true}
          triggerHook={-1} 
          duration={"50%"} 
          pinSettings={{pushFollowers: false}}
          pin
        >
          {(progress, event) => {
            return (
            <div className={`vh-100 character-01`}>
              <Container className={`h-100`}>
                <Row className="h-100 d-flex align-items-center text-white">
                  <Col md={{span: 6, offset: 6}} className="mt-6">
                    <h1>{slides[0].heading}</h1>
                    {documentToReactComponents(slides[0].story.json, options) }
                  </Col>
                </Row>
              </Container>
            </div>
          )}}
        </Scene>
        
        {/* Arrest */}
        <Scene 
          indicators={true}
          triggerHook={-2} 
          duration={"60%"} 
          pinSettings={{pushFollowers: false}}
          pin
        >
          {(progress, event) => {
            return (
            <div className={`vh-100 character-01`}>
              <Container className={`h-100`}>
                <Row className="h-100 d-flex align-items-center text-white">
                  <Col className="text-center">
                    <Img fluid={slides[1].slideImage.fluid } className={`d-inline-block w-75 slide-from-left ${ progress > .1 ? 'active' : ''}`}/>
                  </Col>
                </Row>
              </Container>
            </div>
          )}}
        </Scene>

        <Scene 
          // indicators={true}
          triggerHook={0} 
          duration={"60%"} 
          pin
        >
          {(progress, event) => {
            return (
            <div className={`vh-100 character-01`}>
              <Container className={`h-100`}>
                <Row className="h-100 d-flex justify-content-center align-items-center text-white">
                  <Col lg="10" className="text-left">
                    <h1>{slides[1].heading}</h1>
                    {documentToReactComponents(slides[1].story.json, options) }
                  </Col>
                </Row>
              </Container>
            </div>
          )}}
        </Scene>
        
        {/* Police Station */}
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
                    <Img 
                      fluid={ slides[2].slideImage.fluid }
                      className={`w-75 ringing ${ progress >.1 ? 'active' : ''}`}
                    />
                    
                  </Col>
                  <Col lg="7" className="text-left">
                    <h1>The Police Station</h1>
                    {documentToReactComponents(slides[2].story.json, options) }
                  </Col>
                </Row>
              </Container>
            </div>
          )}}
        </Scene>

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
                  <Col lg="7" className="text-left">
                    <h1>The Police Station</h1>
                    {documentToReactComponents(slides[3].story.json, options) }
                    <div className="text-center mt-5">
                      <Button 
                        onClick={() => showModal({title: 'Buy a landline', body: 'body test'})} 
                        className={`text-uppercase btn-stories btn-rotate-right text-white py-2 mr-3 slide-from-bottom ${ progress > .1 ? 'active' : ''}`} variant="pink">
                        <span>Speak Up</span>
                      </Button>
                      <Button 
                        onClick={showModal} 
                        className={`text-uppercase btn-stories btn-rotate-left text-white py-2 slide-from-bottom ${ progress > .2 ? 'active' : ''}`} variant="pink">
                        <span>Wait</span>
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          )}}
        </Scene>
    </Controller>
  )
}

export default NathanComponent