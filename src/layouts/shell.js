// import React from 'react'
import React, { Component } from "react"
import {ThemeProvider} from 'styled-components';

const theme = {
  breakpointOne: "1200px",
  breakpointTwo: "1600px",

  primaryColor: "hsla(208, 100%, 47%, 1)",
  // primaryColorSuperlightDark: "hsla(208, 100%, 47%, 0.8)",
  primaryColorLight: "hsla(208, 100%, 67%, 1)",
  primaryColorSuperlight: "hsla(208, 100%, 87%, 1)",
  primaryColorSuperSuperLight: "hsla(208, 100%, 87%, 0.5)",
  // greyColor: "hsla(0, 0%, 0%, .82)",
  // greyColorLight: "hsla(0, 0%, 15%, .32)",
  // greyColorSuperLight: "hsla(0, 0%, 95%, 1)",
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