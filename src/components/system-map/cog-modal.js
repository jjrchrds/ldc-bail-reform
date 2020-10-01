import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Container, Modal, Row, Col } from "react-bootstrap"
import Img from "gatsby-image"
import "./cog-modal.scss"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const CogModal = props => {
  // Change!
  const data = useStaticQuery(
    graphql`
      query CogModalQuery {
        allContentfulSystemMapCogDetail {
          edges {
            node {
              cogId
              cogImage {
                fluid(maxWidth: 50, maxHeight: 50) {
                  ...GatsbyContentfulFluid
                }
              }
              title
              characters {
                characterInitial
              }
              cogHow {
                json
              }
              cogWhat {
                json
              }
            }
          }
        }
      }
    `
  )

  let modalPosition

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
  let modalContent = data.allContentfulSystemMapCogDetail.edges.find(
    obj => obj.node.cogId === props.activeContent
  )

  if (modalContent) {
    return (
      <Modal
        show={props.show}
        onHide={props.onHide}
        id="modal-cog"
        size="lg"
        centered
      >
        <Modal.Header>
          <Img
            className="modal-header-icon mr-2"
            fluid={modalContent.node.cogImage.fluid}
          />
          <Modal.Title>{modalContent.node.title}</Modal.Title>
          <div className="modal-header-icons ml-auto">
            {modalContent.node.characters.map(character => (
              <div className="cog-modal__id">{character.characterInitial}</div>
            ))}
          </div>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className="cog-modal__what">
              <p className="cog-modal__subtitle">What’s being decided:</p>
              {documentToReactComponents(
                modalContent.node.cogWhat.json,
                options
              )}
            </Col>
            <Col className="cog-modal__how">
              <p className="cog-modal__subtitle">How’s it being decided?</p>
              {documentToReactComponents(
                modalContent.node.cogHow.json,
                options
              )}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    )
  } else {
    return <div></div>
  }
}

export default CogModal
