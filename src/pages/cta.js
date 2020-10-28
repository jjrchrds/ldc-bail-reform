import React from "react";
import { Jumbotron, Row, Col, Container } from "react-bootstrap";
import { useStaticQuery, graphql, Link } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Img from "gatsby-image"

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
            description
            file {
              url
            }
            fluid(quality:100, maxWidth:1000) {
              ...GatsbyContentfulFluid
            }
          }
          dualCollageTitle
          collage2 {
            description
            file {
              url
            }
            fluid(quality:100, maxWidth:1000) {
              ...GatsbyContentfulFluid
            }
          }
          collage2text {
            json
          }
          collage3 {
            description
            file {
              url
            }
            fluid(quality:100, maxWidth:1000) {
              ...GatsbyContentfulFluid
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

      <Jumbotron fluid className="justify-content-center pt-5 pb-0 bg-dark">
        <Row className="justify-content-center text-light my-5 pt-4">
          <Col className="text-center">
            <h1 className="green-label uppercase">{content.title}</h1>
          </Col>
        </Row>

        <Row className="justify-content-center text-light mt-3 pb-4">
          <Col xs="11" sm="8" lg="9" xl="6">
            {documentToReactComponents(content.introText.json)}
          </Col>
        </Row>
      </Jumbotron>

      <Row className="justify-content-center mx-0 pt-5 pb-5 pl-4 pr-4 bg-rust">
        <Col className="mb-2 pt-4 pb-4 crooked-box" xs="11" lg="10" xl="7">
          <h2 className="text-center uppercase text-pink">{content.section2Title}</h2>
          {documentToReactComponents(content.section2Content1.json)}
          <h3 className="text-center text-rust mt-5 mb-1">{content.section2Subtitle}</h3>
          {documentToReactComponents(content.section2Content2.json)}
        </Col>
      </Row>

      <Container className="pb-5 mb-5">
        <Row className="justify-content-center my-5">
          <Col xl="10">
            <h2 className="text-center text-rust uppercase mb-4">{content.section3Title}</h2>
            <div className="mb-4">{documentToReactComponents(content.collage1text.json)}</div>
            <a href={content.collage1.file.url} target="_blank">
              <Img fluid={content.collage1.fluid} alt={content.collage1.description}/>
            </a>
          </Col>
        </Row>

        <Row className="justify-content-center my-5">
          <Col xl="10">
            <p className="text-rust display-4">{content.dualCollageTitle}</p>
            <Row>
              <Col xs="12" md="6">
                {documentToReactComponents(content.collage2text.json)}
                <Img fluid={content.collage2.fluid} alt={content.collage2.description}/>
              </Col>
              <Col xs="12" md="6">
                {documentToReactComponents(content.collage3text.json)}
                <Img fluid={content.collage3.fluid} alt={content.collage3.description}/>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="justify-content-center mt-5 mb-2">
          <Col xl="10">
            <p className="text-rust display-4">{content.section4Title1}</p>
            {documentToReactComponents(content.section4Part1.json)}
          </Col>
        </Row>

        <Row className="justify-content-center mt-3 mb-4">
          <Col xl="8" lg="10">
            <h3 className="text-green text-center" style={{lineHeight: "1"}}>{content.section4BigTitle}</h3>
          </Col>
        </Row>

        <Row className="justify-content-center my-3">
          <Col xl="10">
            <p className="text-rust display-4">{content.section4Title2}</p>
            {documentToReactComponents(content.section4Part2.json)}
          </Col>
        </Row>

        <Row className="justify-content-center my-3">
          <Col xl="10">
            <p className="text-rust display-4">{content.section4Title3}</p>
            {documentToReactComponents(content.section4Part3.json)}
          </Col>
        </Row>

        <Row className="justify-content-center my-3">
          <Col xl="10">
            {documentToReactComponents(content.section4Part4.json)}
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default CTA;