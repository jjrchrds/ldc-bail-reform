import React from "react";
import { Card } from "react-bootstrap";

const DocumentCard = ({doc, bg, item, index, active, category = 1, linked }) => {
  // console.log(doc);
  let colour = '',
      headerTextColour = ''

  if (category == 1) {
    colour = 'purple'
    headerTextColour = 'white'
  }
  // console.log(active);
  return (
    <Card key={`card-${index}`} className={`timeline-card w-100 ${active ? "active" : ""}`} id={`${item.year}-card-${index}`} style={{display: active ? 'block' : '' }}>
      <Card.Header className={`text-right text-${headerTextColour} py-1`} style={{ backgroundColor: bg }}>
        <h5 className="text-uppercase my-1">{doc.data.Publish__or_Start_Date_}</h5>
      </Card.Header>
      <Card.Body>
        <p className="methodology-author mb-2">{doc.data.Author_s_}</p>
        <p style={{ color: bg }} className="methodology-title mb-2">{doc.data.Title}</p>
        { doc.data.Biblio_Annotation ? <p className="methodology-quote mb-4"><em>"{doc.data.Biblio_Annotation}"</em></p> : '' }
        <a className="btn btn-rust" target="_blank" href={doc.data.URL}> View Document</a>
        { linked ? 
          <ul className="mt-4 mb-0 list-unstyled">
            {
              linked.map( (linkedDocument , idx) => {
                console.log(linkedDocument);
                return (
                  <li key={ linkedDocument.recordId }>
                    <a target="_blank" href={ linkedDocument.data.URL } className="btn-link">{ linkedDocument.data.Title }</a>
                  </li>
                )
              })
            } 
          </ul> : ''}
      </Card.Body>
    </Card>
  )
}

export default DocumentCard;