import styled, { css } from 'styled-components'


const Container = styled.div`
  width: 100vw;
  min-height: 100vh;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    width: 94vw;
    margin-left: 6vw;
  }
`;

const MainHeading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 7vh;
  background-color: #fff;
  width: 100vw;
  margin: 0 auto;
  z-index: 98;
  text-align: center;
  font-size: 0.8rem;
  font-weight: normal;
  text-transform: uppercase;
  padding: 1vh 0;
  opacity: 0.96;
  text-decoration: none;
  border: none;
  letter-spacing: 1px;
  border-bottom: 1px solid rgba(236, 236, 236, .5);
  cursor: default;

  span {
    display: block;
    padding-top: 0px;
    color: rgba(0, 0, 0, .5);
    font-size: 0.6rem;
  }

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    width: 94vw;
    margin-left: 6vw;
    font-size: 1rem;

    span {
      font-size: 0.8rem;
    }
  }


`;

const Chapter = styled.div`
  position: absolute;
  height: 100%;
  z-index: 98;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${props => props.theme.primaryColor};


  div {
    text-align: center;
    padding-top: 20vh;
    max-width: 50%;

    span {
      display: inline-block;
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 1.5rem;
      font-weight: 100;
    }

    h2 {
      color: #fff;
      letter-spacing: 2px;
      font-size: 3rem;
      border: none;
    }
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
  opacity: .9;
  width: 400px;
  top: ${props => props.coordY};
  left: ${props => props.coordX};
  height: 87px;
  transition: all 0.2s;
  display: flex;
  padding-left: 20px;
  justify-content: left;
  align-items: center;
  visibility: ${props => props.mouseOverCard ? "visible" : "hidden"};

  h3 {
    color: rgba(255, 255, 255, .6);
    margin: 0;
    text-transform: uppercase;
    font-size: 1rem;
    letter-spacing: 1px;

    span {
      color: rgba(255, 255, 255, .9);
      text-transform: capitalize;
      font-size: 1.4rem;
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

export {
  Container,
  Chapter,
  NavigationBottom,
  Card,
  MainHeading
}