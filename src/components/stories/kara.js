import React, { useState, useRef } from "react"
import { graphql } from "gatsby"
import { Controller, Scene } from 'react-scrollmagic';
import { Container, Row, Col, Button, Card} from "react-bootstrap"


const KaraComponent = () => {

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
              <Container className={`h-100 position-relative`}>
                <Row className="h-100 d-flex align-items-end text-white">
                  <Col lg={{span: 6, offset: 6}}>
                    <img className={`img-fluid bottom-locked opacity-0 ${ progress < .9 ? 'opacity-1' : ''}`} src="http://placehold.it/500x600/"/>
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
          pin
        >
          {(progress, event) => {
            return (
            <div className={`vh-100 character-01`}>
              <Container className={`h-100`}>
                <Row className="h-100 d-flex align-items-center text-white">
                  <Col md={{span: 6, offset: 0}}>
                    <h1>Meet Kara</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis sint cupiditate laboriosam nostrum, ad itaque consectetur dolores nemo quod reiciendis dolor voluptas placeat quaerat incidunt consequuntur non cum ullam eum.</p>
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
                <Row className="h-100 d-flex justify-content-center align-items-center">
                  <Col lg="10" className="text-left">
                    <Row className="d-flex justify-content-between mt-5">
                      <Col className={`opacity-0 slide-from-top ${ progress > .15 ? 'active opacity-1' : ''}`}>
                        
                        <Card>
                          <Card.Body className="px-3 py-2">
                            <p className="mb-0">Jason M.</p>
                            <p className="mb-0">905-555-2323</p>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col className={`opacity-0 slide-from-top ${ progress > .25 ? 'active opacity-1' : ''}`}>
                        <Card>
                          <Card.Body className="px-3 py-2">
                            <p className="mb-0">Jason M.</p>
                            <p className="mb-0">905-555-2323</p>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col className={`opacity-0 slide-from-top ${ progress > .35 ? 'active opacity-1' : ''}`}>
                        <Card>
                          <Card.Body className="px-3 py-2">
                            <p className="mb-0">Jason M.</p>
                            <p className="mb-0">905-555-2323</p>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                    <div className="text-white mt-5">
                      <h1>Contacting Family</h1>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>
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
          duration={"50%"} 
          pin
        >
          {(progress, event) => {
            return (
            <div className={`vh-100 character-01`}>
              <Container className={`h-100`}>
                <Row className="h-100 d-flex justify-content-center align-items-center text-white">
                  <Col lg="7" className="text-left">
                    <h1>Family or money?</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>
                    <div className="text-center mt-5">
                      <Button className="text-uppercase btn-stories btn-rotate-right text-white py-2 mr-3" variant="pink">
                        <span>Buy Landline</span>
                      </Button>
                      <Button className="text-uppercase btn-stories btn-rotate-left text-white py-2" variant="pink">
                        <span>Call Amy</span>
                      </Button>
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
                    <h1>Phone Call</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>

                  </Col>
                </Row>
              </Container>
            </div>
          )}}
        </Scene>

        
    </Controller>
  )
}

export default KaraComponent