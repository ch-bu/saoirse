import React, { Component } from 'react';
import styled from 'styled-components'

const ButtonComponent = styled.button`
  background-color: #385c8f;
  width: 100%;
  border-radius: 5px;
  /* border: 1px solid #ccc; */
  min-height: 2rem;
  padding: 0;
  border: none;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #5781bd;
  }
`;


class Button extends React.Component {
  render() {
    return <Button></Button>; 
  }
}

export default ButtonComponent;

