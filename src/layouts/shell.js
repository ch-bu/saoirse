// import React from 'react'
import React, { Component } from "react"
import {ThemeProvider} from 'styled-components';

// Define what props.theme will look like
// Define our `fg` and `bg` on the theme
const theme = {
  // primaryColor: "#bb6d8c",
  primaryColor: "#fcf113",
  // primaryColorLight: "#cb90a7",
  primaryColorLight: "#fefab8",
  darkColor: "#20232a",
  // darkColorLight: "#282c35",
  darkColorLight: "#262c30",
  breakpointOne: "1100px",
  breakpointTwo: "1200px"
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