import React, { Component } from "react"
import rehypeReact from "rehype-react"
import Header from '../components/header_lerneinheit';
import { Link, navigate } from "gatsby"
import { graphql } from "gatsby"
import Helmet from 'react-helmet';
import Url from 'url-parse';
import queryString from 'query-string';


// Markdown components
import Video from "../components/video";
import Audio from "../components/audio";
import Quiz from "../components/quiz";
import Chatbot from "../components/chatbot";
import DragDrop from "../components/dragdrop";
import VHI from "../components/e-learning/vhi";
import SWE from "../components/e-learning/swe";
import FESS from "../components/e-learning/fess";
import DragDropAudio from "../components/e-learning/dragdropaudio";

// Icons 
import { FaChevronLeft, FaChevronRight, FaFolderPlus, FaFolderMinus } from "react-icons/fa";

// Images for articles
import instruction from '../assets/icons/instruction.png';
import question from '../assets/icons/question.png';
import poll from '../assets/icons/poll.png';
import videoIcon from '../assets/icons/video.png';
import exercise from '../assets/icons/exercise.png';
import information from '../assets/icons/info.png';
import reflection from '../assets/icons/reflection.png';

// Styled components
import {Container, Aside, Main, UlAside, BottomNavigation, ButtonLerneinheiten } from '../assets/styled-components/subunit_styled.js';
import {VideoMain} from '../assets/styled-components/subunit_styled.js';

