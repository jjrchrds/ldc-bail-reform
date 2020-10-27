import React from "react"
import "./issues-expl-sidebar.scss"
import { useStaticQuery, graphql, StaticQuery } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const ExplSidebar = props => {
  // Options for displaying text in the sidebar
  console.log(props.issue_id)
  let options = {
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

  return (
  
    <StaticQuery
      query={graphql`
        query {
          allContentfulIssuesEeText(
            sort: { fields: [stepId] }
          ) {
            edges {
              node {
                issueId
                stepId
                stepText {
                  json
                }
              }
            }
          }
        }
      `}
      render={data =>
        data.allContentfulIssuesEeText.edges.map(edge => {
          if (edge.node.issueId === props.issue_id) {
            return (
              <div
                id={"ee-text-" + edge.node.stepId}
                className={
                  edge.node.stepId < props.firstStepChange
                    ? "text-layer-1"
                    : edge.node.stepId < 6
                    ? "text-layer-2"
                    : edge.node.stepId < 8
                    ? "text-layer-3"
                    : "text-layer-4"
                }
              >
                {documentToReactComponents(edge.node.stepText.json, options)}
              </div>
            )
          }
        })
      }
    />
  )
}

export default ExplSidebar
