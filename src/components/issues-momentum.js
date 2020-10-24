import React from "react"
import { Row, Col, Nav, Tab } from "react-bootstrap"

class MomentumTabs extends React.Component {
  render() {
    // Rename data to make it more legible
    const airtable = this.props.documents

    // Temp storage of keys
    const docsByTab = {};
    // Check that data was fetched
    if (airtable && Object.keys(airtable)) {
      // Group docs from same year
      Object.keys(airtable).forEach(function(i) {
        // Create key for grouping
        var tempKey = airtable[i].data.Momentum_Tab;
        if (!docsByTab.hasOwnProperty(tempKey)) {
          docsByTab[tempKey] = {
            "tab": tempKey,
            "docs": [] // new nested array of docs
          }
        }
        // push docs into the nested array under the tab
        docsByTab[tempKey].docs.push(airtable[i].data);
      });
    }

    console.log(docsByTab);

    // Map objects to final results array
    const docsByTabArray = Object.keys(docsByTab).map(function(key) {
      return docsByTab[key];
    })

    // console.log(docsByTabArray[0].docs[0].Image[0].url);
    
    return (
      <Row className="justify-content-center mt-3 mb-5 momentum">
        <Col lg="10" xl="8">
          <Tab.Container defaultActiveKey="0">
            <Row className="pl-1">
                { docsByTabArray.map((item, i) => (
                  <Nav key={ i } variant="link" className="flex momentum-tab-wrap px-1">
                    <Nav.Item className="momentum-tab">
                      <Nav.Link eventKey={ i } className="px-3 py-1">
                        <h4>{ item.tab }</h4>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                ))}
            </Row>

            <Row className="pl-2 pr-2">
              { docsByTabArray.map((item, i) => (
                <Tab.Content key={ i } className="momentum-pane px-4">
                  <Tab.Pane eventKey={ i }>
                    <Row className="no-gutters">
                      <Tab.Container defaultActiveKey="0">
                        <Col lg="6" className="py-4 article-list">
                          <Nav variant="link" className="pl-0 pt-0 pr-4">
                          {item.docs.map(function(doc, index) {
                            return (
                            <Nav.Item key={ index } className="article-item" >
                              <Nav.Link eventKey={ index } className="article-heading align-items-center">
                                { doc.Title }
                              </Nav.Link>
                            </Nav.Item>
                            )})}
                          </Nav>
                        </Col>

                        <Col lg="6" className="pb-4 article-preview">
                          <Nav variant="link" className="article-pagination justify-content-center">
                          {item.docs.map(function(doc, index) {
                            return (
                            <Nav.Item key={ index } className="article-page">
                              <Nav.Link eventKey={ index } className="article-page-num display-2">
                                ⸰
                              </Nav.Link>
                            </Nav.Item>
                            )})}
                          </Nav>

                          {item.docs.map(function(doc, index) {
                            return (
                            <Tab.Content key={ index }>
                              <Tab.Pane eventKey={ index } className="article-card bg-light">
                                <div className="article-header">
                                  <div className="source">{ doc.Author_s_ }</div>
                                  <div className="date">{ doc.Publish__or_Start_Date_ }</div>
                                </div>
                                <div className="article-body">
                                  <b>{ doc.Title }</b>
                                  <p>{ doc.Momentum_Annotation }</p>
                                  <a href={ doc.URL } target="_blank" rel="noreferrer">Read More &raquo;</a>
                                </div>
                              </Tab.Pane>
                            </Tab.Content>
                          )})}
                        </Col>
                      </Tab.Container>
                    </Row>
                  </Tab.Pane>
                </Tab.Content>
              ))}
            </Row>
          </Tab.Container>
        </Col>
      </Row>
    )
  }
}

export default MomentumTabs