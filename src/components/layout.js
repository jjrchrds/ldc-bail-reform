import React from 'react';

import Header from "./header"
import Footer from "./footer"

import "../styles/index.scss"
import layoutStyles from './layout.module.scss';

// if (typeof window !== "undefined") {
//   // eslint-disable-next-line global-require
//   require("smooth-scroll")('a[href*="#"]')
// }
// Disabling this plugin because it's forcing a scroll-to-top for all "#" links.

const Layout = (props) => {
  return (
    <div className={layoutStyles.container}>
      <div className={layoutStyles.content}>
        <Header/>
        <div className="pt-5">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Layout