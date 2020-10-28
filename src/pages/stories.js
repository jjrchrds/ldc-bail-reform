import React, { useState, useRef } from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { Controller, Scene } from 'react-scrollmagic';
import BackgroundImage from 'gatsby-background-image'
import { slugify } from "../libs/helpers"
import { Container, Row, Button, Col, Modal } from "react-bootstrap"
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

  const updateBackground = ( id ) => {
    // console.log('update bg called' + id);
    const activeId = 'bg-'+id;
    const activeBg = bgs.current.querySelectorAll('.bg-character.opacity-1');
    console.log("current: " + activeBg[0].id + ", new: " + activeId)
    if ( activeBg[0].id === activeId) {
      return;
    }
    
    const backgrounds = bgs.current.querySelectorAll('.bg-character');
    const newZIndex = parseInt(activeBg[0].style.zIndex) ? parseInt(activeBg[0].style.zIndex) + 1 : 1;

    console.log(newZIndex)

    backgrounds.forEach(background => {
      
      if (background.id === activeId) {
        background.classList.add('opacity-1');
        background.style.zIndex = newZIndex;
      } else {
        setTimeout(function(){
          background.classList.remove('opacity-1');
        }, 1000)
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

  const [show, setShow] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    body: '',
    fluid: null
  })

  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    console.log(data);
    setModalContent( prevState => {
      return {
        ...prevState,
        ...data
      }
    })
    setShow(true);
  }

  return (
    <Layout>

      <Modal
        show={show}
        onHide={handleClose} 
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h2 className="text-rust">{modalContent.title}</h2>
          <p>
          {modalContent.body}
          </p>
        </Modal.Body>
      </Modal>

      <section className="stories">
        <div ref={ bgs } className="bgs position-fixed">
          <div className="bg-cover bg-gradient position-fixed opacity-1"/>
          { data.allContentfulNarrativePageBackground.edges.map((item, index) => {
            const id = `bg-${ slugify(item.node.pageTitle)}`;
            console.log(id);

            return(
              <BackgroundImage
                key={`bg-${index}`} 
                id={id}
                Tag="section"
                className={`position-absolute bg-cover bg-character ${ id === "bg-nathan" ? 'opacity-1' : ''}`}
                fluid={item.node.backgroundImage.fluid}
                backgroundColor={`#111`}
                preserveStackingContext={true}
              />
            )
          })}
          
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
        <NathanComponent handleShow={handleShow} handleBg={updateBackground}/>
        <KaraComponent handleShow={handleShow} handleBg={updateBackground}/>
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


              
            