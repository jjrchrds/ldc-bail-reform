import React, { useState } from 'react';
import { Controller, Scene } from 'react-scrollmagic';
import { Container, Row, Col } from "react-bootstrap"
import { pinDuration } from './common'


const NathanStories = () => {
  const [policeCarImgProgress, setPoliceCarImgProgress] = useState()
  const [policeStnChoiceTxtProgress, setPoliceStnChoiceTxtProgress] = 
    useState()
  const [policeStnTxtProgress, setPoliceStnTxtProgress] = 
    useState()

  return (
    <>
      {/* meet nathan */}
      <Controller>
        <Scene
          indicators={true}
          triggerHook={0}
          // duration={"150%"} 
          pinSettings={{ pushFollowers: false }}
          pin
        >
          {(progress, event) => {
            return (
              <div className={`vh-100 character-01`}>
                <Container className={`h-100`}>
                  <Row className="h-100 text-white">
                    {/* <div className="fixed-bottom">{}</div> */}
                    <img
                      className={`${policeCarImgProgress > 0 ? 'opacity-0' : ''}`}
                      // className={`bottom-locked opacity-0 ${ progress < .9 ? 'opacity-1' : ''}`} 
                      src="http://placehold.it/500x500/" />
                  </Row>
                </Container>
              </div>
            )
          }}
        </Scene>
        <Scene
          indicators={true}
          // triggerHook={-1} 
          duration={pinDuration}
          // pinSettings={{pushFollowers: false}}
          pin
        // offset={-600}
        >
          {(progress, event) => {
            return (
              <div className={`character-01`}>
                <Container
                // className={`h-100`}
                >
                  <Row className="text-white">
                    <Col md={{ span: 6, offset: 6 }}>
                      <h1>Meet Nathan</h1>
                      <p>test</p>
                    </Col>
                  </Row>
                </Container>
              </div>
            )
          }}
        </Scene>
      </Controller>

      {/* arrest */}
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
            setPoliceCarImgProgress(progress)

            return (
              <div
                // style={{ marginBottom: '150px' }}
                className={`vh-100 character-01`}>
                <Container className={`h-100`}>
                  <Row className="h-100 d-flex align-items-center text-white">
                    <Col className="text-center">
                      <img
                        style={{ marginTop: '-150px' }}
                        className={
                          `slide-from-left ${progress > 0 ? 'active' : ''}` 
                        }
                        src="http://placehold.it/500x300/"
                      />
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
                      <h1>Arrest</h1>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>
                    </Col>
                  </Row>
                </Container>
              </div>
            )
          }}
        </Scene >
      </Controller >

      {/* the police station */}
      <Controller>
        <Scene
          indicators={true}
          triggerHook={0}
          // will need to perhaps re-render component on window 
          //height change - resize event - and vbl that stores corruent 
          //height - will need to further look into this 
          // duration={Math.round(window.innerHeight / 2) + pinDuration}
          // offset={"150px"}
          pinSettings={{ pushFollowers: false }}
          pin
        >
          {(progress, event) => {
            return (
              <div
                // style={{ marginBottom: '150px' }}
                className={`vh-100 character-01`}>
                <Container className={`h-100 ${policeStnChoiceTxtProgress > 0 ? 'opacity-0' : ''}`}
            >
                  <Row className="h-100 text-white">
                    <Col className="text-center col-6 position-relative h-100 d-flex align-items-center">
                      <img
                        className={`slide-from-right ${progress > 0 ? 'active' : ''}`}
                        src="http://placehold.it/500x500/"
                      />
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
            setPoliceStnTxtProgress(progress)

            return (
              <div className={`character-01`}>
                <Container
                style={{ paddingBottom: "100vh" }}
                >
                  <Row className="text-white">
                    <Col className="text-left col-6 offset-6" >
                      <h1>The Police Station</h1>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>
                    </Col>
                  </Row>
                </Container>
              </div>
            )
          }}
        </Scene >
      </Controller >

       {/* the police station - choice */}
       {/* <Controller>
        <Scene
          indicators={true}
          // triggerHook={1} 
          offset={"-50vh"}
          duration={pinDuration}
          // pinSettings={{pushFollowers: false}}
          pin
        >
          {(progress, event) => {
            setPoliceStnChoiceTxtProgress(progress)
            return (
              <div className={`character-01`}>
                <Container
                // className={`h-100`}
                >
                  <Row className="text-white justify-content-center">
                    <Col className="text-left col-10" >
                      <h1>The Police Station - Choice</h1>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>
                    </Col>
                  </Row>
                </Container>
              </div>
            )
          }}
        </Scene > 
        <Scene
          indicators={true}
          // triggerHook={0}
          pinSettings={{ pushFollowers: false }}
          pin
        >
          {(progress, event) => {
            return (
              <div
                // style={{ marginBottom: '150px' }}
                className={`vh-100 character-01`}>
                <Container className={`h-100`}>
                  <Row className="h-100 text-white">
                    <Col className="text-center col-6 position-relative h-100 d-flex align-items-center">
                      <img
                        className={`slide-from-right ${progress > 0 ? 'active' : ''}`}
                        src="http://placehold.it/500x300/"
                      />
                    </Col>
                  </Row>
                </Container>
              </div>
            )
          }}
        </Scene>
      </Controller > */}
    </>
  );
}

export default NathanStories;
