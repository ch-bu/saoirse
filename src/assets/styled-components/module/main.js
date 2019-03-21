import styled from 'styled-components'

const Main = styled.div`
  grid-area: main;
  position: relative;
  padding-left: 0;
  margin: 0 auto;
  width: 90%;
  font-size: 1rem;
  margin-bottom: 10vh;

  h1, h2, h3 {
    font-weight: 700;
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
    width: 65%;
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
    width: 60%;
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


const VideoMain = styled.div`
  position: relative;
  left: 0;
  top: -51px;
  grid-area: main;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  background-color: #fff;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    top: 0px;
  }

  video, iframe {
    height: 100%;
    width: 100%;
  }
`;

export {
  Main,
  VideoMain
}