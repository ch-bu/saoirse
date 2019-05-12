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

// Markdown components
import Video from "../components/video";
import Audio from "../components/audio";
import SingleChoice from "../components/questions/singlechoice";
import MultipleChoice from "../components/questions/multiplechoice";
import OrderQuestion from "../components/questions/orderquestion";
import Flipcard from "../components/questions/flipcard";
import VideoModeling from "../components/questions/youtubevideomodeling";

// Icons 
import { FaCaretLeft, FaChevronLeft, FaChevronRight, FaFolderPlus, FaFolderMinus, FaAngleRight, FaAngleLeft } from "react-icons/fa";
import {IoMdMenu, IoMdClose} from "react-icons/io";
import Reflection from "../assets/icons/reflection.png";
import Question from "../assets/icons/question.png";
import Instruction from "../assets/icons/instruction.png";
import VideoIcon from "../assets/icons/video.png";
import Exercise from "../assets/icons/exercise.png";
import Information from "../assets/icons/info.png";
import Poll from "../assets/icons/poll.png";

// Styled components
import {Container, TopNav, NextButton, PreviousButton, BottomNavigation } from '../assets/styled-components/subunit_styled.js';
import {Main, VideoMain} from '../assets/styled-components/module/main.js';
import {Aside, UlAside} from '../assets/styled-components/module/aside.js';

