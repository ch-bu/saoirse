import React from "react"
import { Link } from "gatsby"
import { FaBookOpen, FaInfoCircle, FaTasks, FaVideo} from "react-icons/fa";
import styled from 'styled-components'
import { Transition } from 'react-spring/renderprops.cjs';


const FixedContainer = styled.div`
  position: fixed;
  bottom: -1px;
  left: 0;
  width: 100vw;
  margin-left: 0vw;
  z-index: 92;
  border-top: 1px solid hsl(0, 0%, 96%);
  
  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    left: 10vw;
    top: 100px;
    width: 15vw;
    border-top: 0;
  }
`;

const SubNavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  
  /* box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 9px, rgba(0, 0, 0, 0.12) 0px 2px 4px; */

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    flex-direction: column;
    left: 10vw;
    top: 10vh;
    width: 15vw;
    flex-basis: auto;
  }

  a {
    color: hsla(0, 0%, 0%, .32);
    min-height: 40px;
    background-color: #fff;
    text-align: center;
    flex: 1;
    font-size: 0.8rem;
    text-decoration:none;
    padding: 3px;
    outline: none;
    display: flex;
    /* font-weight: 100; */
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.1s;
    margin-bottom: 1px;
    /* border-left: 5px solid #fff; */
    /* border-top: 1px solid hsl(111, 10%, 90%); */

    @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
      flex-direction: row;
      justify-content: left;
      font-size: 0.9rem;
      text-align: left;
      padding-left: 15px;
      min-height: 60px;
    }

    &:hover {
      color: rgba(0, 0, 0, .5);
    }

    svg {
      color: rgba(0, 0, 0, .1);
    }
  }

  span {
    display: none;
    padding-left: 10px;

    @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
      display: inline;
    }
  }

  .active {
    color: rgba(0, 0, 0, .6);
    font-weight: bold;
    
    /* border-left: 5px solid ${props => props.theme.primaryColor}; */
    /* color: ${props => props.theme.primaryColorLight}; */
    /* background-color: hsl(0, 0%, 95%); */

    svg {
      color: rgba(0, 0, 0, .6);
    }
  }
`;

class SubNav extends React.Component {
  constructor(props) {
    super(props)

    // Image Types for subnavigation
    const markdownIcons = {
      'instruction': <FaBookOpen />,
      'question': <FaTasks />,
      'video': <FaVideo />,
      'information': <FaInfoCircle />
    };

    this.state = {
      markdownIcons,
    };
  }
  render() {

    let subnav = undefined;
    if (this.props.markdowns) {
      // Build elements for current subunit
      subnav = this.props.markdowns.map((markdown, index) => {
        const frontmatter = markdown.node.frontmatter;

        return <Transition key={index}
                           from={{opacity: 0, transform: "translate(-10px, 0px)"}} 
                           enter={{opacity: 1, transform: "translate(0px, 0px)"}} 
                           leave={{opacity: 0, transform: "translate(-100px, 0px)"}}>
                  {props => props => <Link style={props} 
                  onClick={this.props.updateCurrentMarkdown}
                  getProps={this.props.linkIsActive}
                  to={`/module/?id=${frontmatter.module}&unit=${frontmatter.unit}&subunit=${frontmatter.subunit}`}>
                  {this.state.markdownIcons[frontmatter.type]}<span>{frontmatter.title}</span>
                </Link>}
               </Transition>

      });
    }

    return (
      <FixedContainer>
        <SubNavContainer>
          {subnav}
        </SubNavContainer>
      </FixedContainer>
    ); 
  }
}

export default SubNav;
