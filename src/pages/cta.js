import React from "react";
import { Container } from "react-bootstrap"

import Layout from "../components/layout";
import Head from '../components/head';

const CTA = () => {
  return (
    <Layout>
      <Head title="Get in Touch"/>

      <Container className="mt-5">
        <h1 className="text-center">Get in Touch</h1>
        <p className="text-center">Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p>
      </Container>
    </Layout>
  )
}

export default CTA;