class Lerneinheit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAside: true,
      data: this.props.data.allMarkdownRemark.edges,
      nextSubunit: [],
      previousSubunit: [],
      lerneinheitId: null,
      title: ""
    };

    // Bind methods
    this.showAside         = this.showAside.bind(this);
    this.updateMainContent = this.updateMainContent.bind(this);
    this.linkIsActive      = this.linkIsActive.bind(this);
  }

  componentWillMount() {
    if (this.props.location.href) {
      // Get url parameters
      const url = new Url(this.props.location.href);
      const parsedURL = queryString.parse(url.query);

      this.setState({
        lerneinheitId: parsedURL.id
      });

      // We need images for the aside articles
      const types = {'instruction': instruction,
                    'question': question,
                    'poll': poll,
                    'video': videoIcon,
                    'exercise': exercise,
                    'reflection': reflection,
                    'information': information};

      // In case the unit could not be found navigate back
      // to /lerneinheiten
      if (parsedURL.id && parsedURL.subunit && parsedURL.unit) {
        // Filter all markdown files by lerneinheit_id
        const subunits = this.state.data.filter((value, index, array) => {
          return value.node.frontmatter.lerneinheit == parsedURL.id;
        });

        // Get current page
        var current_subunit = subunits.filter((value, index, array) => {
          return value.node.frontmatter.subunit == parsedURL.subunit &&
                value.node.frontmatter.unit     == parsedURL.unit;
        });

        this.setState({
          title: subunits[0].node.frontmatter.title
        });

        // *************************************
        // Next links for side navigation
        // *************************************

        var current_index = subunits.findIndex((value, index) => {
          return value.node.frontmatter.subunit == parsedURL.subunit &&
                value.node.frontmatter.unit     == parsedURL.unit;
        });

        // Get subunit after current subunit
        var next_subunit = subunits.filter((value, index) => {
          return index == current_index + 1;
        });

        // Get subunit before current subunit
        var previous_subunit = subunits.filter((value, index) => {
          return index == current_index - 1;
        });

        this.setState({
          nextSubunit: next_subunit,
          previousSubunit: previous_subunit
        });

        // *************************************
        // Build Aside navigation
        // *************************************

        // Make sure that there is an article found
        if (current_subunit.length > 0) {
          current_subunit = current_subunit[0].node;
      
          // I need to get the modules for each subunit
          // mothers stores the index and the name of the module
          const mothers = {};
          subunits.map(function(unit) {
            mothers[unit.node.frontmatter.subunit] = unit.node.frontmatter.mother;
          });
          
          // Get li of subunits
          var motherLi = [];
      
          // Generate li tags for aside
          for (var mother in mothers) {
      
            // Get all relevant subunits
            let unitWithMotherKey = subunits.filter((subunit) => {
              return subunit.node.frontmatter.subunit == mother;
            });
      
            // Make Dictionary of units with index as key
            let unitSorted = {};
            unitWithMotherKey.map((unit) => {
              unitSorted[unit.node.frontmatter.unit] = {frontmatter: {
                                                          title: unit.node.frontmatter.title,
                                                          unit: unit.node.frontmatter.unit,
                                                          subunit: unit.node.frontmatter.subunit},
                                                        type: unit.node.frontmatter.type,
                                                        htmlAst:  unit.node.htmlAst};
            });
      
            // Unit li
            const unitLi = [];
            for (var unit in unitSorted) {
              // Get appropriate type
              let type = types[unitSorted[unit].type];
              
              unitLi.push(
                <li key={unitSorted[unit].frontmatter.title}>
                  <img alt={unitSorted[unit].type} src={type}></img>
                  <Link key={unit} 
                        onClick={this.updateMainContent}
                        to={`/lerneinheit?id=` + parsedURL.id + 
                              '&subunit='      + unitSorted[unit].frontmatter.subunit +
                              '&unit='         + unitSorted[unit].frontmatter.unit}
                        getProps={this.linkIsActive}>
                      {unitSorted[unit].frontmatter.title}  
                  </Link>
                </li>
              );
            }
      
            motherLi.push(
              <li key={mother}>
                <a key={mother}>{mothers[mother]}
                </a>
          
                <ul>
                  {unitLi}
                </ul>
              </li>);
          }
      
          this.setState   ({
            subunits: subunits,
            currentSubunit: current_subunit,
            asideLi: motherLi,
            showAside: true
          });
        }
      }
    }
  }

  linkIsActive(e) {
    return e.href.includes(this.props.location.search) ? {className: "active" } : null;
  }

  updateMainContent = (e) => {

    // Get url parameters
    const url = new Url(e.target.href);
    const parsedURL = queryString.parse(url.query);

    // In case the unit could not be found navigate back
    // to /lerneinheiten
    if (parsedURL.id && parsedURL.subunit && parsedURL.unit) {
      // Filter all markdown files by lerneinheit_id
      const subunits = this.state.data.filter((value, index, array) => {
        return value.node.frontmatter.lerneinheit == parsedURL.id;
      });

      // Get current page
      var current_subunit = subunits.filter((value, index, array) => {
        return value.node.frontmatter.subunit == parsedURL.subunit &&
              value.node.frontmatter.unit    == parsedURL.unit;
      });

      if (current_subunit.length > 0) {
        this.setState({
          currentSubunit: current_subunit[0].node,
          showAside: true,
        });

        // *************************************
        // Next links for side navigation
        // *************************************

        var current_index = subunits.findIndex((value, index) => {
          return value.node.frontmatter.subunit == parsedURL.subunit &&
                value.node.frontmatter.unit     == parsedURL.unit;
        });

        // Get subunit after current subunit
        var next_subunit = subunits.filter((value, index) => {
          return index == current_index + 1;
        });

        // Get subunit before current subunit
        var previous_subunit = subunits.filter((value, index) => {
          return index == current_index - 1;
        });

        this.setState({
          nextSubunit: next_subunit,
          previousSubunit: previous_subunit
        });
      }
    }
  }

  render() {

    return (
      <div>      
        
        {/* <Header /> */}

        {this.state.currentSubunit ? <Helmet>
          <title>{this.state.currentSubunit.frontmatter.title}</title>
        </Helmet> : ""}
      
        {this.state.currentSubunit ? <Container>

          {this.state.currentSubunit.frontmatter.type == "video" ? 
            <VideoMain>
              {
                renderAst(this.state.currentSubunit.htmlAst)
              }
            </VideoMain> :
            <Main>
              <h1>{this.state.currentSubunit.frontmatter.title}</h1>
              {
                renderAst(this.state.currentSubunit.htmlAst)
              }
            </Main> }

          <Aside showAside={this.state.showAside} >
            <ButtonLerneinheiten>
              <Link to="/lerneinheiten">
                <FaChevronLeft />
              </Link>
              <Link to="/lerneinheiten">Lerneinheiten {this.state.lerneinheitId}: <br />{this.state.title}</Link>
            </ButtonLerneinheiten>
            
            <UlAside>
            {
              this.state.asideLi
            }
            </UlAside>
          </Aside>

        </Container> : ""}

        <BottomNavigation>

          {this.state.previousSubunit.length == 0 ? <a></a> : 
          <Link onClick={this.updateMainContent}
              to={`/lerneinheit?id=` + this.state.lerneinheitId + 
                    '&subunit='      + this.state.previousSubunit[0].node.frontmatter.subunit +
                    '&unit='         + this.state.previousSubunit[0].node.frontmatter.unit}>
                    <FaChevronLeft />
          </Link>}

          <a onClick={this.showAside}>
                    {this.state.showAside == false ? <FaFolderMinus /> : <FaFolderPlus /> }
          </a>

          {this.state.nextSubunit.length == 0 ? <a></a> : 
          <Link onClick={this.updateMainContent}
              to={`/lerneinheit?id=` + this.state.lerneinheitId + 
                    '&subunit='      + this.state.nextSubunit[0].node.frontmatter.subunit +
                    '&unit='         + this.state.nextSubunit[0].node.frontmatter.unit}>
                    <FaChevronRight /> 
          </Link>}
          
        </BottomNavigation>
      </div>
    )
  }

  showAside() {
    this.setState({
      showAside: !this.state.showAside
    });
  }
}

export const query = graphql`
  {allMarkdownRemark(sort: {fields: [frontmatter___lerneinheit,
                                     frontmatter___subunit, frontmatter___unit]}) {
      edges {
        node {
          excerpt
          htmlAst
          frontmatter {
            title
            subunit
            type
            mother
            unit
            lerneinheit
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
    "quiz": Quiz,
    "chatbot": Chatbot,
    "dragdrop": DragDrop,
    "vhi": VHI,
    "swe": SWE,
    "fess": FESS,
    "dragdropaudio": DragDropAudio
  },
}).Compiler

export default Lerneinheit