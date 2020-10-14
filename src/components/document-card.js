import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

const DocumentCard = ({doc, bg, year, index, active, category = 1, linked }) => {
  
  // console.log(doc);
  let colour = '',
      headerTextColour = ''

  if (category == 1) {
    colour = 'purple'
    headerTextColour = 'white'
  }

  return (
    <Card 
      key={`card-${index}`} 
      className={`timeline-card w-100 ${active ? "active" : ""}`} 
      id={`${year}-card-${index}`} 
      style={{display: active ? 'block' : '' }}>
      <Card.Header className={`text-right text-${headerTextColour} py-1`} style={{ backgroundColor: bg }}>
        <h5 className="text-uppercase my-1">{doc.data.Publish__or_Start_Date_}</h5>
      </Card.Header>
      <Card.Body>
        <p className="methodology-author mb-2">{doc.data.Author_s_}</p>
        <a target="_blank" href={doc.data.URL} className="methodology-title mb-2">{doc.data.Title}</a>
        { doc.data.Biblio_Annotation ? <p className="methodology-quote mb-4"><em>"{doc.data.Biblio_Annotation}"</em></p> : '' }
        { linked ? 
          <>
          <h2 className="h5 my-2">Related Documents</h2>
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
          </ul>
          </> : ''}
      </Card.Body>
    </Card>
  )
}

export default DocumentCard;