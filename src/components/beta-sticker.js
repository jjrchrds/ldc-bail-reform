import React from "react"
import { Button, Modal, Row, Col } from "react-bootstrap"
import { Link } from "gatsby"

class BetaSticker extends React.Component {
  render(){
    return (
      <Modal className="beta-sticker text-light bg-green">
        <h3>This is a beta!</h3>
        <p>We'd love your feedback, lorem ipsum dolor sit amet.</p>
        <Button as={Link} to="/cta" className="bg-pink">
          <h4>Get in Touch</h4>
        </Button>
      </Modal>
    )
  }
}

export default BetaSticker