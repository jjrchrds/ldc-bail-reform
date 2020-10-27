/* Import React, Gatsby & React Bootstrap */
import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Row, Col, Jumbotron, Button, Container, Card } from "react-bootstrap"
import Img from "gatsby-image"
import BackgroundImage from "gatsby-background-image"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

/* Import Layout Components */
import Layout from "../components/layout"
import Head from "../components/head"
import BetaSticker from "../components/beta-sticker"

/* Import graphics */
import HomeLogo from "../../static/assets/svg/logo_homepage.svg"
import ChevronDown from "../../static/assets/svg/chevron-down.svg"

const IndexPage = () => {

  const data = useStaticQuery(graphql `
    query {
      homeContent: allContentfulHomePageTemplate {
        nodes {
          title
          heroImage {
            fluid(quality: 90, maxWidth: 2000) {
              src
            }
          }
          heroTextTop
          heroTextMid
          heroTextEmphasis
          heroTextScroll
          subheroIntroText {
            json
          }
          card1Title
          card1Leed
          card2Title
          card2Leed
          card3Title
          card3Leed
          themesHeadline
          themesBlurb {
            json
          }
          theme1Img {
            title
            fluid(quality: 100, maxWidth: 350) {
              src
            }
          }
          theme1ImgAlt
          theme2Img {
            title
            fluid(quality: 100, maxWidth: 350) {
              src
            }
          }
          theme2ImgAlt
          theme3Img {
            title
            fluid(quality: 100, maxWidth: 350) {
              src
            }
          }
          theme3ImgAlt
        }
      }
      homeHero: file(relativePath: { eq: "images/home_hero.png" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 2000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      issue1: file(relativePath: { eq: "images/issue1.jpg" }) {
        childImageSharp {
          fluid(quality: 100, maxWidth: 350) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      issue2: file(relativePath: { eq: "images/issue2.jpg" }) {
        childImageSharp {
          fluid(quality: 100, maxWidth: 350) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      issue3: file(relativePath: { eq: "images/issue3.jpg" }) {
        childImageSharp {
          fluid(quality: 100, maxWidth: 350) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const [show, setShow] = React.useState(true);
  const handleClose = () => setShow(false);
  const content = data.homeContent.nodes[0];

  return (
    <Layout className="pt-5">
      <Head title={content.title} />

      <Jumbotron className="hero" fluid>
        <BackgroundImage
          className="hero-img"
          fluid={data.homeHero.childImageSharp.fluid}
          backgroundColor={`#F08FDB`}
          alt="A jail cell overlaid with a stylized pink dot pattern"
        >
          <Container className="mt-5 beta-sticker-wrap">
            <BetaSticker
              show={show}
              handleClose={handleClose} />
              
            <Row className="justify-content-center">   
              <Col md="10" className="text-center">
                <HomeLogo fill='#fff' className="mt-5 mb-5 homelogo"/>
                <h1 className="display-2 mt-4 mb-0 text-dark uppercase">According to the Auditor General</h1>
                <h1 className="display-1 mb-5 text-rust uppercase">70% of people held in Ontario jails are <span className="hero-em">legally innocent</span></h1>
                <p className="display-3 pt-4 mb-3">Why?</p>
                <p>
                  <Button variant="link" className="heartbeat mb-4" aria-label="Learn more">
                    <Link to="/#main">
                      <ChevronDown />
                    </Link>
                  </Button>
                </p>
              </Col>
            </Row>
          </Container>
        </BackgroundImage>
      </Jumbotron>

      <Container>
        <Row id="main" className="justify-content-md-center pt-5 mb-4">
          <Col className="mt-4 display-4" md="10">
            {documentToReactComponents(content.subheroIntroText.json)}
          </Col>
        </Row>

        <Row className="justify-content-between mb-5 pb-5">
          <Col sm="12" md="4" className="text-center">
            <Link to="/system-map">
              <Card className="bg-dark text-light text-left">
                <Card.Img src="https://placehold.it/400x400" alt="Card image" />
                <Card.ImgOverlay className="align-contents-bottom bg-dark">
                  <Card.Title><h3 className="text-white">{content.card1Title}</h3></Card.Title>
                  <Card.Text className="min-height-3rem">
                    {content.card1Leed}
                  </Card.Text>
                </Card.ImgOverlay>
              </Card>
            </Link>
          </Col>

          <Col sm="12" md="4" className="text-center">
            <Link to="/narrative">
              <Card className="bg-dark text-light text-left">
                <Card.Img src="https://placehold.it/400x400" alt="Card image" />
                <Card.ImgOverlay className="align-contents-bottom bg-dark">
                  <Card.Title><h3 className="text-white mb-0">{content.card2Title}</h3></Card.Title>
                  <Card.Text className="min-height-3rem">
                    {content.card2Leed}
                  </Card.Text>
                </Card.ImgOverlay>
              </Card>
            </Link>
          </Col>

          <Col sm="12" md="4" className="text-center">
            <Link to="/methodology">
              <Card className="bg-dark text-light text-left">
                <Card.Img src="https://placehold.it/400x400" alt="Card image" />
                <Card.ImgOverlay className="align-contents-bottom bg-dark">
                  <Card.Title><h3 className="text-white">{content.card3Title}</h3></Card.Title>
                  <Card.Text className="min-height-3rem">
                    {content.card3Leed}
                  </Card.Text>
                </Card.ImgOverlay>
              </Card>
            </Link>
          </Col>
        </Row>

        <Row className="justify-content-md-center mb-4 text-center">
          <Col sm="12" md="10">
            <h2 className="uppercase text-dark">{content.themesHeadline}</h2>
            {documentToReactComponents(content.themesBlurb.json)}
          </Col>
        </Row>

        <Row className="justify-content-md-center mb-5 pb-5">
          <Col xs="12" md="4" className="text-center">
            <Link to="issue1" aria-label={content.theme1ImgAlt}>
              <Img fluid={data.issue1.childImageSharp.fluid} className="mb-4" alt={content.theme1ImgAlt}/>
            </Link>
          </Col>
          <Col xs="12" md="4" className="text-center">
            <Link to="issue2" aria-label={content.theme2ImgAlt}>
              <Img fluid={data.issue2.childImageSharp.fluid} className="mb-4" alt={content.theme2ImgAlt}/>
            </Link>
          </Col>
          <Col xs="12" md="4" className="text-center">
            <Link to="issue3" aria-label={content.theme3ImgAlt}>
              <Img fluid={data.issue3.childImageSharp.fluid}  className="mb-4" alt={content.theme3ImgAlt}/>
            </Link>
          </Col>
        </Row>

      </Container>
    </Layout>
  )
}

export default IndexPage;