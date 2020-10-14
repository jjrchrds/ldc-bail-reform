import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import ReactGA from 'react-ga';

const Head = ({title}) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  // Google Analytics Setup
  ReactGA.initialize('UA-180594039-1');

  return (
    <Helmet 
      title={`${title} | ${data.site.siteMetadata.title}`}
      script={[{ 
        type: 'text/javascript', 
        innerHTML: 'window.__lo_site_id = 253250;(function(){var wa = document.createElement("script"); wa.type = "text/javascript"; wa.async = true; wa.src = "https://d10lpsik1i8c69.cloudfront.net/w.js"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(wa, s);})();'
      }]}
    />
  )
}

export default Head;