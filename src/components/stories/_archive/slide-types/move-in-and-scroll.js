import React from 'react'
import { Container, Row, Col } from "react-bootstrap"
import { Controller, Scene } from 'react-scrollmagic';


//component for slide where an image appears 
//upon enter, and slides up with text after text-pin duration

const MoveInAndScrollSlide = ({
  pinDuration = 200,
  textEl,
  imgEl
}) => (
    <Controller>
      <Scene
        indicators={true}
        triggerHook={0}
        // will need to perhaps re-render component on window 
        //height change - resize event - and vbl that stores corruent 
        //height - will need to further look into this 
        duration={Math.round(window.innerHeight / 2) + pinDuration}
        // offset={"150px"}
        pinSettings={{ pushFollowers: false }}
        pin
      >
        {(progress, event) => {
          return (
            <div
              // style={{ marginBottom: '150px' }}
              className={`vh-100 character-01`}>
              <Container className={`h-100`}>
                <Row className="h-100 d-flex align-items-center text-white">
                  <Col className="text-center">
                   {imgEl}
                  </Col>
                </Row>
              </Container>
            </div>
          )
        }}
      </Scene>
      <Scene 
          indicators={true}
          // triggerHook={0} 
          // offset={"-150px"}
          duration={pinDuration} 
          // pinSettings={{pushFollowers: false}}
          pin
        >
          {(progress, event) => {
            return (
            <div className={`character-01`}>
              <Container 
              // className={`h-100`}
              >
                <Row className="justify-content-center text-white">
                  <Col className="text-left">
                    {textEl}
                  </Col>
                </Row>
              </Container>
            </div>
          )}}
        </Scene>
    </Controller>
  );

  export default MoveInAndScrollSlide;