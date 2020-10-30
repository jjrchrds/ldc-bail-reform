import React, { useState, useRef } from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { Controller, Scene } from 'react-scrollmagic';
import BackgroundImage from 'gatsby-background-image'
import { slugify } from "../libs/helpers"
import { Container, Row, Button, Col, Modal } from "react-bootstrap"

import NathanComponent from "../components/stories/nathan"
import KaraComponent from "../components/stories/kara"
import GeorgeComponent from "../components/stories/george"

import RichText from "../components/stories/rich-text"
import ChevronDown from "../../static/assets/svg/chevron-down.svg"

import BottomButtons from "../components/bottom-buttons"

const StoriesPage = ({data}) => {

  const pageContent = data.allContentfulStoriesPageTemplate.edges[0].node;

  // const [ slideIndex, setSlideIndex ] = useState(0);
  const bgs = useRef();
  const progress = useRef();

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
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className={`${ modalContent.fluid ? 'w-75' : ''}`}>
            <h3 className="text-rust lh-1">{modalContent.title}</h3>
            <RichText json={ modalContent.json }/>
          </div>

          { modalContent.fluid ? 
            <Img 
            fluid={ modalContent.fluid }
            className={`w-25 position-absolute modal-art`}
          />
          : ''}
          
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
              <BackgroundImage className="bg-cover" fluid={data.intro_bg.childImageSharp.fluid}>

                <Container className="h-100 position-relative z-100">
                  <Row className="h-100 d-flex justify-content-center align-items-end">
                    <Col md={10} className="text-center mb-5">
                      <h1 className="text-uppercase text-pink">{ pageContent.introHeading }</h1>
                      <RichText json={ pageContent.introCopy.json }/>
                      <p className="mt-4">Start scrolling</p>
                      <ChevronDown className="fill-rust"/>
                    </Col>
                  </Row>
                </Container>
                <div className="bg-cover position-absolute bg-gradient opacity-1"/>

              </BackgroundImage>
            </div>
          </Scene>
        
        </Controller>
        <NathanComponent handleShow={handleShow} handleBg={updateBackground}/>
        <KaraComponent handleShow={handleShow} handleBg={updateBackground}/>
        <GeorgeComponent handleShow={handleShow} handleBg={updateBackground}/>
      </section>

      <section className="position-relative z-100">
        <BottomButtons
          btn1={"How Bail Worsens Lives"}
          btn1Url={"/theme1"}
          btn2={"Bail Reform Timeline"}
          btn2Url={"/timeline"}
          ctaColor={"text-white"}
        />
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
        }
      }
    }
    allContentfulStoriesPageTemplate {
      edges {
        node {
          title
          introHeading
          introCopy {
            json
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
  }
`