class Module extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAside: true,
      showAsideLeft: true,
      data: this.props.data.allMarkdownRemark.edges,
      nextSubunit: [],
      previousSubunit: [],
      moduleId: null,
      title: ""
    };

    // this.myRef = React.createRef();
    this.unitLabels = [];

    // Bind methods
    this.showAside         = this.showAside.bind(this);
    this.toggleAsideLeft   = this.toggleAsideLeft.bind(this);
    this.updateMainContent = this.updateMainContent.bind(this);
    this.linkIsActive      = this.linkIsActive.bind(this);
  }

  componentWillMount() {
    if (this.props.location.href) {
      // Get url parameters
      const url = new Url(this.props.location.href);
      const parsedURL = queryString.parse(url.query);

      this.setState({
        moduleId: parsedURL.id
      });

      // We need images for the aside articles
      const types = {'instruction': Instruction,
                    'question': Question,
                    'poll': Poll,
                    'video': VideoIcon,
                    'videoinstruction': VideoIcon,
                    'exercise': Exercise,
                    'reflection': Reflection,
                    'information': Information};

      // Make sure that the url has all necessary paramters
      if (parsedURL.id && parsedURL.subunit && parsedURL.unit) {
        // Filter all markdown files by module_id
        const subunits = this.state.data.filter((value, index, array) => {
          return value.node.frontmatter.module == parsedURL.id;
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
          return index === current_index + 1;
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
      
          // I need to get the units for each subunit
          const units = {};
          subunits.map(function(unit) {
            return units[unit.node.frontmatter.unit] = unit.node.frontmatter.unitTitle;
          });

          // Get li of subunits
          var unitLi = [];
      
          // Generate li tags for aside
          for (var unit in units) {
            // Get all relevant subunits
            let unitByKey = subunits.filter((subunit) => {
              return subunit.node.frontmatter.unit == unit;
            });

            // Make Dictionary of units with index as key
            let unitSorted = {};
            unitByKey.map((unit) => {
              unitSorted[unit.node.frontmatter.subunit] = {frontmatter: {
                                                          title: unit.node.frontmatter.title,
                                                          unitTitle: unit.node.frontmatter.unitTitle,
                                                          unit: unit.node.frontmatter.unit,
                                                          subunit: unit.node.frontmatter.subunit},
                                                        type: unit.node.frontmatter.type,
                                                        htmlAst:  unit.node.htmlAst};
            });

            // Unit li
            const subunitLi = [];
            
            for (var unit in unitSorted) {
              // Get appropriate type
              let type = types[unitSorted[unit].type];
              
              subunitLi.push(
                <li key={unitSorted[unit].frontmatter.title}>
                  {/* <img alt={unitSorted[unit].type} src={type}></img> */}
                  <Link key={unit} 
                        onClick={this.updateMainContent}
                        to={`/module?id=` + parsedURL.id + 
                              '&unit='      + unitSorted[unit].frontmatter.unit +
                              '&subunit='         + unitSorted[unit].frontmatter.subunit}
                        getProps={this.linkIsActive}>
                      {unitSorted[unit].frontmatter.title}  
                  </Link>
                </li>
              );
            }

            unitLi.push(
              <div id={unitSorted[unit].frontmatter.unitTitle == "Problem" ? "problem" : ""}
                   key={unitSorted[unit].frontmatter.unitTitle}>
                <label htmlFor={unitSorted[unit].frontmatter.unitTitle}
                       data-unit={unitSorted[unit].frontmatter.unit}
                       ref={(label) => { this.unitLabels.push(label) }}
                       className={unitSorted[unit].frontmatter.unit == current_subunit.frontmatter.unit ? "unit-active" : ""}
                       key={unit}>
                       {unitSorted[unit].frontmatter.unitTitle}
                </label>
                <input type="checkbox" 
                  id={unitSorted[unit].frontmatter.unitTitle}
                  className="menu-toggle" />
                <ul className="menu">
                  {subunitLi}
                </ul>
              </div>
              );
          }
      
          this.setState({
            subunits: subunits,
            currentSubunit: current_subunit,
            asideLi: unitLi,
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
    // to /moduleen
    if (parsedURL.id && parsedURL.subunit && parsedURL.unit) {
      // Filter all markdown files by module_id
      const subunits = this.state.data.filter((value, index, array) => {
        return value.node.frontmatter.module == parsedURL.id;
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
        // Highlight active unit programmatically
        // *************************************
        const currentUnitID = current_subunit[0].node.frontmatter.unit;

        this.unitLabels.forEach((label) => {
          const currentLabel = label;
          const unitId = currentLabel.getAttribute('data-unit');

          if (unitId == currentUnitID) {
            currentLabel.classList.add("unit-active");
          } else {
            currentLabel.classList.remove("unit-active");
          }
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

  toggleAsideLeft() {
    const currentState = this.state.showAsideLeft;
    this.setState({ showAsideLeft: !currentState });
  }

  render() {
    return (
      <Shell>      
        {this.state.currentSubunit ? <Helmet>
          <title>{this.state.currentSubunit.frontmatter.title}</title>
        </Helmet> : ""}
      
        {this.state.currentSubunit ? <Container showAsideLeft={this.state.showAsideLeft ? 'showAsideLeft': null}>

          {this.state.nextSubunit.length == 0 ? <a></a> : 
          <NextButton showAsideLeft={this.state.showAsideLeft ? 'showAsideLeft': null}>
            <Link onClick={this.updateMainContent}
                to={`/module?id=` + this.state.moduleId + 
                      '&unit='      + this.state.nextSubunit[0].node.frontmatter.unit +
                      '&subunit='         + this.state.nextSubunit[0].node.frontmatter.subunit}>
                      
                        <FaAngleRight />
                      
            </Link>
          </NextButton>}
          
          {this.state.previousSubunit.length == 0 ? <a></a> : 
          <PreviousButton showAsideLeft={this.state.showAsideLeft ? 'showAsideLeft': null}>
            <Link onClick={this.updateMainContent}
                to={`/module?id=` + this.state.moduleId + 
                      '&unit='      + this.state.previousSubunit[0].node.frontmatter.unit +
                      '&subunit='         + this.state.previousSubunit[0].node.frontmatter.subunit}>
                      <FaAngleLeft />
            </Link>
          </PreviousButton>}

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

          <Aside showAside={this.state.showAside} 
                 currentUnit={this.state.currentUnit}
                 showAsideLeft={this.state.showAsideLeft ? 'showAsideLeft': null}>
            <TopNav showAsideLeft={this.state.showAsideLeft ? 'showAsideLeft': null}>
              <div>
                <Link to="/modules">
                  <FaCaretLeft />
                </Link>
                <Link to="/modules">Lesson {this.state.moduleId}</Link>
              </div>
              <div>
              {this.state.showAsideLeft ? <IoMdClose onClick={this.toggleAsideLeft} />: <IoMdMenu onClick={this.toggleAsideLeft}/>}
                {this.state.currentSubunit.frontmatter.moduleTitle} > {this.state.currentSubunit.frontmatter.unitTitle}
              </div>
            </TopNav>
            
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
              to={`/module?id=` + this.state.moduleId + 
                    '&unit='      + this.state.previousSubunit[0].node.frontmatter.unit +
                    '&subunit='         + this.state.previousSubunit[0].node.frontmatter.subunit}>
                    <FaChevronLeft />
          </Link>}

          <a onClick={this.showAside}>
                    {this.state.showAside == false ? <FaFolderMinus /> : <FaFolderPlus /> }
          </a>

          {this.state.nextSubunit.length == 0 ? <a></a> : 
          <Link onClick={this.updateMainContent}
              to={`/module?id=` + this.state.moduleId + 
                    '&unit='      + this.state.nextSubunit[0].node.frontmatter.unit +
                    '&subunit='         + this.state.nextSubunit[0].node.frontmatter.subunit}>
                    <FaChevronRight /> 
          </Link>}
          
        </BottomNavigation>
      </Shell>
    )
  }

  showAside() {
    this.setState({
      showAside: !this.state.showAside
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


