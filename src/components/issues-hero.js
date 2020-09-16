import React from "react"
import { Jumbotron, Container, Card, Row, Col } from "react-bootstrap"
import { Link } from "gatsby"
import Img from "gatsby-image"
import "./issues-hero.scss"

class IssuesHero extends React.Component {
  render(){
    return (
      <Jumbotron fluid className="pt-5 pb-4 bg-dark issuesHeroWrap">
        <Container>
          <Row className="justify-content-center">
            <Col className="justify-content-center p-0" sm="3">
              <Card className="issueImage bg-dark text-dark">
                <Img fluid={this.props.issueImg} alt={ this.props.issueName }/>
              </Card>
            </Col>
          </Row>

          <Row md="10" className="justify-content-center pr-4 pl-4 pt-5 pb-4 crooked-box">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris feugiat orci vel justo semper varius. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam fermentum, massa ut molestie venenatis, justo nibh laoreet risus, at imperdiet nisl purus sed augue.</p>
          </Row>

          <Row md="10" className="justify-content-center mt-4 pt-4 text-white">
            <Col md="4">
              <Link to={ this.props.link1 }>
                <h3 className="pinkTag">Momentum</h3>
              </Link>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Col>

            <Col md="4">
              <Link to={ this.props.link2 }>
                <h3 className="pinkTag">Opportunity</h3>
              </Link>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Col>

            <Col md="4">
              <Link to={ this.props.link3 }>
                <h3 className="pinkTag">Explorable Explanation</h3>
              </Link>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    )
  }
}

export default IssuesHero