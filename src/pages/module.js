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
import { Container, Menu, MarkdownDocument, MainHeading, VideoContainer, NavigationButtons, SubNav, Card } from '../assets/styled-components/module/module.js';

import { FaArrowCircleLeft, FaArrowCircleRight, FaBookOpen, FaArrowLeft, FaInfoCircle, FaTasks, FaVideo} from "react-icons/fa";

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
    const [markdownSubunits, markdownFirst, 
           markdownCurrentSubunits, markdownStarters] = [...filterMarkdown(this.props.data.allMarkdownRemark.edges, 
                                                          this.props.location)];
    const [markdownPrevious, markdownCurrent, markdownNext] = [...getNextPrevious(markdownSubunits, 
      this.props.location)];

    // Image Types for subnavigation
    const markdownIcons = {
      'instruction': <FaBookOpen />,
      'question': <FaTasks />,
      'video': <FaVideo />,
      'information': <FaInfoCircle />
    };
    
    this.state = {
      data: this.props.data.allMarkdownRemark.edges,
      markdownSubunits,
      markdownCurrentSubunits,
      markdownStarters,
      markdownFirst,
      markdownCurrent,
      markdownPrevious,
      markdownNext,
      markdownIcons,
      showCard: false,
      mouseOverCard: false,
      menuOpen: false
    };

    // Ref
    this.menuCard = React.createRef();

    // Methods
    this.updateCurrentMarkdown = this.updateCurrentMarkdown.bind(this);
    this.linkIsActive = this.linkIsActive.bind(this);
    this.showCard = this.showCard.bind(this);
    this.mouseOutCard = this.mouseOutCard.bind(this);
  }

  render() {
    // Generate Links
    const PreviousLink = this.state.markdownPrevious ? <Link 
      onClick={() => this.updateCurrentMarkdown()}
      className="previous"
      to={`/module?id=${this.state.markdownPrevious.frontmatter.module}&unit=${this.state.markdownPrevious.frontmatter.unit}&subunit=${this.state.markdownPrevious.frontmatter.subunit}`}>
      <FaArrowCircleLeft />
    </Link> : "";

    const NextLink = this.state.markdownNext ? <Link 
      onClick={() => this.updateCurrentMarkdown()}
      className="next"
      to={`/module?id=${this.state.markdownNext.frontmatter.module}&unit=${this.state.markdownNext.frontmatter.unit}&subunit=${this.state.markdownNext.frontmatter.subunit}`}>
      <FaArrowCircleRight />
      </Link> : "";

    // Build elements for current subunit
    const subnav = this.state.markdownCurrentSubunits.map((markdown, index) => {
      const frontmatter = markdown.node.frontmatter;
      return <Link onClick={() => this.updateCurrentMarkdown()}
                   key={index}
                   getProps={this.linkIsActive}
                   to={`/module?id=${frontmatter.module}&unit=${frontmatter.unit}&subunit=${frontmatter.subunit}`}>
               {this.state.markdownIcons[frontmatter.type]}<br /><span>{frontmatter.title}</span>
            </Link>
    });

    // Build mainnav for units
    const units = this.state.markdownStarters.map((markdown, index) => {
      const node = markdown.node.frontmatter;
      const unitActive = node.unit === this.state.markdownCurrent.frontmatter.unit;

      return <li key={index}>
                <Link key={index}
                   onMouseOut={this.mouseOutCard}
                   onMouseOver={this.showCard}
                   className={unitActive ? "active" : ""}
                   onClick={() => this.updateCurrentMarkdown()}
                   to={`/module?id=${node.module}&unit=${node.unit}&subunit=${node.subunit}`}
                   chaptername={node.unitTitle}
                   chapternumber={node.unit}>
                </Link>
                <span className="dot"></span>
             </li>
    });

    return (
      <div>
        <Shell>
          {this.state.markdownCurrent ? <Helmet>
            <title>{this.state.markdownCurrent.frontmatter.title}</title>
          </Helmet> : ""}
          <Menu menuOpen={this.state.menuOpen} 
                onClick={() => {this.setState(prevState => ({menuOpen: !prevState.menuOpen}))}}> 
            <ul>
              {units}
            </ul>
            <div className="modules"><Link to="/modules"><FaArrowLeft /></Link></div>
            {/* <div className="chapters"><span>Chapters</span></div> */}
          </Menu>
          <Card coordX={`${this.state.coordX}px`} coordY={`${this.state.coordY}px`}
                showCard={this.state.showCard}
                mouseOverCard={this.state.mouseOverCard}
                >
            <h3>Chapter {this.state.cardNumber}<br /> <span>{this.state.cardTitle}</span></h3>
          </Card>
          <MainHeading>Chapter {this.state.markdownCurrent.frontmatter.unit} <br />
                  <span>{this.state.markdownCurrent.frontmatter.unitTitle}</span></MainHeading>
          <SubNav>
            {subnav}
          </SubNav>
          <Container>
            {/* <Chapter>
              <div>
                <span>Chapter {this.state.markdownCurrent.frontmatter.module}</span>
                <h2>{this.state.markdownCurrent.frontmatter.unitTitle}</h2>
              </div>
            </Chapter> */}
            <MarkdownDocument>
              {this.state.markdownCurrent.frontmatter.type === "video" ? <VideoContainer>{renderAst(this.state.markdownCurrent.htmlAst)}</VideoContainer> : 
              <div>
                {renderAst(this.state.markdownCurrent.htmlAst)}
              </div>}
            </MarkdownDocument>
            <NavigationButtons>
              {PreviousLink}
              {NextLink}     
            </NavigationButtons>
          </Container>
        </Shell>
      </div>    
    )
  }

  updateCurrentMarkdown() {
    // I have to make sure that the url has changed before I get the current component
    setTimeout(
      function() {
        const [markdownPrevious, markdownCurrent, markdownNext, 
               markdownCurrentSubunits] = [...getNextPrevious(this.state.markdownSubunits, 
          this.props.location)];

        this.setState({
          markdownCurrent,
          markdownNext,
          markdownPrevious,
          markdownCurrentSubunits
        });
      }
      .bind(this),
      100
    );
  }


  mouseOutCard() {
    this.setState({
      mouseOverCard: false,
    });
  }

  showCard(e) {
    console.log(e.target);
    const anchorTag = e.target;
    const coordinates = anchorTag.getBoundingClientRect();
    console.log(coordinates);

    // Only update state when mouse is indeed on another link
    if (coordinates["y"] !== this.state.coordY) {
      this.setState({
        coordX: coordinates["x"] + 100,
        // The card is 82 px high. This math is to adjust the card to 
        // the middle of the navigation
        coordY: coordinates["y"] + coordinates["height"] / 2 - (82 / 2),
        cardTitle: anchorTag.getAttribute("chaptername"),
        cardNumber: anchorTag.getAttribute("chapternumber"),
        mouseOverCard: true,
      });
    }
  }

  linkIsActive(e) {
    return e.href.includes(this.props.location.search) ? {className: "active" } : null;
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


