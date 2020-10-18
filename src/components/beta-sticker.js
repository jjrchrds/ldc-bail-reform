import React from "react"
import { Button, Modal } from "react-bootstrap"
import { Link } from "gatsby"

class BetaSticker extends React.Component {

  render(){
    return (
      <Modal 
        show={this.props.show}
        onHide={this.props.handleClose} 
        backdrop={false}
        className="beta-sticker text-light">
        <Modal.Header closeButton>
          <Modal.Title><h2>This is a beta!</h2></Modal.Title>
        </Modal.Header>

        <Modal.Body >
          <p className="display-4">We'd love your feedback, lorem ipsum dolor sit amet.</p>
        </Modal.Body>

        <Modal.Footer className="justify-content-center">
          <Button as={Link} to="/cta" variant="pink" className="text-light">
            <h4 className="uppercase">Get in Touch</h4>
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default BetaSticker