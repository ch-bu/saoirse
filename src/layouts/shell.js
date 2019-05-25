// import React from 'react'
import React, { Component } from "react"
import {ThemeProvider} from 'styled-components';

// Define what props.theme will look like
// Define our `fg` and `bg` on the theme
const theme = {
  breakpointOne: "1200px",
  breakpointTwo: "1600px",

  // Earth Theme
  primaryColorLight: "#66c6e1",
  colorIcons: "rgba(255, 255, 255, .7)",
  colorIconsHover: "rgba(255, 255, 255, .9)",
  colorIconsMobile: "rgba(0, 0, 0, .7)",
  primaryColor: "rgb(2, 179, 228)",
  secondaryColor: "#ffc600",
  topNavigationBackgroundColor: "#20232a",
  topNavigationBorderBottom: "#20232a",
  topNavigationTextColor: "rgba(255, 255, 255, .7)",
  topNavigationBackButtonBackgroundColor: "#1e1e1e",
  topNavigationBackButtonBackgroundColorHover: "#fff",
  topNavigationBackButtonBorderRight: "#36383f",

  // Aside
  asideBackgroundColor: "rgba(247, 247, 247, 1)",
  asideBorderRightColor: "#ececec",
  asideSubunitTextColor: "rgba(0,0,0,0.8)",
  asideSubunitTextColorHover: "rgba(0,0,0,1)",
  asideSubunitTextActive: "rgba(0,0,0,0.9)",
  asideUnitTextColor: "#000",
  asideDropdownBackgroundColor: "#ddd",
  asideDropdownHoverColor: "#57636d",
  asideDropdownTitleTextColor: "#000",
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