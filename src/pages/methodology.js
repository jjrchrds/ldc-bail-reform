import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/layout"
import Head from '../components/head';

import { graphql } from "gatsby"
import { Container, Row, Col, Button, Modal } from "react-bootstrap"

import { slugify, dateFormat } from "../libs/helpers";

const MethodologyPage = ({data}) => {

  //Document Modal
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [documentCard, setDocumentCard] = useState({
    bg: '',
    date: '',
    author: '',
    title: '',
    quote: '',
    url: '',
    links: [],
    events: []
  })

  const handleDocumentModalClose = () => setShowDocumentModal(false);
  const handleDocumentModalShow = (doc, bg) => {
   
    setDocumentCard( prevState => {
      return {
        ...prevState,
        bg: bg,
        date: dateFormat.format(new Date(doc.data.Publish__or_Start_Date_)),
        author: doc.data.Author_s_,
        title: doc.data.Title,
        quote: doc.data.Biblio_Annotation,
        url: doc.data.URL,
        links: linkedByRecordId[doc.recordId],
      }
    })
    setShowDocumentModal(true);
  }


  //Year Modal
  const [showYearModal, setShowYearModal] = useState(false);
  const [methodologyCard, setMethodologyCardData] = useState({
    year: '',
    sortedDocs: [],
    events: []
  });

  const handleYearModalClose = () => setShowYearModal(false);
  const handleYearModalShow = (year) => {
    console.log(data.allContentfulTimelineYear)
    const sortedDocs = [ ...dataByYear[year] ];
    sortedDocs.sort((a,b) => (a.data.Publish__or_Start_Date_ > b.data.Publish__or_Start_Date_) ? 1 : ((b.data.Publish__or_Start_Date_ > a.data.Publish__or_Start_Date_) ? -1 : 0));
              
    setMethodologyCardData( prevState => {
      return {
        ...prevState,
        year: year,
        sortedDocs: sortedDocs,
        
      }
    })
    setShowYearModal(true);
  }

  //Event Data
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

  //build data objects, once

  useEffect(() => {

    //set cat colours
    data.categoryColours.nodes.forEach( (cat) => {
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
    const scrollThreshold = 4;
    const scrollOffset = 0.3;
    const scroller = scrollama()

    scroller.setup({
      step: '.timeline-year',
      threshold: scrollThreshold,
      progress: true,
      offset: scrollOffset,
      debug: true
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

  const resetFilters = () => {
    Object.keys(filter).forEach( (key, index) => {
      setFilter(prevState => {
        return {
          ...prevState,
          [key] : false
        }
      });
    });
  }

  const updateActiveCategories = (id) => {
    console.log(filter);

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

      <Modal
        show={showDocumentModal} 
        onHide={handleDocumentModalClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className="modal-document"
        centered
      >
        <Modal.Header 
          style={{ backgroundColor: documentCard.bg }}
          className="d-flex align-items-center"
          closeButton
        >
          <Modal.Title className="text-white text-uppercase lh-1" id="contained-modal-title-vcenter">
            { documentCard.date }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { documentCard.author ? <p>{documentCard.author}</p> : ''}
          { documentCard.title ? <a href={documentCard.url} target="_blank" className="d-block mb-3" rel="noreferrer">{documentCard.title}</a> : ''}
          { documentCard.quote ? <p><em>"{documentCard.quote}"</em></p> : ''}
          { documentCard.links ? 
          <>
          <h2 className="h5 my-2 text-uppercase">Related Documents</h2>
          <ul className="mb-0 list-unstyled">
            {
              documentCard.links.map( (linkedDocument , idx) => {
                // console.log(linkedDocument);
                return (
                  <li key={ linkedDocument.recordId }>
                    <a target="_blank" href={ linkedDocument.data.URL } className="d-block btn-link mb-1" rel="noreferrer">{ linkedDocument.data.Title }</a>
                  </li>
                )
              })
            } 
          </ul>
          </> : ''}
        </Modal.Body>
      </Modal>

      <Modal
        show={showYearModal} 
        onHide={handleYearModalClose}
        backdrop={false}
        className="modal-page"
      >
        <Modal.Body>
          <h1 className="text-center text-rust">{ methodologyCard.year }</h1>
          <p>Click on a square to expand the resource’s details!</p>
          <div className="indicators-lg mb-3">
          { methodologyCard.sortedDocs.map((doc, index) => {
                        
            const cat = slugify(doc.data.Type_of_Content);
            const bg =  categoryColours[cat] ? categoryColours[ cat ] : '#888'; 
            
            return (
              <button 
                key={index} 
                className="timeline-card-indicator timeline-card-indicator-lg" 
                style={{ backgroundColor: bg}}
                onClick={ ()=> handleDocumentModalShow(doc, bg) }
              >
                {methodologyCard.year}-document-{index}
              </button>
            )
          })}
          </div>

          <ul className="list-unstyled list-inline mb-2">
            { Object.keys(categories).map((category, index) => {
              const cat = slugify(category);
              const bg =  categoryColours[cat] ? categoryColours[ cat ] : '#888';

              return (
                <li
                  key={`category-${index}`}
                  className="mb-1 mr-2 list-inline-item">
                    <div className="d-flex align-items-center">
                      <span
                      className="d-inline-block timeline-card-indicator pt-1 pb-1"
                      style={{ background: bg, border: "none", color: "white"}}/> { category }
                    </div>
                  
                </li>
              )
            }
            )}
          </ul>
          
          { yearMeta[methodologyCard.year] ? 
            <div className="timeline-year-header-meta mt-4 pr-2 pr-md-5 pb-3">
              <h2 className="h4 text-uppercase">Relevant events</h2>
              <ul className="list-unstyled">
              { yearMeta[methodologyCard.year].events ? yearMeta[methodologyCard.year].events.map((event, index) => {
                console.log(event);
                return (
                  <li key={index} className="outline-light mr-1">
                    { event.eventDate ? <strong className="text-pink">{dateFormat.format(new Date(event.eventDate))}</strong> : ''} {event.eventTitle}
                  </li>
                )
              }): ''}
              </ul>
            </div>
          : '' }

        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button className="text-uppercase btn-rotate text-white py-1" variant="pink" onClick={handleYearModalClose}>
            <span>Back</span>
          </Button>
        </Modal.Footer>
      </Modal>

      <Container className="my-5 pt-5">
        <Row className="justify-content-center">
          <Col md="8">
            <h1 className="text-rust text-center">LOREM IPSUM DOLOR SIT</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem commodo at rhoncus, vitae. Consequat, condimentum convallis nisl hac. Et a, sed suscipit egestas fringilla. Eu non tristique facilisi fringilla facilisi arcu urna sociis nibh. Volutpat gravida tincidunt ut venenatis egestas in tellus.</p>
            <p className="d-lg-none">Click on a year to access the resources!</p>
          </Col>
        </Row>

        <Row className="hidden-xs">
          <Col md="3" className="d-none d-lg-block">
            
            <ul className="legend list-unstyled">
              <li className="mb-4">
                <h2 className="text-uppercase h5 mb-2">Legend</h2>
                <ul className="list-unstyled list-inline mb-2">
                  { Object.keys(categories).map((category, index) => {
                    const cat = slugify(category);
                    const bg =  categoryColours[cat] ? categoryColours[ cat ] : '#888';

                    return (
                      <li
                        key={`category-${index}`}
                        onClick={ () => updateActiveCategories( slugify(category) )}
                        className="mb-1 mr-2 list-inline-item">
                          <div className={`category-indicator d-flex align-items-center ${ filter[cat] ? 'active' : ''}`}>
                            <span
                            className="d-inline-block pt-1 pb-1"
                            style={{ background: bg }}/> { category }
                          </div>
                        
                      </li>
                    )
                  }
                  )}
                </ul>

                <button 
                  className="btn btn-sm btn-rust py-0 text-uppercase"
                  onClick={resetFilters}
                >Reset</button>
              </li>
              <li>
                <h2 className="text-uppercase h5 mb-2">Timeline</h2>
                <ul className="list-unstyled">
                { Object.keys(dataByYear).sort().reverse().map(key => (
                  <li key={`legend-${key}`}>
                    <a href={`#year-${key}`}>{ key }</a>
                  </li>
                ))}
                </ul>
              </li>
            </ul>

          </Col>
          <Col md="9" className="h-100">
            
            <div ref={timeline} className="timeline-wrapper mr-1 mr-md-5">
              
            { Object.entries(dataByYear).sort().reverse().map(yearData => {
              // console.log(yearData);
              const year = yearData[0];
              const sortedDocs = [ ...dataByYear[year] ];
              sortedDocs.sort((a,b) => (a.data.Publish__or_Start_Date_ > b.data.Publish__or_Start_Date_) ? 1 : ((b.data.Publish__or_Start_Date_ > a.data.Publish__or_Start_Date_) ? -1 : 0));
              
              return (
                
              <div key={year} className="timeline-year mb-3" data-index={year}>
                <div className="anchor" id={`year-${ year }`}></div>

                <div className="timeline-year-content position-relative">
                  <div className="timeline-year-content-header d-flex align-items-center">
                    <Button
                      variant="rust" 
                      className="pr-3 timeline-year-label mr-3"
                      onClick={ () => handleYearModalShow(year)}
                    >
                      {year}
                    </Button>

                    <div className="timeline-year-indicators">          
                      { sortedDocs.map((doc, index) => {
                        
                        const offsetLeft = (index * .05) * 100 ;
                        // console.log(doc.data.Type_of_Content);
                        // console.log(offsetLeft);
                        const cat = slugify(doc.data.Type_of_Content);
                        const bg =  categoryColours[cat] ? categoryColours[ cat ] : '#888'; 
                        
                        return (
                          <button 
                            key={index} 
                            className="timeline-card-indicator" 
                            data-id={`${year}-card-${index}`} 
                            data-cat={doc.data.Type_of_Content ?  slugify(doc.data.Type_of_Content) : ''}
                          
                            style={{ left: offsetLeft + '%', backgroundColor: bg}}
                            onClick={ ()=> handleDocumentModalShow(doc, bg) }

                            // onClick={ indicatorClickHandler }
                          >
                            {year}-document-{index}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                  {/* <div className="timeline-year-events">
                  { item.node.events.map((event, index) => {

                    const month = parseFloat(event.eventDate.split('-')[1]) - 1;
                    const offsetTop = (month / 12) * 100;

                    return (
                      <div key={index} className="timeline-event" style={{top: offsetTop + "%"}}>
                        <h6 className="timeline-event-title text-rust mb-0">{event.eventDate}</h6>
                        <p>{event.eventTitle}</p>
                      </div>
                    )
                  })}
                  </div> */}

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
          eventDate
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