import React from "react"
import "intersection-observer"
import Layout from "../components/layout"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"
import Head from "../components/head"
import NarrativeComponent from "../components/narrative-body"
import "./narrative.scss"

const NarrativePage = () => {
  return (
    <Layout>
      <Head title="Narrative" />
      <StaticQuery
          query={graphql`
            query {
              intro_bg: file(relativePath: { eq: "images/intro_bg.jpg" }) {
                childImageSharp {
                  fluid(maxWidth: 2000) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          `}
          render={data => {
            return (
              <div className="narrative-intro-background">
                  <Img fluid={data.intro_bg.childImageSharp.fluid} height="80vh" />
              </div> 
            )
          }}
        />
      <NarrativeComponent />
    </Layout>
  )
}

export default NarrativePage