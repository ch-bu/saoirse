import React, { Component } from "react"
import ReactDOM from 'react-dom'
import rehypeReact from "rehype-react"
import { Link } from "gatsby"
import Shell from '../layouts/shell';
import { graphql } from "gatsby"
import Helmet from 'react-helmet';
import Url from 'url-parse';
import queryString from 'query-string';
import prism from "prismjs/themes/prism-okaidia.css";
import katex from "katex/dist/katex.min.css"
import styled from 'styled-components'

// Markdown components
import Video from "../components/video";
import Audio from "../components/audio";
import SingleChoice from "../components/questions/singlechoice";
import MultipleChoice from "../components/questions/multiplechoice";
import OrderQuestion from "../components/questions/orderquestion";
import Flipcard from "../components/questions/flipcard";
import VideoModeling from "../components/questions/youtubevideomodeling";

import filterMarkdown from "../components/helper/filter_markdown";

// // Icons 
// import { FaCaretLeft, FaChevronLeft, FaChevronRight, FaFolderPlus, FaFolderMinus, FaAngleRight, FaAngleLeft } from "react-icons/fa";
// import {IoMdMenu, IoMdClose} from "react-icons/io";
// import Reflection from "../assets/icons/reflection.png";
// import Question from "../assets/icons/question.png";
// import Instruction from "../assets/icons/instruction.png";
// import VideoIcon from "../assets/icons/video.png";
// import Exercise from "../assets/icons/exercise.png";
// import Information from "../assets/icons/info.png";
// import Poll from "../assets/icons/poll.png";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(100vh, auto);
  grid-template-areas: "main";

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    grid-template-columns: 7vw calc(100vw - 7vw) ;
    grid-template-rows: 92vh 8vh;
    grid-template-areas: "sidebar main"
                         "sidebar nav";
  }
`;

const Main = styled.div`
  grid-area: main;
`;

const Chapter = styled.div`
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to right top, #3690ff, #00b8ff, #00d4e3, #00e68a, #a8eb12);
`;

const Sidebar = styled.div`
  background-color: #1f232b;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 8vh;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    grid-area: sidebar;
    width: 100%;
    height: 100%;
    position: relative;
  }
`;

const NavigationBottom = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  transform: translateX(-100vw);
  background-color: rgba(0, 0, 0, .8);

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    grid-area: nav;
    position: relative;
    height: 100%;
    width: 100%;
    transform: translateX(0);
  }
`;

class Module extends Component {
  constructor(props) {
    super(props);

    // Filter markdown files for current chapter
    const [markdownSubunits, markdownCurrent, 
           markdownFirsts] = [...filterMarkdown(this.props.data.allMarkdownRemark.edges, 
                                                          this.props.location)];

    this.state = {
      data: this.props.data.allMarkdownRemark.edges,
      markdownCurrent,
      markdownSubunits,
      markdownTitle: markdownCurrent.frontmatter.title,
      markdownChapter: markdownCurrent.frontmatter.moduleTitle
    };
  }

  render() {
    return (
      <div>
        <Shell>
          <Container>
            <Main>
              <Chapter></Chapter>
            </Main>
            <Sidebar>Sidebar</Sidebar>
            <NavigationBottom>Navigation_bottom</NavigationBottom>
          </Container>
        </Shell>
      </div>    
    )
  }
}

export const query = graphql`
  {allMarkdownRemark(sort: {fields: [frontmatter___module,
                                     frontmatter___unit, frontmatter___subunit]}) {
      edges {
        node {
          excerpt
          htmlAst
          frontmatter {
            moduleTitle
            unitTitle
            title
            type
            module
            subunit
            unit
          }
        }
      }
    }
  }
`;

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

export default Module


