import React, { Component } from 'react';
import styled from 'styled-components'

const ButtonComponent = styled.button`
  background-color: #bb6d8c;
  width: 100%;
  border-radius: 5px;
  min-height: 2rem;
  padding: 0;
  border: none;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #cb90a7;
  }
`;


class Button extends React.Component {
  render() {
    return <Button></Button>; 
  }
}

export default ButtonComponent;

