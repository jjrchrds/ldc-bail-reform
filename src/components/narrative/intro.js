import React, { Component } from "react"
import "intersection-observer"
// import Row from "react-bootstrap/Row"
// import Col from "react-bootstrap/Col"
// import Container from "react-bootstrap/Container"
// import Modal from "react-bootstrap/Modal"
// import Button from "react-bootstrap/Button"
// import { StaticQuery, graphql } from "gatsby"
// import { BLOCKS } from "@contentful/rich-text-types"
// import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

// const RichTextOptions = {
//   renderNode: {
//     [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
//   },
// }

class IntroNarrative extends Component {
  // querySlideContent = (query, slideNumber, queryType) => {
  //   switch (queryType) {
  //     case "heading":
  //       return query.filter(edge => edge.node.slideNumber === slideNumber)[0]
  //         .node.heading
  //     case "body":
  //       return documentToReactComponents(
  //         query.filter(edge => edge.node.slideNumber === slideNumber)[0].node
  //           .story.json,
  //         RichTextOptions
  //       )
  //     case "image":
  //       return query.filter(edge => edge.node.slideNumber === slideNumber)[0]
  //         .node.slideImage.fluid.src
  //   }
  // }

  // queryModalContent = (query, id, queryType) => {
  //   switch (queryType) {
  //     case "heading":
  //       return query.filter(edge => edge.node.modalId === id)[0].node.heading
  //     case "body":
  //       return documentToReactComponents(
  //         query.filter(edge => edge.node.modalId === id)[0].node.content.json,
  //         RichTextOptions
  //       )
  //     case "image":
  //       return query.filter(edge => edge.node.modalId === id)[0].node.image
  //         .fluid.src
  //   }
  // }

  // scrollHeight = () => {
  //   return {
  //     height: "100vh",
  //   }
  // }

  render() {
    return (
      <div id="narrative-intro" className="narrative-step">
        <div className="fixed-content">
          <h1 className="main-heading">LOREM IPSUM DOLOR SIT AMET</h1>
          <p className="kicker">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
            commodo at rhoncus, vitae. Consequat, condimentum convallis nisl
            hac. Et a, sed suscipit egestas fringilla. Eu non tristique facilisi
            fringilla facilisi arcu urna sociis nibh.
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
        </div>
      </div>
    )
  }
}

export default IntroNarrative
