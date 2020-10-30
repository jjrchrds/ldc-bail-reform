import React, { useState, useRef } from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { Controller, Scene } from 'react-scrollmagic';
import BackgroundImage from 'gatsby-background-image'
import { slugify } from "../libs/helpers"
import { Container, Row, Col } from "react-bootstrap"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"


const StoriesPage = ({ data }) => {
  let value = 0;

  // const [ slideIndex, setSlideIndex ] = useState(0);
  const bgs = useRef();
  const progress = useRef();

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

  return (
    <Layout>
      <section className="stories">
        <div ref={bgs} className="bgs position-fixed">
          <div className="bg-cover bg-gradient position-fixed" />
          {data.allContentfulNarrativePageBackground.edges.map((item, index) => (
            <BackgroundImage
              key={`bg-${index}`}
              id={`bg-${slugify(item.node.pageTitle)}`}
              Tag="section"
              className={'position-absolute bg-cover'}
              fluid={item.node.backgroundImage.fluid}
              backgroundColor={`#040e18`}
            />
          ))}
        </div>

        <div className="progress position-fixed">
          <div ref={progress}>0</div>
        </div>

        <Controller>
          {/* introduction */}
          <Scene
            indicators={true}
            triggerHook={1}
            duration={1}   
          >
            <div className="vh-100 bg-dark text-white intro-slide">
              <Container className="h-100">
                <Row className="h-100 d-flex align-items-center">
                  <h1>test</h1>
                </Row>
              </Container>
            </div>
          </Scene>

          {/* Nathan */}
          <Scene
            indicators={true}
            triggerHook={1}
            duration={"100%"}
            // pinSettings={{ pushFollowers: false }}
            pin
          >
            {(progress, event) => {
              return (
                <div className={`vh-100 character-01`}>
                  <Container className={`h-100`}>
                    <Row className="h-100 w-100 position-fixed">
                      <Col 
                        xs={6}
                        className="d-flex align-items-end">
                        <img className={`opacity-0 ${progress < .9 ? 'opacity-1' : ''}`} src="https://placehold.it/500x500/" />
                      </Col>
                    </Row>
                  </Container>
                </div>
              )
            }}
          </Scene>

          <Scene
            indicators={true}
            triggerHook={-1}
            duration={"50%"}
            // duration={1}
            pinSettings={{ pushFollowers: false }}
            pin
          >
            {(progress, event) => {
              return (
                <div className={`vh-100 character-01`}>
                  <Container className={`h-100`}>
                    <Row className="h-100 d-flex align-items-center text-white">
                      <Col md={{ span: 6, offset: 6 }}>
                        <h1>Meet Nathan</h1>
                        <p>test</p>
                      </Col>
                    </Row>
                  </Container>
                </div>
              )
            }}
          </Scene>

          <Scene
            indicators={true}
            triggerHook={-2}
            duration={"50%"}
            pinSettings={{ pushFollowers: false }}
            pin
          >
            {(progress, event) => {
              return (
                <div className={`vh-100 character-01`}>
                  <Container className={`h-100`}>
                    <Row className="h-100 d-flex align-items-center text-white">
                      <Col className="text-center">
                        <img
                          className={`slide-from-left ${progress > 0 ? 'active' : ''}`}
                          src="https://placehold.it/500x300/"
                        />
                      </Col>
                    </Row>
                  </Container>
                </div>
              )
            }}
          </Scene>

          <Scene
            indicators={true}
            triggerHook={0}
            duration={"50%"}
            pin
          >
            {(progress, event) => {
              return (
                <div className={`vh-100 character-01`}>
                  <Container className={`h-100`}>
                    <Row className="h-100 d-flex justify-content-center align-items-center text-white">
                      <Col lg="10" className="text-left">
                        <h1>Arrest</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore fugit omnis a reiciendis! Et saepe doloribus, esse impedit quos amet repellendus adipisci, tempore nam a hic consectetur! Neque, officia?</p>

                      </Col>
                    </Row>
                  </Container>
                </div>
              )
            }}
          </Scene>


          {/* { slideData.map((slide, index) => {
          console.log(slide.character);
          return (
            <Scene 
              indicators={true}
              // onEnter={ () => console.log('wow') }
              key={`slide-${index}`} 
              triggerHook={0} 
              duration={"200%"} 
              pin
            >
              {(progress, event) => {
                if (event.type === "enter") {
                  updateProgress( index );
                  updateBackground( slide.character );
                }
                return (
                <div className={`vh-100 ${ slide.character }`}>
                  <Container className={`h-100 ${ progress > .1 && progress < .9 ? 'opacity-1' : ''}`}>
                    <Row className="h-100 d-flex align-items-center text-white">
                      <Col md="6">
                        <p>{ slide.character }</p>
                        <h1>{ slide.heading }</h1>
                        { documentToReactComponents(slide.story.json, options) }

                      </Col>
                    </Row>
                  </Container>
                  
                </div>
              )}}
            </Scene>
          )
        })} */}
        </Controller>
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
  }
`