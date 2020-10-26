import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/layout"
import Head from '../components/head';

import { graphql } from "gatsby"
import { Container, Row, Col, Button, Carousel, Modal } from "react-bootstrap"

import { slugify, dateFormat, chunkArray} from "../libs/helpers";

import Fade from 'react-reveal/Fade';

const MethodologyPage = ({data}) => {
  //Preview Modal
  const [ showPreviewModal, setShowPreviewModal ] = useState(false);
  const [ isPreview, setIsPreview ] = useState(false);
  const [ previewCard, setPreviewCard ] = useState({
    bg: '',
    date: '',
    title: ''
  })

  const handlePreviewModalShow = (doc, bg, e) => {

    let rect = e.target.getBoundingClientRect();
    let modalWidth = 500;

    let offsetLeft = rect.left;
    let offsetTop = rect.top + 30;
    let center = true;

    if (viewport.width > 992) {
      center = false;
    }
    //adjust positioning
    if (modalWidth + rect.left > viewport.width) {
      offsetLeft = (offsetLeft - modalWidth + 20);
    }
    // if (modalHeight + rect.top > viewport.height) {
    //   offsetTop = rect.top - 
    // }
  
    setPreviewCard( prevState => {
      return {
        ...prevState,
        bg: bg,
        date: dateFormat.format(new Date(doc.data.Publish__or_Start_Date_)),
        // author: doc.data.Author_s_,
        title: doc.data.Title,
        // quote: doc.data.Biblio_Annotation,
        // url: doc.data.URL,
        // links: linkedByRecordId[doc.recordId],
        top: !center ? offsetTop : 0,
        left: !center ? offsetLeft : 0,
        center: center
      }
    })
    setShowPreviewModal(true);
  }

  const handlePreviewModalClose = () => {
    setShowPreviewModal(false);
  }

    //get the modal height after it's been built/displayed
    useEffect( ()=> {

      if (typeof document !== 'undefined') {
        const modal = document.getElementById('modal-preview')
        const rect = modal ? modal.getBoundingClientRect() : null;
        if (rect) {
          let offsetTop = previewCard.top + rect.height + 50;
  
          if ( offsetTop > viewport.height ) {
            setPreviewCard( prevState => {
              return {
                ...prevState,
                top: !previewCard.center ? (previewCard.top - rect.height - 40) : 0
              }
            })
          }
        }
      }
  
    }, [showPreviewModal]);

  //Document Modal
  const documentModal = useRef(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [documentCard, setDocumentCard] = useState({
    bg: '',
    date: '',
    author: '',
    org: '',
    title: '',
    quote: '',
    url: '',
    links: [],
    events: [],
    top: 0,
    left: 0,
    center: true
  })

  const handleDocumentModalClose = () => {
    console.log('handleDocumentModalClose called');
    setShowDocumentModal(false);
  }

  const handleDocumentModalShow = (doc, bg, e) => {

    let rect = e.target.getBoundingClientRect();
    let modalWidth = 500;

    let offsetLeft = rect.left;
    let offsetTop = rect.top + 30;
    let center = true;

    if (viewport.width > 992) {
      center = false;
    }
    //adjust positioning
    if (modalWidth + rect.left > viewport.width) {
      offsetLeft = (offsetLeft - modalWidth + 20);
    }
    // if (modalHeight + rect.top > viewport.height) {
    //   offsetTop = rect.top - 
    // }
  
    setDocumentCard( prevState => {
      return {
        ...prevState,
        bg: bg,
        date: dateFormat.format(new Date(doc.data.Publish__or_Start_Date_)),
        author: doc.data.Author_s_,
        org: doc.data.Parent_Org___Publication,
        title: doc.data.Title,
        quote: doc.data.Biblio_Annotation,
        url: doc.data.URL,
        links: linkedByRecordId[doc.recordId],
        top: !center ? offsetTop : 0,
        left: !center ? offsetLeft : 0,
        center: center
      }
    })
    setShowDocumentModal(true);
  }


  //get the modal height after it's been built/displayed
  useEffect( ()=> {

    if (typeof document !== 'undefined') {
      const modal = document.getElementById('modal-document')
      const rect = modal ? modal.getBoundingClientRect() : null;
      if (rect) {
        let offsetTop = documentCard.top + rect.height + 50;

        if ( offsetTop > viewport.height ) {
          setDocumentCard( prevState => {
            return {
              ...prevState,
              top: !documentCard.center ? (documentCard.top - rect.height - 40) : 0
            }
          })
        }
      }
    }

  }, [showDocumentModal]);

  //Year Modal
  const [showYearModal, setShowYearModal] = useState(false);
  const [methodologyCard, setMethodologyCardData] = useState({
    year: '',
    chunkedDocs: [],
    events: []
  });

  const handleYearModalClose = () => setShowYearModal(false);
  const handleYearModalShow = (year) => {
    const sortedDocs = [ ...dataByYear[year] ];
    sortedDocs.sort((a,b) => (a.data.Publish__or_Start_Date_ > b.data.Publish__or_Start_Date_) ? 1 : ((b.data.Publish__or_Start_Date_ > a.data.Publish__or_Start_Date_) ? -1 : 0));
    const chunkedDocs = chunkArray(sortedDocs, 7);
    console.log(chunkedDocs);

    setMethodologyCardData( prevState => {
      return {
        ...prevState,
        year: year,
        chunkedDocs: chunkedDocs,
        
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
          [id] : true
        }
      })
    })

  }, []); 

  const resetFilters = () => {
    Object.keys(filter).forEach( (key, index) => {
      setFilter(prevState => {
        return {
          ...prevState,
          [key] : true
        }
      });
    });
  }

  const updateActiveCategories = (id) => {
    // console.log(filter);

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
    console.log(filter);

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
        indicator.classList.add('disabled');
      }
    }

  }, [filter])

  //get viewport width
  const [viewport, setViewport] = useState(typeof window === 'undefined' ? {width: 0, height: 0} : {width: window.innerWidth, height: window.innerHeight});

  useEffect(()=>{
    if (typeof window === 'undefined') return;
    const handleWindowResize = () => {
      setViewport({width: window.innerWidth, height: window.innerHeight});
    }
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <Layout>
      <Head title="Methodology"/>

      <Modal
        ref={documentModal}
        show={showDocumentModal} 
        onHide={handleDocumentModalClose}
        aria-labelledby="contained-modal-title-vcenter"
        className="modal-document"
        centered={ documentCard.center }
        backdropClassName="modal-backdrop-xs"
        backdrop={ !isPreview }
        id="modal-document"
        // backdrop={ documentCard.center }
        style={{ top: documentCard.top, left: documentCard.left }}
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
          { documentCard.author || documentCard.org ? 
            <p className="mb-2">{documentCard.author}{documentCard.author && documentCard.org ? ' - ' : ''}{documentCard.org}</p>
          : ''}
          { documentCard.title ? <a href={documentCard.url} target="_blank" className="d-block mb-3" rel="noreferrer">{documentCard.title}</a> : ''}
          { documentCard.quote ? <p>{documentCard.quote}</p> : ''}
          { documentCard.links ? 
          <>
          <h2 className="h5 my-2 text-uppercase">Related Documents</h2>
          <ul className="mb-0 list-unstyled list-related">
            {
              documentCard.links.map( (linkedDocument , idx) => {
                // console.log(linkedDocument);
                return (
                  <li key={ linkedDocument.recordId }>
                    <a target="_blank" href={ linkedDocument.data.URL } className="d-block btn-link mb-2" rel="noreferrer">{ linkedDocument.data.Title }</a>
                  </li>
                )
              })
            } 
          </ul>
          </> : ''}
        </Modal.Body>
      </Modal>

      <Modal
        show={showPreviewModal}
        onHide={handlePreviewModalClose}
        backdrop={false}
        className="modal-document"
        style={{ top: previewCard.top, left: previewCard.left }}
        id="modal-preview"
      >
        <Modal.Header 
          style={{ backgroundColor: previewCard.bg }}
        >
          <Modal.Title className="text-white text-uppercase lh-1" id="contained-modal-title-vcenter">
            { previewCard.date }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { previewCard.title ? <p className="mb-0">{previewCard.title}</p> : ''}
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

          <Carousel
            interval={null}
            controls={false}
            className="mb-3"
          >
          { methodologyCard.chunkedDocs.map((docs, index) => {
                      
            return (
              <Carousel.Item key={index}>
                <ul className="list-unstyled">
                  { docs.map( (doc, index) => {
                    const cat = slugify(doc.data.Type_of_Content);
                    const bg =  categoryColours[cat] ? categoryColours[ cat ] : '#888'; 
                    return(
                      <li
                        key={index} 
                        className="mb-2 d-flex text-left align-items-center"
                        onClick={ (e)=> handleDocumentModalShow(doc, bg, e) }
                      >
               
                        <div 
                          className="d-inline-block modal-card-indicator mr-2"
                          style={{ backgroundColor: bg}}
                        ></div>
                        <div className="d-inline-block modal-card-link text-rust truncate">
                        { doc.data.Title }
                        </div>
                       
                      </li>
                    )
                  })}
                </ul>
              </Carousel.Item>
            )
          })}
          </Carousel>
          
          <h2 className="h5 text-uppercase">Legend</h2>

          <ul className="list-legend list-unstyled list-inline mb-2">
            { Object.keys(categories).map((category, index) => {
              const cat = slugify(category);
              const bg =  categoryColours[cat] ? categoryColours[ cat ] : '#888';

              return (
                <li
                  key={`category-${index}`}
                  className="mb-1 mr-2 list-inline-item">
                    <div className="d-flex align-items-center text-grey">
                      <span
                      className="d-inline-block legend-card-indicator mr-1 pt-1 pb-1"
                      style={{ background: bg }}/> { category }
                    </div>
                  
                </li>
              )
            }
            )}
          </ul>
          
          { yearMeta[methodologyCard.year] ? 
            <div className="timeline-year-header-meta mt-4 pr-2 pr-md-5 pb-3">
              <h2 className="h5 text-uppercase">Relevant events</h2>
              <ul className="list-unstyled">
              { yearMeta[methodologyCard.year].events ? yearMeta[methodologyCard.year].events.map((event, index) => {
                // console.log(event);
                return (
                  <li key={index} className="mb-1">
                    <div className="d-inline-block w-25">
                      { event.eventDate ? <strong className="text-pink text-uppercase text-heading mr-2">{dateFormat.format(new Date(event.eventDate))}</strong> : ''} 
                    </div>
                    <div className="d-inline-block w-75 ">
                      {event.eventTitle}
                    </div>
                  </li>
                )
              }): ''}
              </ul>
            </div>
          : '' }

        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button className="text-uppercase btn-rotate-left text-white py-1" variant="pink" onClick={handleYearModalClose}>
            <span>Back</span>
          </Button>
        </Modal.Footer>
      </Modal>

      <Container className="my-5 pt-4 pt-lg-5">
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
              <li className="mb-5">
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
          <Col md="8" className="h-100">
            
            <div ref={timeline} className="timeline-wrapper position-relative mr-md-5">
              
            { Object.entries(dataByYear).sort().reverse().map(yearData => {
              // console.log(yearData);
              // console.log(yearData);
              const year = yearData[0];
              const sortedDocs = [ ...dataByYear[year] ];
              sortedDocs.sort((a,b) => (a.data.Publish__or_Start_Date_ > b.data.Publish__or_Start_Date_) ? 1 : ((b.data.Publish__or_Start_Date_ > a.data.Publish__or_Start_Date_) ? -1 : 0));
              
              
              let sortedEvents = [];
              if (yearMeta[year] && yearMeta[year].events ) {
                sortedEvents = [ ...yearMeta[year].events ]
              }

              sortedEvents.sort((a,b) => (a.eventDate > b.eventDate) ? 1 : ((b.eventDate > a.eventDate) ? -1 : 0)).reverse();

              // console.log(sortedEvents);


              return (
                
              <div key={year} className="timeline-year mb-3" data-index={year}>
                <div className="anchor" id={`year-${ year }`}></div>
                <Fade bottom>
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
                        const cat = slugify(doc.data.Type_of_Content);
                        const bg =  categoryColours[cat] ? categoryColours[ cat ] : '#888'; 
                        
                        return (
                          <button 
                            key={index} 
                            className="timeline-card-indicator" 
                            data-id={`${year}-card-${index}`} 
                            data-cat={doc.data.Type_of_Content ?  slugify(doc.data.Type_of_Content) : ''}
                            style={{ left: offsetLeft + '%', backgroundColor: bg}}
                            onClick={ (e) => handleDocumentModalShow(doc, bg, e) } 
                            onMouseEnter={ (e)=> handlePreviewModalShow(doc, bg, e)}
                            onMouseLeave={ handlePreviewModalClose }
                          >
                            {year}-document-{index}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                  { sortedEvents ? 
                  <div className="timeline-year-events d-none d-lg-flex align-items-end">
                    <ul className="list-unstyled mb-0">
                    { sortedEvents.map((event, index) => {
                      // console.log(event);
                      return (
                        <li key={index} className="event-year mt-2">
                        { event.eventDate ?
                          <div>
                             <small><strong className="text-pink text-uppercase text-heading mr-2">{dateFormat.format(new Date(event.eventDate))}</strong></small> 
                          </div>
                        : ''} 
                          <div className="event-title">
                            <small>{event.eventTitle}</small>
                          </div>
                        </li>
                      )
                        })}
                    </ul>
                  </div>
                : '' }

                </div>
                </Fade>
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
        Parent_Org___Publication
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
        Publish__or_Start_Date_
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