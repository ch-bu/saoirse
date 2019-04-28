// import React from 'react'
import React, { Component } from "react"
import {ThemeProvider} from 'styled-components';

// Define what props.theme will look like
// Define our `fg` and `bg` on the theme
const theme = {
  breakpointOne: "1200px",
  breakpointTwo: "1600px",

  // ***** Theme 1 *****
  // // Top Bar
  // topNavigationBackgroundColor: "#202B32",
  // topNavigationBorderBottom: "#42505b",
  // topNavigationTextColor: "#fff",
  // topNavigationBackButtonBackgroundColor: "#293641",
  // topNavigationBackButtonBackgroundColorHover: "#202B32",
  // topNavigationBackButtonBorderRight: "#42505b",

  // // Aside
  // asideBackgroundColor: "#2e3d49",
  // // asideBorderRightColor: "#42505b",
  // asideSubunitTextColor: "hsla(0,0%,100%,.8)",
  // asideSubunitTextColorHover: "hsla(0,0%,100%,1)",
  // asideUnitTextColor: "#fff",
  // asideDropdownBackgroundColor: "#42505b",
  // asideDropdownTitleTextColor: "#fff",


  // Earth Theme
  primaryColorLight: "#66c6e1",
  colorIcons: "rgba(255, 255, 255, .7)",
  colorIconsHover: "rgba(255, 255, 255, .9)",
  colorIconsMobile: "rgba(0, 0, 0, .7)",
  primaryColor: "#3690ff",
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

  // // Dark Theme
  // primaryColor: "#01a1cd",
  // primaryColorLight: "#66c6e1",
  // colorIcons: "#fff",
  // topNavigationBackgroundColor: "#000",
  // topNavigationBorderBottom: "#222",
  // topNavigationTextColor: "#fff",
  // topNavigationBackButtonBackgroundColor: "#1e1e1e",
  // topNavigationBackButtonBackgroundColorHover: "#515151",
  // topNavigationBackButtonBorderRight: "#222",

  // // Aside
  // asideBackgroundColor: "#262626",
  // // asideBorderRightColor: "#42505b",
  // asideSubunitTextColor: "hsla(0,0%,100%,.8)",
  // asideSubunitTextColorHover: "hsla(0,0%,100%,1)",
  // asideUnitTextColor: "#fff",
  // asideDropdownBackgroundColor: "#3b3b3b",
  // asideDropdownHoverColor: "#57636d",
  // asideDropdownTitleTextColor: "#fff",
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