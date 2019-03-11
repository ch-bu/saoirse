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
  darkColor: "#1c1f25",
  darkColorLight: "#262c30",
  // darkColorLight: "#f7f7f7",
  greyColor: "#f7f7f7",
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