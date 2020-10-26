import React, { useState, useRef } from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { Controller, Scene } from 'react-scrollmagic';
import BackgroundImage from 'gatsby-background-image'
import { slugify } from "../libs/helpers"
import { Container, Row, Button, Col } from "react-bootstrap"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import NathanComponent from "../components/stories/nathan"
import KaraComponent from "../components/stories/kara"
import GeorgeComponent from "../components/stories/george"

const StoriesPage = ({data}) => {
  let value = 0;

  // const [ slideIndex, setSlideIndex ] = useState(0);
  const bgs = useRef();
  const progress = useRef();

  const pinDuration = 200; //inpixels


  //progress bar update
  const updateProgress = (value) => {
    progress.current.innerHTML = value;
  }

  const updateBackground = (id) => {
    const activeId = 'bg-' + id;
    const backgrounds = bgs.current.querySelectorAll('.bg-cover');
    backgrounds.forEach(background => {

      background.classList.remove('bg-active');
      if (background.id === activeId) {
        background.classList.add('bg-active');
      }

    })
  }

  //initialize slideData
  const slideData = [];
  data.allContentfulNarrativePageBackground.edges.forEach((item, index) => {
    item.node.slides.forEach((slide) => {
      slideData.push(slide);
    })
  });

  //set up documentToReact options
  const options = {
    renderNode: {
      "embedded-asset-block": (node) => {
        const alt = node.data.target.fields.title["en-US"];
        const url = node.data.target.fields.file["en-US"].url;
        console.log(node);
        return <img src={url} className="img-fluid mb-3" alt={alt} />;
      },
    }
  }

  // console.log(Math.round(window.innerHeight/2) + pinDuration);

  return (
    <Layout>
      <section className="stories">
        <div ref={ bgs } className="bgs position-fixed">
          <div className="bg-cover bg-gradient position-fixed"/>
          { data.allContentfulNarrativePageBackground.edges.map((item, index) => (
            <BackgroundImage
              key={`bg-${index}`} 
              id={`bg-${ slugify(item.node.pageTitle)}`}
              Tag="section"
              className={'position-absolute bg-cover'}
              fluid={item.node.backgroundImage.fluid}
              backgroundColor={`#040e18`}
            />
          ))}
        </div>

        <Controller>
          {/* introduction */}
          <Scene 
            triggerHook={0} 
            duration={"50%"} 
            pin
          >
            <div className="vh-100 bg-dark text-white">
              <Container className="h-100">
                <Row className="h-100 d-flex align-items-center">
                  <Col className="text-center">
                    <h1 className="text-uppercase text-pink">Lorem Ipsum</h1>
                    <p className="lead">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero rem adipisci sit possimus. Asperiores recusandae quaerat assumenda aliquid, harum voluptate minima quibusdam libero? Exercitationem dolore porro rerum tempore possimus enim.</p>
                    <p>Start Scrolling</p>
                  </Col>
                </Row>
              </Container>
            </div>
          </Scene>
        
        </Controller>
        <NathanComponent/>
        <KaraComponent/>
        <GeorgeComponent/>
      </section>
    </Layout>
  )
}

export default StoriesPage

export const query = graphql`
  query {
    allContentfulNarrativePageBackground {
      edges {
        node {
          pageTitle
          backgroundImage {
            fluid(maxWidth: 1800) {
              ...GatsbyContentfulFluid
            }
          }
          slides {
            character
            heading
            slideNumber
            story {
              json
            }
            slideImage {
              fluid(maxWidth: 1200) {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      }
    }
    intro_bg: file(relativePath: { eq: "images/intro_bg.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    nathan_bg: file(relativePath: { eq: "images/nathan_bg.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    kara_bg: file(relativePath: { eq: "images/kara_bg.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    george_bg: file(relativePath: { eq: "images/george_bg.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`


              
            