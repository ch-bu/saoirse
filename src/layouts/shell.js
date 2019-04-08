// import React from 'react'
import React, { Component } from "react"
import {ThemeProvider} from 'styled-components';

// Define what props.theme will look like
// Define our `fg` and `bg` on the theme
const theme = {
  breakpointOne: "1200px",
  breakpointTwo: "1600px",

  // Theme 1
  primaryColor: "#01a1cd",
  primaryColorLight: "#02b3e4",

  // Top Bar
  colorTopNavigation: "#202B32",
  colorBorderNav: "#42505b",
  colorNavigationText: "#fff",
  colorBigBackButton: "#2e3d49",
  colorBigBackButtonHover: "#202B32",
  colorIcons: "#fff",
  colorBigBackButtonBorder: "#42505b",

  // Aside
  navigationColor: "#2e3d49",
  colorAsideBorderRight: "#42505b",
  colorTextAside: "hsla(0,0%,100%,.8)",
  colorTextAsideHover: "hsla(0,0%,100%,1)",
  colorTextAsideUnit: "#fff",

  // Aside - Dropdown
  dropdownTitle: "#42505b",
  dropdownTitleTextColor: "#fff"
};


class Shell extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          {this.props.children}
        </div>
      </ThemeProvider>
    )
  }
}


export default Shell