import styled, { css } from 'styled-components'


const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: hsl(0, 0%, 91%);

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
  }
`;

const NavigationBottom = styled.div`
  position: fixed;
  padding: 0 10px;
  bottom: 0;
  left: 0;
  height: 8vh;
  background-color: #f7f7f7;
  border-top: 1px solid rgb(236, 236, 236);
  display: flex; 
  flex-wrap: no-wrap;
  width: 100%;
  overflow-x: scroll;
  justify-content: space-between;

  &::-webkit-scrollbar {
      display: none;
  }

  a {
    display: flex;
    height: 100%;
    align-items: center;
    flex: 1;

    font-size: 0.8rem;
    color: rgba(0, 0, 0, .6);
    text-decoration: none;

    &:hover {
      color: rgba(0, 0, 0, .9);
    }
  }

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    grid-area: nav;
    position: relative;
    height: 100%;
    width: 100%;
  }
`;

const Card = styled.div`
  position: fixed;
  left: 400px;
  z-index: 200;
  background-color: #1f232b;
  visibility: hidden;
  width: 400px;
  top: ${props => props.coordY};
  left: ${props => props.coordX};
  height: 87px;
  transition: all 0.2s;
  display: flex;
  padding-left: 20px;
  justify-content: left;
  align-items: center;
  

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    visibility: ${props => props.mouseOverCard ? "visible" : "hidden"};
  }

  h3 {
    color: rgba(255, 255, 255, .6);
    margin: 0;
    text-transform: uppercase;
    font-size: 1rem;
    letter-spacing: 1px;

    span {
      color: rgba(255, 255, 255, .9);
      text-transform: capitalize;
      font-size: 1.2rem;
    }
  }

  &:before {
    border-color: transparent #1f232b transparent transparent;
    border-style: solid;
    border-width: 10px 10px 10px 0;
    content: "";
    display: block;
    height: 0;
    left: -10px;
    margin-top: -10px;
    position: absolute;
    top: 50%;
    width: 0;
  }
`;

const MenuButton = styled.div`
  position: fixed;
  right: 2vw;
  bottom: 2vh;
  background-color: ${props => props.theme.primaryColor};
  /* border: 1px solid ${props => props.theme.greyColorLight}; */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 199;

  svg {
    color: ${props => props.theme.primaryColorSuperlight};
  }

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    display: none;
  }
`;

export {
  Container,
  NavigationBottom,
  Card,
  MenuButton,
}