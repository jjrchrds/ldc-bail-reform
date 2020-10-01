import React from "react"
import { Row, Col } from "react-bootstrap"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Head from '../components/head'
import IssuesHero from "../components/issues-hero"
import MomentumTabs from "../components/issues-momentum"
import ExplSecond from "../components/issues-expl-second"

const Issue2Page = () => {
  const data = useStaticQuery(graphql `
    query {
      issue2: file(relativePath: { eq: "images/issue2.jpg" }) {
        childImageSharp {
          fluid(quality: 75, maxWidth: 600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <Head title="Issues"/>
      <IssuesHero issueName="Denying Dignity and Basic Rights" issueImg={ data.issue2.childImageSharp.fluid } link1="/issue2#momentum" link2="/issue2#opportunity" link3="/issue2#explanation" />

      <Row id="momentum" className="justify-content-center mx-0 pt-5 bg-light">
        <Col className="mb-2" md="10" lg="8">
          <h2 className="text-center uppercase">Momentum</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris feugiat orci vel justo semper varius. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam fermentum, massa ut molestie venenatis, justo nibh laoreet risus, at imperdiet nisl purus sed augue.</p>
        </Col>
      </Row>

      <Row className="justify-content-center mx-0 pb-5 bg-light">
        <Col md="12" lg="10">
          <MomentumTabs />
        </Col>
      </Row>

      <Row id="opportunity" className="justify-content-center mx-0 pt-5 pb-5 pl-4 pr-4 bg-rust">
        <Col className="mb-2 pt-4 pb-4 crooked-box" md="10" lg="8">
          <h2 className="text-center uppercase text-pink">Opportunity</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris feugiat orci vel justo semper varius. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam fermentum, massa ut molestie venenatis, justo nibh laoreet risus, at imperdiet nisl purus sed augue.</p>
        </Col>
      </Row>

      <Row id="explanation" className="justify-content-center mx-0">
        <Col className="mt-5 mb-5" md="10">
          <h2 className="text-center uppercase text-rust">Explorable Explanation</h2>
          <ExplSecond></ExplSecond>
        </Col>
      </Row>
    </Layout>
  )
}

export default Issue2Page