import React, { Component } from "react"
import "intersection-observer"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"

class IntroNarrative extends Component {
  render() {
    const { backgroundImg } = this.props

    console.log(backgroundImg)

    return (
      <div id="narrative-intro" className="narrative-step intro-slide">
        {/* https://css-tricks.com/tinted-images-multiple-backgrounds/ 
         for gradient over background image effect */}
        <Container
          className="relative-content d-flex justify-content-center"
          style={{
            background: `linear-gradient(rgba(0,0,0,0),
      rgba(0,0,0,1)), url("${backgroundImg}")`,
          }}
        >
          <Row className="align-items-end">
            <Col className="d-flex flex-column justify-conent-center">
              <h1 className="main-heading">LOREM IPSUM DOLOR SIT AMET</h1>
              <p className="kicker">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
                commodo at rhoncus, vitae. Consequat, condimentum convallis nisl
                hac. Et a, sed suscipit egestas fringilla. Eu non tristique
                facilisi fringilla facilisi arcu urna sociis nibh.
              </p>
              <div className="scroll-down-instructions">
                <span className="action-text">Start scrolling</span>
                <svg
                  width="53"
                  height="33"
                  viewBox="0 0 53 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="scroll-down-icon"
                >
                  <path
                    d="M26.5858 23.7187L0 0V9.28125L26.5858 33L53 9.28125V0L26.5858 23.7187Z"
                    fill="#E5521D"
                  />
                </svg>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default IntroNarrative
