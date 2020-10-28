import React from "react"
import { Button, Modal } from "react-bootstrap"
import { Link } from "gatsby"

class HomeModal extends React.Component {

  render(){
    return (
      <Modal 
        show={this.props.show}
        onHide={this.props.handleClose} 
        backdrop={false}
        enforceFocus={false}
        className="beta-sticker text-light">
        <Modal.Header closeButton>
          <Modal.Title><h2>{this.props.heading}</h2></Modal.Title>
        </Modal.Header>

        <Modal.Body >
          <p className="display-4">{this.props.body}</p>
        </Modal.Body>

        <Modal.Footer className="justify-content-center">
          <Button as={Link} to="/cta" variant="pink" className="text-light">
            <h4 className="uppercase">{this.props.button}</h4>
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default HomeModal