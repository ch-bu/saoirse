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
  /* height: 70px; */
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

const SubNav = styled.div`
  position: fixed;
  /* top: 70px; */
  top: 7vh;
  left: 0;
  width: 100vw;
  /* min-height: 30px; */
  min-height: 7vh;
  margin-left: 0vw;
  background-color: #fff;
  border-bottom: 1px solid rgb(236, 236, 236);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  opacity: 0.96;
  z-index: 92;
  box-shadow: 5px 4px 25px 0 rgba(46,61,73,.2);

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    width: 94vw;
    margin-left: 6vw;
  }

  a {
    color: #dbdbdb;
    text-align: center;
    flex: 1;
    font-size: 0.8rem;
    text-decoration:none;
    transition: color 0.2s;

    &:hover {
      /* color: ${props => props.theme.primaryColor}; */
      color: rgba(0, 0, 0, .6);
    }
  }

  span {
    display: none;

    @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
      display: inline;
    }
  }

  .active {
    color: rgba(0, 0, 0, .6);
  }
`;

const MarkdownDocument = styled.div`
  width: 100%;
  min-height: 80vh;
  padding-top: 14vh;

  & > div {
    width: 90%;
    padding-bottom: 20vh;
    padding-top: 7vh;

    @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
      width: 60%;
    }

    margin: 0 auto;
  }

  h1, h2, h3 {
    font-weight: 700;
    color: rgba(0, 0, 0, .8);
  }
  
  h1 {
    margin-top: 0;
    font-size: 4rem;
    border: none;
  }
  
  h2 {
    font-size: 1.4rem;
    border: none;
    margin-top: 40px;

    @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
      font-size: 1.9rem;
    }
  }

  h3 {
    font-size: 1.2rem;
    border: none;
    margin-top: 40px;

    @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
      font-size: 1.7rem;
    }
  }

  input[type=checkbox]:checked ~ h1 {
    color: red;
  }

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    font-size: 1rem;

    p, li {
      font-size: 1.3rem;
    }

    h1 {
      margin-top: 2rem;
    }

    code {
      font-size: 1.3rem;
    }
  }

  iframe {
    width: 100%;
    padding: 2vh 0;
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

  .gatsby-highlight {
    margin: 2.3rem 0;
  }

  span.katex {
    margin: 2.3rem 0;
  }

  blockquote {
      margin-left: 0;
      margin-right: 1.6rem;
      margin-top: 1.6rem;
      padding: 0.8rem;
      margin-bottom: 1.6rem;
      border-left: 0.4rem solid ${props => props.theme.colorTopNavigation};
      color: hsla(291, 0%, 18%,0.9);
      background-color: #e5ecf4;
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

const VideoContainer = styled.div`
  position: relative;
  top: 0;
  height: 86vh;
  width: 100% !important;
  padding-bottom: 0 !important;
  padding-top: 0 !important;
  overflow-y: hidden;

  video, iframe {
    position: relative;
    max-height: 86vh;
    height: 100%;
    width: 100%;
    z-index: 100;
    padding: 0 !important;
  }

  div {
    position: relative;
    height: 100%;
  }

  .gatsby-resp-iframe-wrapper {
    position: relative;
    height: 100% !important; 
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


const NavigationButtons = styled.div`
  visibility: hidden;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    visibility: visible;
    position: fixed;
    bottom: 2vh;
    right: 4vh;
    display: flex;
    width: 100px;
    height: 80px;
    align-items: center;

    a {
      color: #000;
      text-decoration: none;
      margin: 0;
      padding: 0;
    }

    a.previous {
      position: absolute;
      top: 0;
      left: 0;
    }

    a.next {
      position: absolute;
      top: 0;
      right: 0;
    }

    svg {
      height: 35px;
      width: 35px;
      transition: all 0.1s;
      cursor: pointer;

      &:hover {
        transform: scale(1.3);
      }
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

const Menu = styled.div`
  background-color: #1f232b;
  min-height: 100vh;
  width: 6vw;
  position: fixed;
  z-index: 99;
  top: 0;
  left: -100vw;
  display: grid;
  grid-template-rows: 10vh 80vh 10vh;
  grid-template-columns: 1fr 2fr;
  grid-template-areas: ". ."
                       "nav nav"
                       "back back";


  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    left: 0;
  }

  div.modules {
    grid-area: back;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: stretch;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;

      &:hover > svg {
        color: rgba(255, 255, 255, .9);
      }

      svg {
        color: rgba(255, 255, 255, .7);
        font-size: 1.8rem;
      }
    }
  }

  div.chapters {
    grid-area: chapters;
    transform: rotate(180deg);
    letter-spacing: 1px;
    writing-mode:vertical-rl; 
    align-self: center;
    justify-self: right;
    color: rgba(255, 255, 255, .7);
    cursor: default;
  }

  ul {
    grid-area: nav;
    margin: 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    justify-self: center;
    align-items: stretch;
    /* width: 1px; */
    /* background: ${props => props.theme.primaryColor}; */
    /* opacity: .9; */
    
    li {
      position: relative;
      height: 100%;

      a {
        position: absolute;
        top: -50%;
        left: -25px;
        width: 100px;
        height: 100%;
        z-index: 150;


        &.active + span:after {
          margin: -5px -13px;
          height: 26px;
          width: 26px;
          transform: scale(.825);
        }

        &.active + span:before {
          height: 20px;
          width: 20px;
          margin: -2px -10px;
        }
      }

      &:after {
        content: "";
        border-left: 1px dotted ${props => props.theme.primaryColor};
        height: 100%;
        width: 1px;
        position: absolute;
        left: 0;
        top: 0;
      }

      &:last-child:after {
        height: 0px;
      }
    }

    span.dot {
        width: 50px;
        left: 50%;
        position: absolute;
        width: 25px;
        left: 13px;
        top: 0;
        bottom: 0;
        margin: -10px -25px;
        cursor: pointer;

        &:before {
          /* Das sind die Punkte */
          background: ${props => props.theme.primaryColor};
          border-radius: 50%;
          content: "";
          display: block;
          height: 16px;
          left: 50%;
          margin: 0 -8px;
          position: absolute;
          top: 0px;
          transform: scale(.625);
          transition: transform .5s cubic-bezier(0.5, 0, 0.2, 1);
          width: 16px;
        }

        &:after {
          /* Das sind die runden Kreise */
          content: "";
          display: block;
          position: absolute;
          left: 50%;
          top: 0px;
          margin: 0px -8px;
          height: 16px;
          border-radius: 50%;
          width: 16px;
          border: 1px solid ${props => props.theme.primaryColor};
          transition: transform .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform: scale(.68462);
      }
    }
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
  MarkdownDocument,
  Chapter,
  NavigationButtons,
  NavigationBottom,
  Menu,
  VideoContainer,
  Card,
  SubNav,
  MainHeading
}