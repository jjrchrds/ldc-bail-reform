import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Modal, Button, Row, Col } from "react-bootstrap"
import Img from "gatsby-image"
import "./static-modal.scss"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import useDeviceDetect from "../useDeviceDetect"
import NoMobile from "../NoMobile"

// const StaticModal = ({data}) => {
const StaticModal = props => {
  // https://www.gatsbyjs.org/docs/use-static-query/

  const data = useStaticQuery(
    graphql`
      query StaticModalQuery {
        allContentfulSystemMapStageDetail {
          edges {
            node {
              stageId
              title
              characters {
                characterInitial
              }
              stageContent {
                json
              }
              stageImage {
                title
                fluid(maxHeight: 600) {
                  ...GatsbyContentfulFluid
                }
              }
              stageFootnote
            }
          }
        }
      }
    `
  )

  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        const alt = node.data.target.fields.title["en-US"]
        const url = node.data.target.fields.file["en-US"].url
        console.log(node)
        return <img src={url} className="img-fluid mb-3" alt={alt} />
      },
    },
    renderText: text =>
      text.split("\n").flatMap((text, i) => [i > 0 && <br />, text]),
  }

  //based on the prop activeContent, let modalContent = the node with a matching id
  let modalContent = data.allContentfulSystemMapStageDetail.edges.find(
    obj => obj.node.stageId === props.activeContent
  )

  // let modalPosition = `${(window.innerHeight - 450) / 2}px`

  const { isMobile } = useDeviceDetect();

  function displayModalImage(isMobile) {
    if (isMobile) {
      return <div></div>;
    } else {
      return <Col md="4"><Img fluid={modalContent.node.stageImage.fluid}/></Col>;
    }
  }

  if (modalContent) {
    return (
      <Modal
        show={props.show}
        onHide={props.onHide}
        id="modalStatic"
        size="lg"
        // style={{top: modalPosition }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalContent.node.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
              {displayModalImage(isMobile)}
            <Col>
              <p className="static-modal__subtitle">Who's involved</p>
              {modalContent.node.characters.map(character => (
                <div className="static-modal__id">
                  {character.characterInitial}
                </div>
              ))}
              {/* <div className="static-modal__id">{modalContent.node.characters[0].characterInitial}</div>
              <div className="static-modal__id">P</div> */}
              <p className="static-modal__subtitle">What's happening</p>
              {documentToReactComponents(
                modalContent.node.stageContent.json,
                options
              )}
            </Col>
          </Row>
          <Row>
            <div className="static-modal__footnote">{modalContent.node.stageFootnote}</div>
          </Row>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    )
  } else {
    return <div></div>
  }
}

export default StaticModal
