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

  @media only screen and (min-width: 900px) {
    grid-template-areas: ". main"
                         ". main";
    width: 100vw;
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
  /* align-items: center; */
  bottom: 0;
  left: 0;
  height: 60px;
  width: 100vw;
  /* background-color: #1a2638; */
  background-color: #fbfafc;
  border-top: 1px solid #ede7f3;

  a {
    /* width: 15%; */
    padding: 0 20px;
    align-self: stretch;
    /* text-align: center; */
    display:flex;
    align-items:center;

    svg {
      color: #385c8f;
      pointer-events: none;
    }
  }
`;

const UlAside = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 1rem 1rem;
  color: #fff;
  /* border-right: 1px solid #ede7f3; */

  @media only screen and (min-width: 900px) {
    padding: 1rem 1.8rem;
  }


  li {

    a {
      color: #b7b7b7;
    }

    ul {
      margin: 0;
      padding-left: 0.4rem;
      color: #b7b7b7;

      li {
        padding-bottom: 0.1rem;
        margin-bottom: 0;
        display: flex;
        flex-direction: row;
        
        &:first-child {
          padding-top: 0.2rem;
        }

        a {
          color: #b7b7b7;
          font-size: 0.8rem;
          text-decoration: none;
          background-image: none;
          text-shadow: none;

          &:hover {
            /* background: #bbeffd; */
            /* color: rgb(109, 109, 109); */
            color: #ccc;
            border-radius: 5px;
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

const Aside = styled.div`
  position: fixed;
  z-index: 1;
  bottom: ${props => props.showAside ? "-100vh" : "0vh"};
  height: 100vh;
  width: ${props => props.showAside ? "100vw" : "100vw"};
  overflow-y: scroll;
  box-sizing: border-box;
  /* background-color: #fbfafc; */
  background-color: #1a2638;
  padding-top: 20px;
  transition: bottom 0.2s;
  padding: 0px 0 80px 0;
  overflow-x: hidden;

  @media only screen and (min-width: 900px) {
    /* box-shadow: 5px 0px 32px -2px rgba(204,204,204,1); */
    /* border-right: 1px solid #ede7f3; */
    padding: 0px 0 20px 0;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    height: 100vh;
    width: 25vw;
  }

  &::-webkit-scrollbar {
    display: none;
    /* background-color: green;
    color: red; */
  }
`;

const ButtonLerneinheiten = styled.div`
  width: 100%;
  min-height: 6vh;
  /* background-color: #e1e1e2; */
  /* background-color: #0d131c; */
  background-color: #141e2c;
  /* background-color: rgb(36, 40, 42); */
  /* background-color: #ffefa2; */
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  transition: background-color 0.4s;
  padding: 1.4vh 0;
  /* border-bottom: 1px solid #000; */

  @media only screen and (min-width: 900px) {
    min-height: 9vh;
  }

  &:hover {
    /* background-color: #0f1621; */
    /* background-color: rgba(255,229,100); */
    /* background-color: #ffefa2; */
  }

  &:hover > a {
    /* color: rgba(255,229,100,0.3); */
    color: #ffefa2;
  }

  a {
    /* width: 100%; */
    /* padding: 0 40px; */
    padding: 0 20px;
    align-self: stretch;
    /* text-align: center; */
    display:flex;
    align-items:center;
    color: #ccc;
    transition: color 0.2s;
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
    flex-grow: 6;
    /* color: #385c8f; */
    /* font-weight: bold; */
    /* border-left: 1px solid #ede7f3; */
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
    /* color: #385c8f; */
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
    padding-top: 40px;

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
    /* box-shadow: 5px 5px 25px 0 rgba(46,61,73,.2); */
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