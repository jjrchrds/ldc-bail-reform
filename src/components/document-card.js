import React from "react";
import { Card } from "react-bootstrap";

const DocumentCard = ({doc, bg, item, index, active, category = 1 }) => {
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
        <p className="author mb-2">{doc.data.Author_s_}</p>
        <p className="title mb-2">{doc.data.Title}</p>
        <p className="quote mb-4" style={{ color: bg }}><em>"{doc.data.Biblio_Annotation}"</em></p>
        <a className="btn btn-rust" target="_blank" href={doc.data.URL}> View Document</a>
      </Card.Body>
    </Card>
  )
}

export default DocumentCard;