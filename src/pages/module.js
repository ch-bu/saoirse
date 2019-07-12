import React, { Component } from "react"
import Shell from '../layouts/shell';
import { graphql } from "gatsby"
import Helmet from 'react-helmet';
import filterMarkdown from "../components/helper/filter_markdown";
import SubNav from '../components/unitpage/subnav';
import MarkdownComponent from '../components/unitpage/markdown';
import Heading from '../components/unitpage/heading';
import getNextPrevious from "../components/helper/next_and_previous";
import { Spring, config } from 'react-spring/renderprops.cjs';
import styled from 'styled-components';

const Container = styled.div`
  overflow: hidden;
  width: 100vw;
  background-color: hsl(0, 0%, 95%);
  /* background-color: #eafbff; */
  /* background-image: linear-gradient(to bottom right, #f7f7f7, #eafbff); */
`;


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
      menuOpen: false,
      mouseOverCard: false
    };

    // Ref
    this.menuCard = React.createRef();

    // Methods
    this.updateCurrentMarkdown = this.updateCurrentMarkdown.bind(this);
    this.linkIsActive = this.linkIsActive.bind(this);
  }

  render() {
    console.log("rendered");
    return (
      <div>
        <Shell>
          {this.state.markdownCurrent ? <Helmet>
            <title>{this.state.markdownCurrent.length !== 0 ? this.state.markdownCurrent.frontmatter.title : ""}</title>
          </Helmet> : ""}
          <Container>
          <Heading unit={this.state.markdownCurrent ? (this.state.markdownCurrent.length !== 0 ? this.state.markdownCurrent.frontmatter.unitTitle : "") : ""}
                   units={this.state.markdownCurrentSubunits}
                   unitStarters={this.state.markdownStarters}
                   markdownCurrent={this.state.markdownCurrent}
                   updateCurrentMarkdown={this.updateCurrentMarkdown}>
          </Heading>
          <SubNav linkIsActive={this.linkIsActive} 
                  markdowns={this.state.markdownCurrentSubunits}
                  updateCurrentMarkdown={this.updateCurrentMarkdown}></SubNav>
          <Spring
              delay={100}
              from={{ 
                opacity: 0,
                transform: "scale(0.9)" }}
                to={{ opacity: 1, transform: "scale(1)"  }}
                config={{duration: 200}}>
              {props => <MarkdownComponent style={props}
                        markdownCurrent={this.state.markdownCurrent}></MarkdownComponent>}
          </Spring>
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
      50
    );
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

export default Module


