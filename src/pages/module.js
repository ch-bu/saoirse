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
import { Container,Main, Menu, MarkdownDocument, MainHeading, Chapter, Sidebar, NavigationButtons, NavigationBottom } from '../assets/styled-components/module/module.js';

import { FaArrowCircleLeft, FaArrowCircleRight} from "react-icons/fa";

// Markdown components
import Video from "../components/video";
import Audio from "../components/audio";
import SingleChoice from "../components/questions/singlechoice";
import MultipleChoice from "../components/questions/multiplechoice";
import OrderQuestion from "../components/questions/orderquestion";
import Flipcard from "../components/questions/flipcard";
import VideoModeling from "../components/questions/youtubevideomodeling";

// https://whereispoland.com/a-nation-without-a-state/2

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
      markdownNext,
      menuOpen: false
    };

    this.updateCurrentMarkdown = this.updateCurrentMarkdown.bind(this);
  }

  render() {

    // Generate Links
    const PreviousLink = this.state.markdownPrevious ? <Link 
      onClick={() => this.updateCurrentMarkdown("previous")}
      className="previous"
      to={`/module?id=${this.state.markdownPrevious.frontmatter.module}&unit=${this.state.markdownPrevious.frontmatter.unit}&subunit=${this.state.markdownPrevious.frontmatter.subunit}`}>
      <FaArrowCircleLeft />
    </Link> : "";

    const NextLink = this.state.markdownNext ? <Link 
      onClick={() => this.updateCurrentMarkdown("next")}
      className="next"
      to={`/module?id=${this.state.markdownNext.frontmatter.module}&unit=${this.state.markdownNext.frontmatter.unit}&subunit=${this.state.markdownNext.frontmatter.subunit}`}>
      <FaArrowCircleRight />
      </Link> : "";

    return (
      <div>
        <Shell>
          <Menu menuOpen={this.state.menuOpen} 
                onClick={() => {this.setState(prevState => ({menuOpen: !prevState.menuOpen}))}}> 
          </Menu>
          <Container>
            <MainHeading>Chapter {this.state.markdownCurrent.frontmatter.module} <br />
                  <span>{this.state.markdownCurrent.frontmatter.title}</span></MainHeading>
            <Main>
              <MarkdownDocument>
                <div>
                  {renderAst(this.state.markdownCurrent.htmlAst)}
                </div>
              </MarkdownDocument>
            </Main>
            {/* <Sidebar>Sidebar</Sidebar> */}
            {/* <NavigationBottom>
              {this.state.markdownSubunits.map((subunit) => {
                return <a href="#">{subunit.node.frontmatter.title}</a>
              })}
            </NavigationBottom> */}
            <NavigationButtons>
              {PreviousLink}
              {NextLink}     
            </NavigationButtons>
          </Container>
        </Shell>
      </div>    
    )
  }

  updateCurrentMarkdown(direction) {
    // I have to make sure that the url has changed before I get the current component
    setTimeout(
      function() {
        const [markdownPrevious, markdownCurrent, markdownNext] = [...getNextPrevious(this.state.markdownSubunits, 
          this.props.location)];
        
        this.setState({
          markdownCurrent,
          markdownNext,
          markdownPrevious
        });
      }
      .bind(this),
      100
    );
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


