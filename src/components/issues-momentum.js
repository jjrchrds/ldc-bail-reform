import React from "react"
import { Row, Col, Nav, Tab } from "react-bootstrap"
// import { Link } from "gatsby"
import "./issues-momentum.scss"

class MomentumTabs extends React.Component {
  render() {
    // This array is a stand-in for Contentful content
    // This component would need to pull data:
    // - for each year
    //    - for each article
    //       - thumbnail, source, headline, date, snippet, link
    const years = [ "2020", "2019","2018", "2017" ]
    
    return (
      <Row fluid className="justify-content-center mt-2 momentum">
        <Col md="8" >
          <Tab.Container defaultActiveKey="2020">
            <Row>
              { years.map(function(year) {
                return (
                  <Nav variant="link" className="flex momentum-tab-row">
                    <Nav.Item className="momentum-tab">
                      <Nav.Link eventKey={ year }>
                        <h4>{ year }</h4>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                )
              })}
            </Row>
            <Row className="pl-2 pr-2">
              { years.map(function(year) {
                return (
                  <Tab.Content className="p-2 momentum-pane">
                    <Tab.Pane eventKey={ year }>
                      <Row>
                        <Col md="6">
                          <h5>{ year } Thumbnails</h5>
                        </Col>
                        <Col md="6">
                          <h5>{ year } Article Snippet</h5>
                          <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Maecenas faucibus mollis interdum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>
                        </Col>
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                )
              })}
            </Row>
          </Tab.Container>
        </Col>
      </Row>
    )
  }
}

export default MomentumTabs