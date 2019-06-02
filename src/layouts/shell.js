// import React from 'react'
import React, { Component } from "react"
import {ThemeProvider} from 'styled-components';

const theme = {
  breakpointOne: "1200px",
  breakpointTwo: "1600px",

  primaryColor: "hsla(193, 98%, 45%, 1)",
  primaryColorSuperlightDark: "hsla(193, 98%, 55%, 1)",
  primaryColorLight: "hsla(193, 98%, 60%, 1)",
  primaryColorSuperlight: "hsla(215, 18%, 98%, 1)",
  greyColor: "hsla(0, 0%, 0%, .82)",
  greyColorLight: "hsla(0, 0%, 15%, .32)",
  greyColorSuperLight: "hsla(0, 0%, 95%, 1)",
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