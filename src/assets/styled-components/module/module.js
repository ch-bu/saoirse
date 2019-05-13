import styled, { css } from 'styled-components'


const Container = styled.div`
  min-height: 100vh;
  width: 100vw;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    width: 94vw;
    margin-left: 6vw;
  }
`;

const Main = styled.div`
`;

const MainHeading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  width: 100vw;
  margin: 0 auto;
  z-index: 98;
  text-align: center;
  font-size: 1rem;
  font-weight: normal;
  text-transform: uppercase;
  padding: 1vh 0;
  opacity: 0.96;
  text-decoration: none;
  border: none;
  letter-spacing: 1px;
  border-bottom: 1px solid rgb(236, 236, 236);

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    width: 94vw;
    margin-left: 6vw;
  }

  span {
    display: block;
    padding-top: 0px;
    color: rgba(0, 0, 0, .5);
    font-size: 0.8rem;
  }
`;

const MarkdownDocument = styled.div`
  margin-top: 15vh;
  width: 100%;

  & > div {
    width: 90%;

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
  /* flex-direction: row; */
  overflow-x: scroll;
  justify-content: space-between;
  /* overflow-x: hidden; */

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
  /* background-color: #1f232b; */
  background-image: linear-gradient(to right bottom, #1f232b, #25292f, #2b2e34, #313438, #383a3d);
  background-image: linear-gradient(to right bottom, #1f232b, #21252c, #23272d, #25282d, #272a2e);
  min-height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 99;
  top: 0;
  left: -94vw;
  transition: all 0.15s cubic-bezier(.17,.67,.28,.27);
  /* overflow-y: scroll; */

  ${props => props.menuOpen ? css`
    left: 0;
  ` : css`
    color: black;
  `}

  .menu-wrapper {
    margin: 0 auto;
    width: 50%;
    height: 100%;
    padding-top: 10vh;
    color: #fff;

    h2 {
      font-size: 2rem;
      margin-bottom: 3vh;
      color: rgba(255, 255, 255, .8);
      cursor: default;
    }

    ul {
      margin: 0;
      list-style-type: none;

      span {
        font-weight: bold;
        font-size: 1.3rem;
        color: rgba(255, 255, 255, .8);
        cursor: default;
      }

      li {
        color: #fff;

        ul {
          li {
            margin-left: 2vw;
            a {
              color: rgba(255, 255, 255, .8);
              font-size: 1.3rem;

              &:hover {
                text-decoration: none;
                color: rgba(255, 255, 255, 1);
              }
            }
          }
        }

      }
    }
  }

`;

export {
  Container,
  Main,
  MarkdownDocument,
  Chapter,
  Sidebar,
  NavigationButtons,
  NavigationBottom,
  Menu,
  MainHeading
}