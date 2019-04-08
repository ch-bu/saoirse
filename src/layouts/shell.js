// import React from 'react'
import React, { Component } from "react"
import {ThemeProvider} from 'styled-components';

// Define what props.theme will look like
// Define our `fg` and `bg` on the theme
const theme = {
  breakpointOne: "1200px",
  breakpointTwo: "1600px",

  // ***** Theme 1 *****
  primaryColor: "#01a1cd",
  primaryColorLight: "#02b3e4",
  colorIcons: "#fff",

  // Top Bar
  topNavigationBackgroundColor: "#202B32",
  topNavigationBorderBottom: "#42505b",
  topNavigationTextColor: "#fff",
  topNavigationBackButtonBackgroundColor: "#293641",
  topNavigationBackButtonBackgroundColorHover: "#202B32",
  topNavigationBackButtonBorderRight: "#42505b",

  // Aside
  asideBackgroundColor: "#2e3d49",
  // asideBorderRightColor: "#42505b",
  asideSubunitTextColor: "hsla(0,0%,100%,.8)",
  asideSubunitTextColorHover: "hsla(0,0%,100%,1)",
  asideUnitTextColor: "#fff",
  asideDropdownBackgroundColor: "#42505b",
  asideDropdownTitleTextColor: "#fff",
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