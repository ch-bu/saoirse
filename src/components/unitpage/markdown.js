import React from "react"
import styled from 'styled-components'
import rehypeReact from "rehype-react"
// Markdown components
import Video from "../video";
import Audio from "../audio";
import SingleChoice from "../questions/singlechoice";
import MultipleChoice from "../questions/multiplechoice";
import OrderQuestion from "../questions/orderquestion";
import Flipcard from "../questions/flipcard";
import VideoModeling from "../questions/youtubevideomodeling";

import prism from "prismjs/themes/prism-okaidia.css";
import katex from "katex/dist/katex.min.css"

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

class MarkdownComponent extends React.Component {
  constructor(props) {
    super(props)

  }
  render() {
    // Generate Video?
    let mainComponent;
    if (this.props.markdownCurrent) {
      if (this.props.markdownCurrent.length !== 0) {
        if (this.props.markdownCurrent.frontmatter.type === "video") {
          mainComponent = <VideoContainer>{renderAst(this.props.markdownCurrent.htmlAst)}</VideoContainer>;
        } else {
          mainComponent = renderAst(this.props.markdownCurrent.htmlAst);
        }
      }
    }
    return (
      <MarkdownDocument>
        {mainComponent}
      </MarkdownDocument>
    ); 
  }
}

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { 
    "video": Video,
    "audio": Audio,
    "singlechoice": SingleChoice,
    "multiplechoice": MultipleChoice,
    "orderquestion": OrderQuestion,
    "videomodeling": VideoModeling,
    "flipcard": Flipcard
  },
}).Compiler

export default MarkdownComponent;
