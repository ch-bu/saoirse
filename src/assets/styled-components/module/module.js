import styled from 'styled-components'


const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(100vh, auto);
  grid-template-areas: "main";
  overflow: hidden;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    grid-template-columns: 7vw calc(100vw - 7vw) ;
    grid-template-rows: 94vh 6vh;
    grid-template-areas: "sidebar main"
                         "sidebar nav";
  }
`;

const Main = styled.div`
  grid-area: main;
  max-height: 100%;
  overflow-y: scroll;
`;

const MarkdownDocument = styled.div`
  margin-top: 5vh;
  width: 100%;

  & > div {
    width: 60%;
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
  
  h1:first-child {
    font-size: 1.7rem;

    @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
      font-size: 2.6rem;
    }
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
    /* width: 70%; */
    font-size: 1rem;
    padding-top: 50px;

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

  @media only screen and (min-width: ${props => props.theme.breakpointTwo}) {
    /* width: 60%; */
  }
  
  iframe {
    width: 100%;
    /* height: 50vh; */
    /* box-shadow: 5px 5px 25px 0 rgba(46,61,73,.2); */
    /* padding: 20px 0; */
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

const Chapter = styled.div`
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to right top, #3690ff, #00b8ff, #00d4e3, #00e68a, #a8eb12);
`;

const Sidebar = styled.div`
  background-color: #1f232b;
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  transform: translateX(-100vw);
  background-color: rgba(0, 0, 0, .8);

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    position: relative;
    grid-area: sidebar;
    width: 100%;
    transform: translateX(0);
    height: 100%;
  }
`;

const NavigationButtons = styled.div`
  visibility: hidden;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    visibility: visible;
    position: fixed;
    top: 5vh;
    right: 4vh;
    display: flex;
    width: 100px;
    height: 80px;
    /* justify-content: space-between; */
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
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 8vh;
  background-color: rgba(0, 0, 0, .8);

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    grid-area: nav;
    position: relative;
    height: 100%;
    width: 100%;
  }
`;

export {
  Container,
  Main,
  MarkdownDocument,
  Chapter,
  Sidebar,
  NavigationButtons,
  NavigationBottom
}