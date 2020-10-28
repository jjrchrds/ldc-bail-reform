import React, { useState, useRef } from "react"
import { graphql } from "gatsby"
import { Controller, Scene } from 'react-scrollmagic';
import { Container, Row, Col, Button} from "react-bootstrap"


const GeorgeComponent = () => {

  return (
    <Controller>
    {/* Nathan */}
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
                  <img className={`img-fluid bottom-locked opacity-0 ${ progress < .9 ? 'opacity-1' : ''}`} src="http://placehold.it/500x500/"/>
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
                  <Col md={{span: 6, offset: 6}}>
                    <h1>Meet Nathan</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis sint cupiditate laboriosam nostrum, ad itaque consectetur dolores nemo quod reiciendis dolor voluptas placeat quaerat incidunt consequuntur non cum ullam eum.</p>
                  </Col>
                </Row>
              </Container>
            </div>
          )}}
        </Scene>

        <Scene 
          indicators={true}
          triggerHook={-3} 
          duration={"50%"} 
          pinSettings={{pushFollowers: false}}
          pin
        >
          {(progress, event) => {
            return (
            <div className={`vh-100 character-01`}>
              <Container className={`h-100`}>
                <Row className="h-100 d-flex align-items-center text-white">
                  <Col className="text-center">
                    <img 
                      className={`img-fluid slide-from-left ${ progress > 0 ? 'active' : ''}`}
                      src="http://placehold.it/500x300/"
                    />
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
                    <h1>Arrest</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>

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
                  <Col className="text-center">
                    <img 
                      className={`ringing ${ progress >.1 ? 'active' : ''}`}
                      src="http://placehold.it/300x500/"
                    />
                  </Col>
                  <Col lg="7" className="text-left">
                    <h1>The Police Station</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>

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
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>
                    <div className="text-center mt-5">
                      <Button className={`text-uppercase btn-stories btn-rotate-right text-white py-2 mr-3 slide-from-bottom ${ progress > .1 ? 'active' : ''}`} variant="pink">
                        <span>Speak Up</span>
                      </Button>
                      <Button className={`text-uppercase btn-stories btn-rotate-left text-white py-2 slide-from-bottom ${ progress > .2 ? 'active' : ''}`} variant="pink">
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

export default GeorgeComponent