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
  grid-template-rows: 40px auto;
  grid-template-areas: ". ."
                       "main main";
  transition: width 0.2s;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    grid-template-areas: ". ."
                         ". main";
    width: ${props => props.showAsideLeft ? "100%" : "60vw"};
    margin: 0 auto;
    grid-template-columns: ${props => props.showAsideLeft ? "25% 75%" : "0% 100%"};
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
  /* border-top: 1px solid #ede7f3; */

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

const Aside = styled.div`
  position: fixed;
  z-index: 1;
  bottom: ${props => props.showAside ? "-100vh" : "0vh"};
  height: 100vh;
  width: ${props => props.showAside ? "100vw" : "100vw"};
  overflow-y: scroll;
  box-sizing: border-box;
  background-color: ${props => props.theme.darkColorLight};
  padding-top: 20px;
  transition: bottom 0.2s;
  padding: 0px 0 80px 0;
  overflow-x: hidden;
  border-right: 1px solid ${props => props.theme.darkColor};

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    padding: 70px 0 20px 0;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    height: 100vh;
    transition: width 0.2s;
    width: ${props => props.showAsideLeft ? "25vw" : "0vw"};
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const UlAside = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 1rem 1rem;
  color: #fff;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    padding: 1rem 1.8rem;
  }

  li {

    a {
      color: rgb(183, 183, 183);
    }

    ul {
      margin: 0;
      padding-left: 0.4rem;
      color: #000;

      li {
        padding-bottom: 0.1rem;
        margin-bottom: 0;
        display: flex;
        flex-direction: row;
        
        &:first-child {
          padding-top: 0.2rem;
        }

        a {
          color: rgb(183, 183, 183);
          font-size: 0.9rem;
          text-decoration: none;
          background-image: none;
          text-shadow: none;
          outline: none;

          &:hover {
            color: #7f7f7f;
          }

          li > &:hover {
            border-right: 4px solid red;
          }

          &.active {
            font-weight: bold;
            color: #fff;
          }
        }

        svg {
          /* color: white; */
          color: ${props => props.theme.primaryColorLight};
          padding-right: 6px;
          filter: sepia(0.4);
          height: 18px;
        }

        /* img {
          height: 20px;
          padding-right: 10px;
          margin: 0;
        } */
      }
    }
  }
`;

const ButtonLerneinheiten = styled.div`
  width: 100%;
  height: 80px;
  background-color: ${props => props.theme.darkColor};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  transition: background-color 0.4s;
  font-size: 0.9rem;
  font-style: italic;
  box-shadow: 5px 10px 25px 0 rgba(46,61,73,.2);

  div:first-child {
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-self: stretch;
    /* background-color: ${props => props.theme.primaryColor}; */
    border-bottom: none;
    border-right: none;
    transition: background-color 0.2s;

    a {
      padding: 0 20px;
      align-self: stretch;
      display:flex;
      align-items:center;
      color: ${props => props.theme.primaryColorLight};
      transition: color 0.2s;
      font-style: italic;
    }

    @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
      background-color: ${props => props.theme.darkColor};
      border-right: 1px solid #393f4b;
      border-bottom: 1px solid #393f4b;

      a {
        color: rgb(183, 183, 183);
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
      }
    }

    a:nth-child(2) {
      flex-grow: 4;
    }

    &:hover {
      background-color: #313640;
    }
  }

  div:nth-child(2) {
    display: none;
    text-align: center;
    align-self: center;
    color: rgb(183, 183, 183);
    position: relative;

    svg {
      position: absolute;
      top: 0px;
      left: 15px;
      height: 25px;
      width: 25px;
      color: ${props => props.theme.primaryColor};
      cursor: pointer;

      &:hover {
        color: ${props => props.theme.primaryColorLight};
      }
    }
  }

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    transition: width display 0.2s;

    div:first-child {
      width: 25vw;
      display: ${props => props.showAsideLeft ? "flex" : "none"};
    }

    div:nth-child(2) {
      /* width: 75vw; */
      width: ${props => props.showAsideLeft ? "75vw" : "100vw"};
      display: block;
    }
  }
`;

const VideoMain = styled.div`
  position: relative;
  left: 0;
  top: -41px;
  grid-area: main;
  width: 100%;
  padding-top: 20vh;
  height: 100%;
  overflow-y: hidden;
  background-color: #000;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    top: 0px;
    padding-top: 0;
    /* width: ${props => props.showAsideLeft ? "75vw" : "100vw"}; */
  }

  video, iframe {
    height: 100%;
    width: 100%;
  }
`;

const Main = styled.div`
  grid-area: main;
  position: relative;
  padding-left: 0;
  margin: 0 auto;
  width: 90%;
  font-size: 1rem;
  margin-bottom: 10vh;
  
  h1 {
    margin-top: 0;
  }
  
  h1:first-child {
    font-size: 1.6rem;

    @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
      font-size: 2rem;
    }
  }

  h2 {
    font-size: 1.4rem;
  }

  input[type=checkbox]:checked ~ h1 {
    color: red;
  }

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    width: 80%;
    font-size: 1rem;
    padding-top: 90px;

    p, li {
      font-size: 1.1rem;
    }

    h1 {
      margin-top: 2rem;
    }
  }

  @media only screen and (min-width: ${props => props.theme.breakpointTwo}) {
    width: 60%;
  }
  
  iframe {
    width: 100%;
    height: 50vh;
    box-shadow: 5px 5px 25px 0 rgba(46,61,73,.2);
    padding: 20px 0;
  }

  video {
    width: 100%;
    height: 100%;
    margin-bottom: 2rem;
    box-shadow: 5px 5px 25px 0 rgba(46,61,73,.2);
  }

  audio {
    width: 100%;
    margin-bottom: 2rem;
  }

  a {
    color: #000;
    text-decoration: none;
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
    border-bottom: 1px solid ${props => props.theme.primaryColor};
    box-shadow: inset 0 -2px 0px 0px ${props => props.theme.primaryColor};
    font-weight: bold;

    &:hover {
      background: ${props => props.theme.primaryColorLight};
      border-radius: 5px;
    }
  }

  .gatsby-resp-image-link {
    margin: 40px 0;
    box-shadow: none;
    border: none;
    box-shadow: 5px 5px 25px 0 rgba(46,61,73,.2);
  }

  blockquote {
      margin-left: 0;
      margin-right: 1.6rem;
      margin-top: 1.6rem;
      padding: 0.8rem;
      margin-bottom: 1.6rem;
      border-left: 0.4rem solid #ffe564;
      color: hsla(291, 0%, 18%,0.8);
      background-color: rgba(255, 229, 100, 0.3);
      font-style: italic;
      font-size: 1rem;
  }

  img {
    width: 100%;
    box-shadow: 5px 5px 25px 0 rgba(46,61,73,.4);
  }

  .gatsby-resp-image-image {
    box-shadow: 5px 5px 25px 0 rgba(46,61,73,.4);
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
  Aside,
  Main,
  Checkbox,
  UlAside,
  VideoMain,
  NextButton,
  PreviousButton,
  BottomNavigation,
  ButtonLerneinheiten
}