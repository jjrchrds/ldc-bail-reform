import React, { useState, useRef } from "react"
import { graphql } from "gatsby"
import { Scene } from 'react-scrollmagic';
import { Container, Row, Col } from "react-bootstrap"


const NathanComponent = ({progress}) => {

  return (
    <div className={`vh-100 character-01`}>
      <Container className={`h-100`}>
        <Row className="h-100 d-flex align-items-center text-white">
          <img className={`bottom-locked opacity-0 ${ progress > .1 && progress < .9 ? 'opacity-1' : ''}`} src="http://placehold.it/500x500/"/>

          <Col md={{span: 6, offset: 6}}>
            <h1>Meet Nathan</h1>
            <p>test</p>

          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default NathanComponent