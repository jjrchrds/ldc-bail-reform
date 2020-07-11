import React, { useState, useEffect } from "react";
import Layout from "../components/layout"
import Head from '../components/head';
import DocumentCard from '../components/document-card';

import { graphql, useStaticQuery } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"

const MethodologyPage = () => {
  // scroller

  const [state, setState] = useState({
    data: 0,
    steps: [10, 20, 30],
    progress: 0
  });

  //'2011-card-0': true,

  const [documents, setDocuments] = useState({})

  // console.log(state);

  const data = useStaticQuery(graphql`
    query {
      allContentfulTimelineYear {
        edges {
          node {
            year
            headline
            description {
              description
            }
            events {
              eventTitle
              eventDate
            }
            documents {
              title
              date
              author
              quote
              url
            }
          }
        }
      }
    }
  `)

  // console.log(data);

  const years = [ ...data.allContentfulTimelineYear.edges].reverse();

  useEffect(() => {
    
    
    years.map((year) => {
      let isFirst = true;
      year.node.documents.map( (doc, index ) => {
        const newKey = `${year.node.year}-card-${index}`;
        
        setDocuments(prevState => {
          return {
            ...prevState,
            [newKey]: index > 0 ? false : true
          }
        });
        
      });
    })
    
  }, []); 

  // const handleScrollStepEnter = ({element, index, direction}) => {

  //   console.log(element.dataset.index);

  //   const data = this.state.steps[index];
  //   element.classList.add('active');
  //   this.setState({data});

  //   this.updateActiveDocumentCard(`${element.dataset.index}-card-0`);
  // }

  // const handleScrollStepExit = ({element, index, direction}) => {
  //   element.classList.remove('active');
  // }

  // const handleProgress = ({progress}) => {
  //   this.setState({progress});
  // }

  // componentDidMount(){
  //   const scrollama = require('scrollama')
  //   const scrollThreshold = 0.2;
  //   this.scroller = scrollama()
  //   this.scroller.setup({
  //     step: '.timeline-year',
  //     threshold: scrollThreshold,
  //     progress: true,
  //     // debug: true
  //   })
  //   .onStepEnter(this.handleScrollStepEnter)
  //   .onStepExit(this.handleScrollStepExit)
  //   .onStepProgress(this.handleProgress)

  //   // setup resize event
  //   window.addEventListener("resize", this.scroller.resize);
  // }

  // componentWillUnmount(){
  //   this.scroller.destroy();
  // }

  const indicatorClickHandler = (e) => {
    console.log(documents);
    const id = e.target.dataset.id;
    updateActiveDocumentCard(id);
  }

  const updateActiveDocumentCard = (id) => {
    const newDocuments = { ...documents}
    Object.keys(newDocuments).forEach(v => newDocuments[v] = false);
    newDocuments[id] = true;
    setDocuments({...newDocuments});
  }

  return (
    <Layout>
      <Head title="Methodology"/>
      <Container>
        <Row className="">
          <Col md="4" xl="3" className="p-4 p-xl-5">
            <h2>interaction</h2>
          </Col>
          <Col md="8" xl="9" className="h-100 p-md-4 p-xl-5">
            
            <div className="timeline-wrapper mr-1 mr-md-5">
            { years.map(item => {
              // console.log(documents);
              // console.log(item.node);
              return (
              <div key={item.node.year} className="timeline-year mb-5" data-index={item.node.year}>
                <div className="timeline-year-content">
                  <div className="timeline-year-content-header d-md-flex pb-2 mb-4">
                    <h1 className="display-3 pr-3"><strong>{item.node.year}</strong></h1>
                    <div className="timeline-year-header-meta mt-2 pr-2 pr-md-5 pb-3">
                      <p className="mb-1"><strong>{item.node.headline}</strong></p>
                      <p className="mb-0">{item.node.description.description}</p>
                    </div>
                    <div className="timeline-year-buttons">
                    { item.node.documents.map((doc, index) => {
                      const length = item.node.documents.length;
                      const offset = (index / length) * 100;
                            
                      return (
                        <button 
                          key={index} 
                          className="timeline-card-indicator" 
                          data-id={`${item.node.year}-card-${index}`} 
                          role="button" 
                          style={{ left: offset + '%'}} 
                          // onKeyDown={ indicatorClickHandler } 
                          onClick={ indicatorClickHandler }
                        >
                          {item.node.year}-document-{index}
                        </button>
                      )
                    })}
                    </div>
                  </div>
                  <div className="timeline-year-docs mr-3 mr-md-5">
                    { item.node.documents.map((doc, index) => {
                      let id = `${item.node.year}-card-${index}`;
                      // console.log(documents[id]);

                      return(
                        <DocumentCard 
                          key={index} 
                          index={index} 
                          doc={doc} 
                          item={item.node} 
                          active={documents[id]}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
            )})
          }
            </div>  
          
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default MethodologyPage