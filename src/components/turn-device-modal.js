import React from "react"
import { Modal } from "react-bootstrap"
import "./turn-device-modal.scss"
import turnPhoneImg from "../../static/assets/system-map/turnPhone.png"

const TurnDeviceModal = props => {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      className="turn-device-modal"
    >
      <Modal.Header>
        <Modal.Title>View in landscape mode only</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>This page isn't optimized for portrait mobile view.</p>
        <p>Please turn your device to access landscape mode.</p>
        <img src={turnPhoneImg} style={{}}></img>
      </Modal.Body>
    </Modal>
  )
}

export default TurnDeviceModal
