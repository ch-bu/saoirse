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
      menuOpen: true
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

              <div className="menu-wrapper">
                <h2>Inhaltsverzeichnis</h2>
                <ul>
                  {this.state.aside}
                </ul>
              </div>
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

  componentDidMount() {
    // *************************************
    // Build Aside navigation
    // *************************************

    // I need to get the units for each subunit
    const units = {};
    this.state.markdownSubunits.map(function(unit) {
      return units[unit.node.frontmatter.unit] = unit.node.frontmatter.unitTitle;
    });

    // Get li of subunits
    var unitLi = [];
  
    // Generate li tags for aside
    for (var unit in units) {
      // Get all relevant subunits
      let unitByKey = this.state.markdownSubunits.filter((subunit) => {
        return subunit.node.frontmatter.unit == unit;
      });

      // Make Dictionary of units with index as key
      let unitSorted = {};
      unitByKey.map((unit) => {
        unitSorted[unit.node.frontmatter.subunit] = {frontmatter: {
                                                    title: unit.node.frontmatter.title,
                                                    module: unit.node.frontmatter.module,
                                                    unitTitle: unit.node.frontmatter.unitTitle,
                                                    unit: unit.node.frontmatter.unit,
                                                    subunit: unit.node.frontmatter.subunit},
                                                  type: unit.node.frontmatter.type,
                                                  htmlAst:  unit.node.htmlAst};
      });

      // Unit li
      const subunitLi = [];
        
      for (var unit in unitSorted) {
        console.log(unitSorted[unit]);
        // Get appropriate type
        subunitLi.push(
          <li key={unitSorted[unit].frontmatter.title}>
            <Link key={unit} 
                  onClick={this.updateMainContent}
                  to={`/module?id=` + unitSorted[unit].frontmatter.module + 
                        '&unit='      + unitSorted[unit].frontmatter.unit +
                        '&subunit='         + unitSorted[unit].frontmatter.subunit}>
                  {/* getProps={this.linkIsActive}> */}
                {unitSorted[unit].frontmatter.title}  
            </Link>
          </li>
        );
      } 

      unitLi.push(
        <li id={unitSorted[unit].frontmatter.unitTitle == "Problem" ? "problem" : ""}
              key={unitSorted[unit].frontmatter.unitTitle}>
          <span>{unitSorted[unit].frontmatter.unitTitle}</span>
          <ul className="menu">
            {subunitLi}
          </ul>
        </li>
        );
    }

    // console.log(unitLi);
  
    this.setState({
      aside: unitLi
    });
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


