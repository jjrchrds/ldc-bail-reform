import React from "react"
import { Modal } from "react-bootstrap"
import "./turn-device-modal.scss"
import turnPhoneLandscape from "../../static/assets/system-map/turnPhone_landscape.png"
import turnPhonePortrait from "../../static/assets/system-map/turnPhone_portrait.png"

const TurnDeviceModal = props => {
  if (props.orientationBlocked === "landscape") {
  } else if (props.orientationBlocked === "portrait") {
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      className="turn-device-modal"
      size="sm"
    >
      <Modal.Header>
        <Modal.Title>View in landscape mode only</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{`This page isn't optimized for ${props.orientationBlocked} mobile view.`}</p>
        <p>{`Please turn your device to access ${props.orientationGood} mode.`}</p>
        <div className="turn-device-img-wrapper">
          <img
            id="turn-device-img"
            src={
              props.orientationGood === "landscape"
                ? turnPhoneLandscape
                : turnPhonePortrait
            }
            style={{}}
          ></img>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default TurnDeviceModal
