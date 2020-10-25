import React from 'react';
import { Controller, Scene } from 'react-scrollmagic'
import { Container, Row, Col } from "react-bootstrap"

const IntroStories = () => (
    <Controller>
        <Scene
            triggerHook={0}
            duration={1}
            pin
        >
            <div className="vh-100 bg-dark text-white">
                <Container className="h-100">
                    <Row className="h-100 d-flex align-items-center">
                        <h1>test</h1>
                    </Row>
                </Container>
            </div>
        </Scene>
    </Controller>
);

export default IntroStories;
