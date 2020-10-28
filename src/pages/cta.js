import React from "react";
import { Container } from "react-bootstrap";
import { useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import Head from '../components/head';

const CTA = () => {
  const data = useStaticQuery(graphql`
    query {
      betaContent: allContentfulAboutTheBetaTemplate {
        nodes {
          title
          introText {
            json
          }
          section2Title
          section2Subtitle
          section2Content1 {
            json
          }
          section2Content2 {
            json
          }
          section3Title
          collage1text {
            json
          }
          collage1 {
            fluid(quality:100, maxWidth:1000) {
              src
            }
          }
          dualCollageTitle
          collage2 {
            fluid(quality:100, maxWidth:1000) {
              src
            }
          }
          collage2text {
            json
          }
          collage3 {
            fluid(quality:100, maxWidth:1000) {
              src
            }
          }
          collage3text {
            json
          }
          section4Title1
          section4Part1 {
            json
          }
          section4BigTitle
          section4Title2
          section4Part2 {
            json
          }
          section4Title3
          section4Part3 {
            json
          }
          section4Part4 {
            json
          }
        }
      }
    }
  `)
  
  const content = data.betaContent.nodes[0];
  
  return (
    <Layout>
      <Head title="About the Beta"/>

      <Container className="mt-5">
        <h1 className="text-center">{content.title}</h1>
        <p className="text-center">Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p>
      </Container>
    </Layout>
  )
}

export default CTA;