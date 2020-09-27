import React, { useState, useEffect } from "react";
import { Card, Accordion, Badge } from "react-bootstrap";
import { dateFormat } from "../libs/helpers"

const DocumentCard = ({doc, bg, year, index, linked }) => {


  return (
    <Card 
      key={`card-${index}`} 
      className={`timeline-card w-100 mb-3`} 
      id={`${year}-card-${index}`} 
    >
      <Accordion>
      <Card.Header
        className="bg-white"
      >

        <p className="h6 mb-2"><a target="_blank" href={doc.data.URL}>{doc.data.Title}</a></p>
        <p className="methodology-author mb-1">
        { doc.data.Author_s_ ? <span>{doc.data.Author_s_} &#8226; </span> : '' }
        {dateFormat.format(new Date(doc.data.Publish__or_Start_Date_))}
        </p>
        <Badge
          style={
            {
              background: bg,
              border: 'none',
              color: 'white'
            }
          }
        >
          {doc.data.Type_of_Content}
        </Badge>
      </Card.Header>
      <Accordion.Collapse eventKey={index+1}>
      <Card.Body>
        { doc.data.Biblio_Annotation ? <p className="methodology-quote mb-"><em>"{doc.data.Biblio_Annotation}"</em></p> : '' }
        { linked ? 
          <ul className="mb-0 list-unstyled">
            {
              linked.map( (linkedDocument , idx) => {
                // console.log(linkedDocument);
                return (
                  <li key={ linkedDocument.recordId }>
                    <a target="_blank" href={ linkedDocument.data.URL } className="btn-link">{ linkedDocument.data.Title }</a>
                  </li>
                )
              })
            } 
          </ul> : ''}
      </Card.Body>
      </Accordion.Collapse>
      
      { doc.data.Biblio_Annotation || linked ?
        <Card.Footer>

          <Accordion.Toggle
            eventKey={index+1} 
            className="btn btn-sm btn-rust mr-2"
          >
            Expand
            
          </Accordion.Toggle>
          { linked ? <small className="text-muted">{linked.length} additional link{linked.length > 1 ? 's' : ''}</small> : ''}
        </Card.Footer>
      : '' }
    
    </Accordion>
    </Card>
  )
}

export default DocumentCard;