import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/layout"
import Head from '../components/head';
import DocumentCard from '../components/document-card';

import { graphql } from "gatsby"
import { Container, Row, Col, Badge } from "react-bootstrap"
import { slugify } from "../libs/helpers";
import AnchorLink from 'react-anchor-link-smooth-scroll'

import Fade from 'react-reveal/Fade';
import TransitionGroup from 'react-transition-group/TransitionGroup';

const MethodologyPage = ({data}) => {

  const [ timelineNav, setTimelineNav ] = useState({});

  //change to map
  const yearMeta = data.allContentfulTimelineYear.edges.reduce(function(r,a) {
    const year = a.node.year;
    r[ year ] = r[ year ] || [];
    r[ year ] = a.node;
    return r;
  }, Object.create(null)
  )


  const dataByYear = data.documents.nodes.reduce(function (r, a) {
    const year = a.data.Publish__or_Start_Date_.split('-')[0];
    r[ year ] = r[ year ] || [];
    r[ year ].push(a);
    return r;
    }, Object.create(null)
  );

  const linkedByRecordId = data.linked.nodes.reduce(function (r, a) {
    const year = a.data.Linked_to_Entry_;
    r[ year ] = r[ year ] || [];
    r[ year ].push(a);
    return r;
    }, Object.create(null)
  );

  const [categoryColours, setCategoryColours] = useState({});

  const categories = data.documents.nodes.reduce(function (r, a) {
    const category = a.data.Type_of_Content;
    let cat;

    if (category === null) {
      cat = 'None'
    } else {
      cat = category;
    }

    r[ cat ] = r[ cat ] || [];
    r[ cat ].push(a);
    return r;
    }, Object.create(null)
  );
  
  // scroller
  const timeline = useRef(null);

  const [state, setState] = useState({
    data: 0,
    steps: [10, 20, 30],
    progress: 0
  });

  const [documents, setDocuments] = useState({})
  const [filter, setFilter] = useState({})

  useEffect(() => {

    //set cat colours
    data.categoryColours.nodes.map( (cat) => {
      if (cat.data.Category_Name) {
        setCategoryColours( prevState => {
          return {
            ...prevState,
            [slugify(cat.data.Category_Name)]: '#'+cat.data.Hexcode
          }
        })
      }
    })

    //set category states
    Object.keys(categories).forEach((category, index) => {
      const id = slugify(category);
      setFilter( prevState => {
        return {
          ...prevState,
          [id] : false
        }
      })
    })

    //set document state
    Object.entries(dataByYear).forEach((yearData) => {
      const year = yearData[0];

      dataByYear[year].forEach( (doc, index ) => {
        const newKey = `${year}-card-${index}`;
        
        setDocuments(prevState => {
          return {
            ...prevState,
            [newKey]: index > 0 ? false : true
          }
        });
      });
    })
    
  }, []); 

  //Handle Scrollama
  const handleScrollStepEnter = ({element, index, direction}) => {
    const data = state.steps[index];
    console.log(element);
    element.classList.add('active');
    setState({data});
  }

  const handleScrollStepExit = ({element, index, direction}) => {
    element.classList.remove('active');
  }

  const handleProgress = ({progress}) => {
    setState({progress});
  }

  useEffect(()=> {
    if (typeof window === 'undefined') return;

    const scrollama = require('scrollama')
    const scrollThreshold = 0.5;
    const scrollOffset = 0.2;
    const scroller = scrollama()

    scroller.setup({
      step: '.timeline-year',
      threshold: scrollThreshold,
      progress: true,
      offset: scrollOffset,
      // debug: true
    })
    .onStepEnter(handleScrollStepEnter)
    .onStepExit(handleScrollStepExit)
    .onStepProgress(handleProgress)

    // setup resize event
    window.addEventListener("resize", scroller.resize);
    return () => {
      scroller.destroy();
      window.removeEventListener('resize', scroller.resize)
    };
  }, [])

  // const indicatorClickHandler = (e) => {
  //   const id = e.target.dataset.id;
  //   updateActiveDocumentCard(id);
  // }

  // const updateActiveDocumentCard = (id) => {
  //   const year = id.split('-')[0];
  //   const newDocuments = { ...documents}

  //   Object.keys(newDocuments).forEach(v => {
  //     if ( v.includes(year) ) {
  //       newDocuments[v] = false
  //     }
  //   });

  //   newDocuments[id] = true;
  //   setDocuments({...newDocuments});
  // }

  const updateActiveCategories = (id) => {
    setFilter(prevState => {
      return {
        ...prevState,
        [id] : !filter[id]
      }
    });
  }

  //update on filter change
  useEffect(()=> {
    const indicators = timeline.current.querySelectorAll('.timeline-card-indicator');
    let filterActive = false;

    Object.keys(filter).forEach( (key, index) => {
      if ( filter[key] ) {
        filterActive = true;
      }
    })

    if ( filterActive ) {
      for (const indicator of indicators) {
        indicator.classList.add('disabled');
      }
      Object.keys(filter).forEach( (key, index) => {
        for (const indicator of indicators) {
          if ( filter[key] && indicator.dataset.cat === key) {
            indicator.classList.remove('disabled');
          }
        }
      })
      
    }  else {
      for (const indicator of indicators) {
        indicator.classList.remove('disabled');
      }
    }

  }, [filter])

  return (
    <Layout>
      <Head title="Methodology"/>

      <Container className="my-5 pt-5">
        <Row className="">
          <Col md="8">
            <h1 className="text-rust">Methodology</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem commodo at rhoncus, vitae. Consequat, condimentum convallis nisl hac. Et a, sed suscipit egestas fringilla. Eu non tristique facilisi fringilla facilisi arcu urna sociis nibh. Volutpat gravida tincidunt ut venenatis egestas in tellus. Ridiculus commodo vel arcu, facilisis velit, mattis fermentum pellentesque.</p>
          </Col>
        </Row>

        <Row className="">
          <Col md="2" className="pt-4">
            
            <ul className="legend list-unstyled">
              
              <li>
                <h5 className="text-uppercase mb-2">Timeline</h5>
                <ul className="list-unstyled">
                { Object.keys(dataByYear).sort().reverse().map(key => (
                  <li key={`legend-${key}`}>
                    <AnchorLink 
                      href={`#year-${key}`}
                    >
                        { key }
                    </AnchorLink>
                  </li>
                ))}
                </ul>
              </li>
            </ul>

          </Col>
          <Col md="7" className="h-100">
            
            <div ref={timeline} className="timeline-wrapper">
            { 
            
              Object.entries(dataByYear).sort().reverse().map(yearData => {
              
              const year = yearData[0];
          
              const sortedDocs = [ ...dataByYear[year] ];
              sortedDocs.sort((a,b) => (b.data.Publish__or_Start_Date_ > a.data.Publish__or_Start_Date_) ? 1 : ((a.data.Publish__or_Start_Date_ > b.data.Publish__or_Start_Date_) ? -1 : 0));
              

              return (
                
              <div key={year} className="timeline-year mb-3" data-index={year}>
                <div className="anchor" id={`year-${ year }`}></div>

                <div className="timeline-year-content position-relative">
                  <div className="timeline-year-content-header d-md-flex pb-2 mb-4">
                    <h1 className="pr-3 timeline-year-label">{year}</h1>

                    { yearMeta[year] ? 
                    <div className="timeline-year-header-meta mt-4 pr-2 pr-md-5 pb-3">
                      <p className="lh-1 mb-0"><strong>{yearMeta[year].headline}</strong></p>
                      <p className="lh-1"><small>{yearMeta[year].description.description}</small></p>
                      { yearMeta[year].events ? yearMeta[year].events.map((event, index) => {
                        // console.log(event);
                        return (
                          <Badge key={index} className="outline-light mr-1">{event.eventTitle}</Badge>
                        )
                      }): ''}
                    </div>
                     : '' }
                  </div>
            
                  <div className="timeline-year-docs mr-3 mr-md-5 pb-4">
                    <TransitionGroup
                      appear
                      enter
                      exit
                    >
                      { sortedDocs.map((doc, index) => {
                        const cat = slugify(doc.data.Type_of_Content);
                        const bg =  categoryColours[cat] ? categoryColours[ cat ] : '#888';
                        const linkedDocuments = linkedByRecordId[doc.recordId];
                        // let id = `${year}-card-${index}`;

                        return(
                          <Fade key={index}>
                          <DocumentCard
                            key={index} 
                            index={index} 
                            doc={doc} 
                            linked={ linkedDocuments } 
                            bg={bg}
                            year={ year } 
                            // active={documents[id]}
                            
                          />
                          </Fade>
                        )
                      })}
                    </TransitionGroup>
                  </div>
                </div>
              </div>
              
            )})
          }
            </div>  
          
          </Col>
          <Col md="3" className="pt-3">
            <ul className="legend list-unstyled">
              <li className="mb-4">
                <h5 className="text-uppercase mb-0">Categories</h5>
                <p className="lh-1 mb-3"><small>click to enable/disable</small></p>
                <ul className="list-unstyled mb-2">
                { Object.keys(categories).map((category, index) => {
                  const cat = slugify(category);
                  const bg =  categoryColours[cat] ? categoryColours[ cat ] : '#888';
                  // console.log(category);
                  // const bg = "blue";
                  // console.log(bg);
                  return (
                    <li key={`category-${index}`}
                      className="mb-1">
                      <Badge
                        style={{ background: bg, border: "none", color: "white"}}>{ category }</Badge>
                    </li>
                  )
                }
                )}
                </ul>
                <button className="btn btn-sm btn-rust pt-0 pb-1"><small>Reset</small></button>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    
    </Layout>
  )
}

//@TODO figure out view
export default MethodologyPage

export const query = graphql`
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
        }
      }
    }
  }
  categoryColours: allAirtable (filter:{ table:{ eq: "Colours"}}) {
    nodes {
      data {
        Category_Name
        Hexcode
      }
    }
  }
  documents: allAirtable (
    filter: {
      data: {
        Include_in_Interactive_Bibliography:{ in: ["Yes"]},
        Publish__or_Start_Date_: { ne: null}
      }
    }
  ) {
    nodes {
      data {
        Title
        Author_s_
        Publish__or_Start_Date_
        Biblio_Annotation
        Type_of_Content
        Include_in_Interactive_Bibliography
        Tag
        URL
      }
      recordId
    }
  }

  linked: allAirtable (
    filter: {
      data: {
        Include_in_Interactive_Bibliography:{ in: ["Linked to Item"]}
      }
    }
  ) {
    nodes {
      data {
        Title
        Author_s_
        Publish__or_Start_Date_
        Biblio_Annotation
        Type_of_Content
        Include_in_Interactive_Bibliography
        Tag
        URL
        Linked_to_Entry_
      }
      recordId
    }
  }
}

`