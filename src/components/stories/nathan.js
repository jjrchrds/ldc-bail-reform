import React, { useState, useRef } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Controller, Scene } from 'react-scrollmagic';
import { Container, Row, Col, Button} from "react-bootstrap"
import RichText from "./rich-text"
import Img from "gatsby-image"


const NathanComponent = ({handleShow, handleBg}) => {

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

  // console.log(slides[0].story);

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
                    <RichText json={slides[0].story.json}/>
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
          duration={"70%"} 
          pinSettings={{pushFollowers: false}}
          pin
        >
          {(progress, event) => {
            return (
            <div className={`vh-100 character-01`}>
              <Container className={`h-100`}>
                <Row className="h-100 d-flex align-items-center text-white">
                  <Col className="text-center">
                    <Img fluid={slides[1].slideImage.fluid } className={`d-inline-block w-50 slide-from-left ${ progress > .1 ? 'active' : ''}`}/>
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
                    <RichText json={slides[1].story.json}/>
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
                    <RichText json={slides[2].story.json}/>
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
                    <RichText json={slides[3].story.json}/>

                    <div className="text-center mt-5">
                      <div className={`d-inline-block slide-from-bottom ${ progress > .1 ? 'active' : ''}`}>
                        <Button 
                          onClick={() => showModal({title: 'Buy a landline', body: 'body test'})} 
                          className={`text-uppercase btn-stories btn-rotate-right text-white py-2 mr-3`} variant="pink">
                          <span>Speak Up</span>
                        </Button>
                      </div>
                      <div className={`d-inline-block slide-from-bottom ${ progress > .1 ? 'active' : ''}`}>

                        <Button 
                          onClick={showModal} 
                          className={`text-uppercase btn-stories btn-rotate-left text-white py-2`} variant="pink">
                          <span>Wait</span>
                        </Button>
                      </div>
                    </div>
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
            if ( event.scrollDirection === "FORWARD" && event.type === "leave") {
              // console.log(event.type);
              handleBg('kara');
            } else if ( event.scrollDirection === "REVERSE" && event.type ==="enter") {
              // console.log(event.type);
              handleBg('nathan');
            }

            return (
            <div className={`vh-100 character-01`}>
              <Container className={`h-100`}>
                <Row className="h-100 d-flex justify-content-center align-items-center text-white">
                  
                  <Col lg="6" className="text-left">
                    <h1>The Police Station</h1>
                    <RichText json={slides[4].story.json}/>
                  </Col>
                  
                  <Col lg="4" className="text-center">
                    <Img 
                      fluid={ slides[4].slideImage.fluid }
                      className={`${ progress >.1 ? 'active' : ''}`}
                    />
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