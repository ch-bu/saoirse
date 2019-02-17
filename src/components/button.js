import React, { Component } from 'react';
import styled from 'styled-components'

const ButtonComponent = styled.button`
  background-color: ${props => props.theme.primaryColor};
  border: 1px solid ${props => props.theme.darkColorLight};
  width: 100%;
  border-radius: 5px;
  min-height: 2rem;
  padding: 0;
  color: #000;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.primaryColorLight};
  }
`;


class Button extends React.Component {
  render() {
    return <Button></Button>; 
  }
}

export default ButtonComponent;

