import React, { Component } from "react"
import Shell from '../layouts/shell';
import { graphql } from "gatsby"
import Helmet from 'react-helmet';
import filterMarkdown from "../components/helper/filter_markdown";
import SubNav from '../components/unitpage/subnav';
// import NavigationLinks from '../components/unitpage/navigationlinks';
import MarkdownComponent from '../components/unitpage/markdown';
import Menu from '../components/unitpage/menu';
import getNextPrevious from "../components/helper/next_and_previous";
import { IoIosMenu } from "react-icons/io";
import { Container, MainHeading, Card, MenuButton} from '../assets/styled-components/module/module.js';

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
      menuOpen: false,
      showCard: true,
      mouseOverCard: false
    };

    // Ref
    this.menuCard = React.createRef();

    // Methods
    this.updateCurrentMarkdown = this.updateCurrentMarkdown.bind(this);
    this.linkIsActive = this.linkIsActive.bind(this);
    this.showCard = this.showCard.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.mouseOutCard = this.mouseOutCard.bind(this);
  }

  render() {
    return (
      <div>
        <Shell>
          {this.state.markdownCurrent ? <Helmet>
            <title>{this.state.markdownCurrent.length !== 0 ? this.state.markdownCurrent.frontmatter.title : ""}</title>
          </Helmet> : ""}
          <MenuButton onClick={this.toggleMenu}><IoIosMenu /></MenuButton>
          <Menu markdownCurrentSubunits={this.state.markdownCurrentSubunits}
                markdownCurrent={this.state.markdownCurrent}
                markdownStarters={this.state.markdownStarters}
                mouseOutCard={this.mouseOutCard}
                menuOpen={this.state.menuOpen}
                toggleMenu={this.toggleMenu}
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
            <MarkdownComponent markdownCurrent={this.state.markdownCurrent}></MarkdownComponent>
            {/* <NavigationLinks markdownPrevious={this.state.markdownPrevious}
                             markdownNext={this.state.markdownNext}
                             updateCurrentMarkdown={this.updateCurrentMarkdown}>
            </NavigationLinks> */}
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

  mouseOutCard() {
    this.setState({
      mouseOverCard: false,
    });
  }

  toggleMenu() {
    console.log("men");
    this.setState(prevState => (
      {menuOpen: !prevState.menuOpen}
    ));
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

export default Module


