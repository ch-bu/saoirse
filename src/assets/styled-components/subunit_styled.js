import styled from 'styled-components'

const Checkbox = styled.input`
  position: absolute;
  left: -300px;
  top: -300px;
`;

const Container = styled.div`
  height: 100vh;
  max-width: 100%;
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: 50px auto;
  grid-template-areas: ". ."
                       "main main";
  transition: width 0.2s;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    grid-template-areas: ". ."
                         ". main";
    width: ${props => props.showAsideLeft ? "100%" : "60vw"};
    margin: 0 auto;
    grid-template-columns: ${props => props.showAsideLeft ? "20% 80%" : "0% 100%"};
  }
`;

const BottomNavigation = styled.div`
  z-index: 88;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
   display: none;
  }

  position: fixed;
  display: flex;
  justify-content: space-between;
  bottom: 0;
  left: 0;
  height: 60px;
  width: 100vw;
  background-color: #fff;
  border-top: 1px solid #ccc;

  a {
    padding: 0 20px;
    align-self: stretch;
    display:flex;
    align-items:center;

    svg {
      color: black;
      pointer-events: none;
    }
  }
`;

const TopNav = styled.div`
  width: 100%;
  flex-wrap: wrap;
  flex-basis: 100vw;
  height: 70px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  transition: background-color 0.4s;
  font-size: 1rem;
  box-shadow: 5px 5px 20px 0 rgba(46,61,73,.2);
  border-bottom: 1px solid #ccc;
  z-index: 99;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    flex-wrap: nowrap;
    position: fixed;
    height: 50px;
    flex-basis: 20vw;
    top: 0;
    left: 0;
    width: 100vw;
    transition: width display 0.2s;
  }
  
  div:first-child {
    width: 100%;
    display: flex;
    position: relative;
    height: 100%;
    flex-direction: row;
    align-self: stretch;
    border-bottom: none;
    border-right: none;
    transition: background-color 0.3s;

    a {
      padding: 0 20px;
      align-self: stretch;
      display: flex;
      align-items:center;
      color: #000;
      transition: color 0.2s;
      text-decoration: none;
    }

    @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
      background-color: rgb(245, 245, 245);
      width: 20%;
      display: ${props => props.showAsideLeft ? "flex" : "none"};

      a {
        color: #fff;
        color: #000;
      }
    }

    a:first-child {
      flex-grow: 1;
      align-self: stretch;
      display:flex;
      align-items:center;

      svg {
        display: block;
        margin: auto;
        height: 25px;
      }
    }

    a:nth-child(2) {
      flex-grow: 8;
    }

    &:hover {
      background-color: #e5e5e5;
    }
  }

  div:nth-child(2) {
    display: fixed;
    top: -1000px;
    left: -1000px;
    text-align: center;
    align-self: center;
    color: #000;
    position: relative;

    svg {
      position: absolute;
      top: 0px;
      left: 15px;
      height: 25px;
      width: 25px;
      color: #000;
      cursor: pointer;
    }

    @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
      width: ${props => props.showAsideLeft ? "75vw" : "100vw"};
      display: block;
      top: 0px;
      left: 0px;
    }
  }
`;

const PreviousButton = styled.div`
  display: ${props => props.showAsideLeft ? "none" : "flex"};
  position: fixed;
  height: 100vh;
  left: 0vw;
  align-items: stretch;
  cursor: pointer;

  a {
    height: 100%;
    display: flex;

    svg {
      align-self: center;
      height: 60px;
      pointer-events: none;
      width: 300px;
      color: #ccc;
    }
  }

  &:hover {
    background-color: #f9f9f9;
  }
`;

const NextButton = styled.div`
  display: ${props => props.showAsideLeft ? "none" : "flex"};
  position: fixed;
  height: 100vh;
  right: 0vw;
  align-items: stretch;
  cursor: pointer;

  a {
    height: 100%;
    display: flex;

    svg {
      align-self: center;
      height: 60px;
      pointer-events: none;
      width: 300px;
      color: #ccc;
    }
  }

  &:hover {
    background-color: #f9f9f9;
  }
`;

export {
  Container,
  Checkbox,
  NextButton,
  PreviousButton,
  TopNav,
  BottomNavigation
}