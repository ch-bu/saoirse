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

  @media only screen and (min-width: 900px) {
    grid-template-areas: ". main"
                         ". main";
    width: ${props => props.showAsideLeft ? "100%" : "60vw"};
    margin: 0 auto;
    grid-template-columns: ${props => props.showAsideLeft ? "25% 75%" : "0% 100%"};
  }
`;

const BottomNavigation = styled.div`
  z-index: 88;

  @media only screen and (min-width: 900px) {
   display: none;
  }

  position: fixed;
  display: flex;
  justify-content: space-between;
  bottom: 0;
  left: 0;
  height: 60px;
  width: 100vw;
  background-color: #fbfafc;
  border-top: 1px solid #ede7f3;

  a {
    padding: 0 20px;
    align-self: stretch;
    display:flex;
    align-items:center;

    svg {
      color: #385c8f;
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
  background-color: #282c35;
  padding-top: 20px;
  transition: bottom 0.2s;
  padding: 0px 0 80px 0;
  overflow-x: hidden;
  border-right: 1px solid #20232a;

  @media only screen and (min-width: 900px) {
    padding: 70px 0 20px 0;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    height: 100vh;
    /* width: 25vw; */
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

  @media only screen and (min-width: 900px) {
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
          font-size: 0.8rem;
          text-decoration: none;
          background-image: none;
          text-shadow: none;

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

        img {
          height: 20px;
          padding-right: 10px;
          margin: 0;
        }
      }
    }
  }
`;

const ButtonLerneinheiten = styled.div`
  width: 100%;
  height: 80px;
  background-color: #20232a;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  transition: background-color 0.4s;
  font-size: 0.9rem;
  font-style: italic;

  div:first-child {
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-self: stretch;
    background-color: #20232a;
    border-bottom: 1px solid #393f4b;
    border-right: 1px solid #393f4b;
    transition: background-color 0.2s;

    a {
      padding: 0 20px;
      align-self: stretch;
      display:flex;
      align-items:center;
      color: rgb(183, 183, 183);
      transition: color 0.2s;
      font-style: italic;
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
      color: #bb6d8c;
      cursor: pointer;
    }
  }

  @media only screen and (min-width: 900px) {
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
  height: 100%;
  overflow-y: hidden;
  background-color: #000;

  @media only screen and (min-width: 900px) {
    top: 0px;
    /* width: ${props => props.showAsideLeft ? "75vw" : "100vw"}; */
  }

  video, iframe {
    height: 100%;
    width: 100%;
  }
`;

const Main = styled.div`
  grid-area: main;
  padding-left: 0;
  margin: 0 auto;
  width: 90%;
  font-size: 0.9rem;
  margin-bottom: 10vh;
  
  h1 {
    margin-top: 0;
  }
  
  h1:first-child {
    font-size: 1.6rem;

    @media only screen and (min-width: 900px) {
      font-size: 2rem;
    }
  }

  h2 {
    font-size: 1.4rem;
  }

  input[type=checkbox]:checked ~ h1 {
    color: red;
  }

  @media only screen and (min-width: 900px) {
    width: 80%;
    font-size: 1rem;
    padding-top: 90px;

    h1 {
      margin-top: 2rem;
    }
  }

  @media only screen and (min-width: 1200px) {
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
    transition: all 100ms cubic-bezier(0.4, 0, 0.2, 1);
    border-bottom: 1px solid #e0d6eb;
    box-shadow: inset 0 -2px 0px 0px #e0d6eb;
    font-weight: bold;

    &:hover {
      background: #bbeffd;
      border-radius: 5px;
    }
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
  }
`;

export {
  Container,
  Aside,
  Main,
  Checkbox,
  UlAside,
  VideoMain,
  BottomNavigation,
  ButtonLerneinheiten
}