import React from "react"
import { Row, Col } from "react-bootstrap"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Head from '../components/head'
import IssuesHero from "../components/issues-hero"
import MomentumTabs from "../components/issues-momentum"

const Issue1Page = () => {
  const data = useStaticQuery(graphql `
    query {
      issue1: file(relativePath: { eq: "images/issue1.jpg" }) {
        childImageSharp {
          fluid(quality: 75, maxWidth: 600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      documents: allAirtable(
          filter: {
            data: { 
              Momentum_Theme: { in : "Theme 1 - Punish S&E Conditions" }
              Publish__or_Start_Date_: { ne: null }
              Momentum_Annotation: { ne: null }
            }
          }
        ) {
          nodes {
            data {
              Momentum_Theme
              Momentum_Tab
              Title
              Author_s_
              URL
              Publish__or_Start_Date_
              Momentum_Annotation
            }
          }
        }
    }
  `)

  return (
    <Layout>
      <Head title="Issues"/>
      <IssuesHero issueName="Worsening the Lives of Marginalized People" issueImg={ data.issue1.childImageSharp.fluid } link1="/issue1#momentum" link2="/issue1#opportunity" link3="/issue1#explanation" />

      <Row id="momentum" className="justify-content-center pt-5 px-4 bg-light">
        <Col className="mb-2" md="10" lg="8">
          <h2 className="text-center uppercase">Momentum</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris feugiat orci vel justo semper varius. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam fermentum, massa ut molestie venenatis, justo nibh laoreet risus, at imperdiet nisl purus sed augue.</p>
        </Col>
      </Row>

      <Row className="justify-content-center pb-5 px-5 bg-light">
        <Col>
          <MomentumTabs documents={ data.documents.nodes } />
        </Col>
      </Row>

      <Row id="opportunity" className="justify-content-center pt-5 pb-5 pl-4 pr-4 bg-rust">
        <Col className="mb-2 pt-4 pb-4 crooked-box" md="10" lg="8">
          <h2 className="text-center uppercase text-pink">Opportunity</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris feugiat orci vel justo semper varius. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam fermentum, massa ut molestie venenatis, justo nibh laoreet risus, at imperdiet nisl purus sed augue.</p>
        </Col>
      </Row>

      <Row id="explanation" className="justify-content-center">
        <Col className="mt-5 mb-5" md="10">
          <h2 className="text-center uppercase text-rust">Explorable Explanation</h2>
        </Col>
      </Row>

      <Row id="sources" className="mt-5 py-5 bg-pink justify-content-center">
        <Col md="10" lg="8" classname="p-2">
          <h2 className="text-white text-center uppercase">Sources</h2>
          <Row className="mt-4 pt-5 pb-3 crooked-box">
            <Col md="12" lg="6">
              <ul>
                <li className="pb-4"><p>A recent study of supervised bail programs showed that over 40% of the group had mental health issues, 31% had recurring mental health and substance abuse issues, while one-third of this group identified themselves as homeless.</p>
                (<a href="#">A Legal Aid Strategy for Bail, Legal Aid Ontario</a>)</li>

                <li className="pb-4"><p>Black people are overrepresented in federal prisons by more than 300%, while Aboriginal people are overrepresented by nearly 500%. The same disparities exist in provincial jails.</p>
                (<a href="#">Race, Crime and Justice in Canada, John Howard Society of Canada</a>)</li>

                <li className="pb-4"><p>40% of police work involves people in crisis or people experiencing a mental illness.</p>
                (<a href="#">Study in Blue and Grey, Canadian Mental Health Association - BC Division</a>)</li>
              </ul>
            </Col>

            <Col md="12" lg="6">
              <ul>
                <li className="pb-4"><p>The estimates of untreated mental illness in the criminal justice system range from 15-40% of the incarcerated population.</p>
                (<a href="#">Mental Illness and Police Fact Sheets, Canadian Mental Health Association - BC Division</a>)</li>

                <li className="pb-4"><p>43% of persons remanded into custody were unemployed. In 2000, the National Council of Welfare concluded, “the reason that accused persons are kept in custody for weeks and months before trial is not because they are dangerous and poor, but mostly because they are poor.”</p>
                (<a href="#">A Legal Aid Strategy for Bail, Legal Aid Ontario</a>)</li>
              </ul>
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout>
  )
}

export default Issue1Page