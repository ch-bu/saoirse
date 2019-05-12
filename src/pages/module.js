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
import filterMarkdown from "../components/helper/filter_markdown";
import getNextPrevious from "../components/helper/next_and_previous";
import { Container,Main, MarkdownDocument, Chapter, Sidebar, NavigationButtons, NavigationBottom } from '../assets/styled-components/module/module.js';

import { FaArrowCircleLeft, FaArrowCircleRight} from "react-icons/fa";

// Markdown components
import Video from "../components/video";
import Audio from "../components/audio";
import SingleChoice from "../components/questions/singlechoice";
import MultipleChoice from "../components/questions/multiplechoice";
import OrderQuestion from "../components/questions/orderquestion";
import Flipcard from "../components/questions/flipcard";
import VideoModeling from "../components/questions/youtubevideomodeling";


class Module extends Component {
  constructor(props) {
    super(props);

    // Filter markdown files for current chapter
    const [markdownSubunits, markdownFirst] = [...filterMarkdown(this.props.data.allMarkdownRemark.edges, 
                                                          this.props.location)];
                
    const [markdownPrevious, markdownCurrent, markdownNext] = [...getNextPrevious(markdownSubunits, 
      this.props.location)];
    
    this.state = {
      data: this.props.data.allMarkdownRemark.edges,
      markdownSubunits,
      markdownFirst,
      markdownCurrent,
      markdownPrevious,
      markdownNext
    };

    this.updateCurrentMarkdown = this.updateCurrentMarkdown.bind(this);
  }

  render() {
    return (
      <div>
        <Shell>
          <Container>
            <Main>
              <MarkdownDocument>
                <div>
                  {renderAst(this.state.markdownCurrent.htmlAst)}
                </div>
              </MarkdownDocument>
            </Main>
            <Sidebar>Sidebar</Sidebar>
            <NavigationBottom>Navigation_bottom</NavigationBottom>
            <NavigationButtons>
              <Link onClick={this.updateCurrentMarkdown}
                  to={`/module?id=` + this.state.moduleId + 
                       '&unit='      + this.state.nextSubunit[0].node.frontmatter.unit +
                       '&subunit='         + this.state.nextSubunit[0].node.frontmatter.subunit}>
                <FaArrowCircleLeft /> 
              </Link>
              <FaArrowCircleRight onClick={this.updateCurrentMarkdown} />      
            </NavigationButtons>
          </Container>
        </Shell>
      </div>    
    )
  }

  updateCurrentMarkdown() {
    console.log("test");
    // const [markdownPrevious, markdownNext, markdownCurrent] = [...getNextPrevious(this.state.markdownSubunits, 
    //   this.props.location)];

    // return [markdownPrevious, markdownCurrent, markdownNext];
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


