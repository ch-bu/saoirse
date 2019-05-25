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
import SubNav from '../components/unitpage/subnav';
import NavigationLinks from '../components/unitpage/navigationlinks';
import Menu from '../components/unitpage/menu';
import getNextPrevious from "../components/helper/next_and_previous";
import { Container, MarkdownDocument, MainHeading, VideoContainer, Card } from '../assets/styled-components/module/module.js';

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

    this.state = {
      data: this.props.data.allMarkdownRemark.edges,
      markdownSubunits,
      markdownCurrentSubunits,
      markdownStarters,
      markdownFirst,
      markdownCurrent,
      markdownPrevious,
      markdownNext,
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
    // Generate Video?
    let mainComponent;
    if (this.state.markdownCurrent) {
      if (this.state.markdownCurrent.length !== 0) {
        if (this.state.markdownCurrent.frontmatter.type === "video") {
          mainComponent = <VideoContainer>{renderAst(this.state.markdownCurrent.htmlAst)}</VideoContainer>;
        } else {
          mainComponent = renderAst(this.state.markdownCurrent.htmlAst);
        }
      }
    }

    return (
      <div>
        <Shell>
          {this.state.markdownCurrent ? <Helmet>
            <title>{this.state.markdownCurrent.length !== 0 ? this.state.markdownCurrent.frontmatter.title : ""}</title>
          </Helmet> : ""}
          <Menu menuOpen={this.state.menuOpen} 
                onClick={() => {this.setState(prevState => ({menuOpen: !prevState.menuOpen}))}}
                markdownCurrentSubunits={this.state.markdownCurrentSubunits}
                markdownCurrent={this.state.markdownCurrent}
                markdownStarters={this.state.markdownStarters}
                mouseOutCard={this.mouseOutCard}
                showCard={this.showCard}
                updateCurrentMarkdown={this.updateCurrentMarkdown}></Menu>
          <Card coordX={`${this.state.coordX}px`} coordY={`${this.state.coordY}px`}
                showCard={this.state.showCard}
                mouseOverCard={this.state.mouseOverCard}
                >
            <h3>Chapter {this.state.cardNumber}<br /> <span>{this.state.cardTitle}</span></h3>
          </Card>
          <MainHeading>Chapter {this.state.markdownCurrent ? (this.state.markdownCurrent.length !== 0 ? this.state.markdownCurrent.frontmatter.unit : "") : ""}<br />
                  <span>{this.state.markdownCurrent ? (this.state.markdownCurrent.length !== 0 ? this.state.markdownCurrent.frontmatter.unitTitle : "") : ""}</span></MainHeading>
          <SubNav linkIsActive={this.linkIsActive} 
                  markdowns={this.state.markdownCurrentSubunits}
                  updateCurrentMarkdown={this.updateCurrentMarkdown}></SubNav>
          <Container>
            <MarkdownDocument>
              {mainComponent}
            </MarkdownDocument>
            <NavigationLinks markdownPrevious={this.state.markdownPrevious}
                             markdownNext={this.state.markdownNext}
                             updateCurrentMarkdown={this.updateCurrentMarkdown}>
            </NavigationLinks>
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
    const anchorTag = e.target;
    const coordinates = anchorTag.getBoundingClientRect();

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


