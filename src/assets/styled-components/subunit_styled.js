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
  background-color: ${props => props.theme.darkColor};

  a {
    padding: 0 20px;
    align-self: stretch;
    display:flex;
    align-items:center;

    svg {
      color: ${props => props.theme.primaryColor};
      pointer-events: none;
    }
  }
`;

const TopNav = styled.div`
  width: 100%;
  height: 50px;
  /* background-color: ${props => props.theme.darkColor}; */
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  transition: background-color 0.4s;
  font-size: 1rem;
  /* font-style: italic; */
  box-shadow: 5px 5px 20px 0 rgba(46,61,73,.2);
  border-bottom: 1px solid #ccc;
  z-index: 99;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    transition: width display 0.2s;
  }
  
  div:first-child {
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-self: stretch;
    border-bottom: none;
    border-right: none;
    transition: background-color 0.3s;

    a {
      padding: 0 20px;
      align-self: stretch;
      display: flex;
      align-items:center;
      /* color: ${props => props.theme.primaryColorLight}; */
      color: #000;
      transition: color 0.2s;
      text-decoration: none;
      /* font-style: italic; */
    }

    @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
      /* background-color: ${props => props.theme.darkColor}; */
      background-color: rgb(245, 245, 245);
      /* border-right: 1px solid #393f4b; */
      /* border-bottom: 1px solid #393f4b; */
      width: 20vw;
      display: ${props => props.showAsideLeft ? "flex" : "none"};

      a {
        /* color: rgb(183, 183, 183); */
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
    /* color: rgb(183, 183, 183); */
    /* color: #fff; */
    color: #000;
    position: relative;

    svg {
      position: absolute;
      top: 0px;
      left: 15px;
      height: 25px;
      width: 25px;
      color: ${props => props.theme.primaryColor};
      color: #000;
      cursor: pointer;
/* 
      &:hover {
        color: ${props => props.theme.primaryColorLight};
      } */
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