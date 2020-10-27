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
              ...GatsbyContentfulFluid
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
          card1Gif {
            file {
              url
            }
          }
          card1Img {
            description
            file {
              url
            }
          }
          card2Title
          card2Leed
          card2Gif {
            file {
              url
            }
          }
          card2Img {
            description
            file {
              url
            }
          }
          card3Title
          card3Leed
          card3Gif {
            file {
              url
            }
          }
          card3Img {
            description
            file {
              url
            }
          }
          themesHeadline
          themesBlurb {
            json
          }
          theme1Img {
            title
            fluid(quality: 100, maxWidth: 350) {
              ...GatsbyContentfulFluid
            }
          }
          theme1ImgAlt
          theme2Img {
            title
            fluid(quality: 100, maxWidth: 350) {
              ...GatsbyContentfulFluid
            }
          }
          theme2ImgAlt
          theme3Img {
            title
            fluid(quality: 100, maxWidth: 350) {
              ...GatsbyContentfulFluid
            }
          }
          theme3ImgAlt
        }
      }
    }
  `)

  const [show, setShow] = React.useState(true);
  const handleClose = () => setShow(false);
  const content = data.homeContent.nodes[0];

  // Switch card img to animated GIF on hover
  const imgs = [content.card1Img.file.url, content.card2Img.file.url, content.card3Img.file.url]
  const gifs = [content.card1Gif.file.url, content.card2Gif.file.url, content.card3Gif.file.url]

  const startGif = (cardNum) => {
    this.src = imgs[cardNum]
  }

  const stopGif = (cardNum) => {
    this.src = gifs[cardNum]
  }


  return (
    <Layout className="pt-5">
      <Head title={content.title} />

      <Jumbotron className="hero" fluid>
        <BackgroundImage
          className="hero-img"
          fluid={content.heroImage.fluid}
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
              <Card className="text-left text-dark">
                <Card.Img src={imgs[0]} alt={content.card1Img.description} onMouseEnter={this.startGif(1)} onMouseLeave={this.stopGif(1)} />
                <Card.Body>
                  <Card.Title><h3 className="text-rust">The Bail System</h3></Card.Title>
                  <Card.Text className="min-height-3rem">
                    {content.card1Leed}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col sm="12" md="4" className="text-center">
            <Link to="/narrative">
              <Card className="bg-dark text-light text-left">
                <Card.Img src="https://placehold.it/400x400" alt="Card image"/>
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
            <Link to="theme1" aria-label={content.theme1ImgAlt}>
              <Img fluid={content.theme1Img.fluid} className="mb-4" alt={content.theme1ImgAlt}/>
            </Link>
          </Col>
          <Col xs="12" md="4" className="text-center">
            <Link to="theme2" aria-label={content.theme2ImgAlt}>
              <Img fluid={content.theme2Img.fluid} className="mb-4" alt={content.theme2ImgAlt}/>
            </Link>
          </Col>
          <Col xs="12" md="4" className="text-center">
            <Link to="theme3" aria-label={content.theme3ImgAlt}>
              <Img fluid={content.theme3Img.fluid}  className="mb-4" alt={content.theme3ImgAlt}/>
            </Link>
          </Col>
        </Row>

      </Container>
    </Layout>
  )
}

export default IndexPage;