import React, { Component } from "react"
import "intersection-observer"
// import Row from "react-bootstrap/Row"
// import Col from "react-bootstrap/Col"
// import Container from "react-bootstrap/Container"
// import Modal from "react-bootstrap/Modal"
// import Button from "react-bootstrap/Button"
// import { StaticQuery, graphql } from "gatsby"
import { BLOCKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Link } from "gatsby"


const RichTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
  },
}

class EndingNarrative extends Component {
  state = {
    nathanModal2: false,
    nathanModal1: false,
  }

  handleNathanModal1Show = () => {
    this.setState({
      nathanModal1: true,
    })
  }

  handleNathanModal2Show = () => {
    this.setState({
      nathanModal2: true,
    })
  }

  handleModalClose = () => {
    this.setState({
      nathanModal2: false,
      nathanModal1: false,
    })
  }

  querySlideContent = (query, slideNumber, queryType) => {
    switch (queryType) {
      case "heading":
        return query.filter(edge => edge.node.slideNumber === slideNumber)[0]
          .node.heading
      case "body":
        return documentToReactComponents(
          query.filter(edge => edge.node.slideNumber === slideNumber)[0].node
            .story.json,
          RichTextOptions
        )
      case "image":
        return query.filter(edge => edge.node.slideNumber === slideNumber)[0]
          .node.slideImage.fluid.src
      default:
          //no default
    }
  }

  queryModalContent = (query, id, queryType) => {
    switch (queryType) {
      case "heading":
        return query.filter(edge => edge.node.modalId === id)[0].node.heading
      case "body":
        return documentToReactComponents(
          query.filter(edge => edge.node.modalId === id)[0].node.content.json,
          RichTextOptions
        )
      case "image":
        return query.filter(edge => edge.node.modalId === id)[0].node.image
          .fluid.src
      default:
          //no default
    }
  }

  scrollHeight = () => {
    return {
      height: "100vh",
    }
  }

  render() {
    // const { nathanModal1, nathanModal2 } = this.state

    // var nathan1Style = () => {
    //   console.log(this.props.allContentfulNarrativePageTemplatestep)
    //   if (this.props.step <= 1) {
    //     return {
    //       position: "sticky",
    //       top: 0,
    //     }
    //   } else {
    //     return {
    //       position: "relative",
    //     }
    //   }
    // }

    return (
      <div id="narrative-ending" className="narrative-step">
        <div className="fixed-content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. A ornare
            eleifend a aliquet id est et. Sapien amet integer mollis enim dui
            facilisi urna. Volutpat etiam vitae eu, habitant facilisis purus
            suscipit. Amet massa mauris, augue praesent nunc. Morbi consequat
            volutpat, in id purus, eget proin fames. Magna semper bibendum
            semper pellentesque nibh mattis scelerisque semper. Phasellus
            egestas phasellus justo.
          </p>
          <h2 className="call-to-action">keep exploring!</h2>
          <div className="action-buttons">
            <Link to="/system-map">SYSTEM MAP</Link>
            <Link to="">THEMES</Link>
          </div>
        </div>
        </div>
    )
  }
}

export default EndingNarrative
