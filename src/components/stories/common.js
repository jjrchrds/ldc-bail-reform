import React from 'react'
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"

const RichTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
  },
}

export const pinDuration = 200;
export const TEXT_TRIGGER_HOOK = .2

//used to get info from query 
export const querySlideContent = (query, slideNumber, queryType) => {
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

