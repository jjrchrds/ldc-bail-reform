import React from "react"
import "intersection-observer"
import Layout from "../components/layout"
import Head from "../components/head"
import NarrativeComponent from "../components/narrative-body"
import { ParallaxProvider } from "react-scroll-parallax"

import "./narrative.scss"

const NarrativePage = () => {
  return (
    <Layout>
      <Head title="Narrative" />
      {/* <ParallaxProvider> */}
        <NarrativeComponent />
      {/* </ParallaxProvider> */}
    </Layout>
  )
}

export default NarrativePage
