import React from "react"
import { Link } from "gatsby"
import styled, { css } from 'styled-components'
import { FiHome, FiArrowLeft, FiChevronDown} from "react-icons/fi";
import { GoArrowLeft } from "react-icons/go";

const Heading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  min-height: 8vh;
  background-color: #fff;
  background-color: hsl(222, 14%, 15%);
  width: 100vw;
  /* border-bottom: 1px solid hsl(111, 10%, 80%); */
  
  display: flex;
  align-items: center;
  padding: 0 4vw;
  z-index: 300;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.11) 0px 4px 18px 0px;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    min-height: 70px;
    box-shadow: none;
    padding: 0 10vw;
  }

  a {
    display: flex;
    align-items: center;

    svg {
      /* font-size: 1.8rem; */
      /* height: 30px; */

      @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
        /* font-size: 4.5vh; */
      }

      
      /* color: ${props => props.theme.primaryColor}; */
      color: ${props => props.theme.primaryColorSuperlight};
      transition: color 0.2s;

      &:hover {
        /* color: ${props => props.theme.primaryColorLight}; */
        color: ${props => props.theme.primaryColorLight};
      }
    }
  }

  #right {
    opacity: 0;
    display: none;

    @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
      display: block;
    }
  }
`;

const UnitNavigation = styled.div`
  position: relative;
  background-color: hsl(222, 14%, 27%);
  /* background-color:  ${props => props.theme.primaryColor}; */
  /* border: 1px solid ${props => props.theme.primaryColor}; */
  color: hsl(0, 0%, 86%);
  color: ${props => props.theme.primaryColorSuperlight};
  width: 70vw;
  padding: 10px;
  height: 4vh;
  font-weight: 100;
  font-size: 0.8rem;
  /* font-weight: bold; */
  border-radius: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border 0.2s, background-color 0.1s;
  z-index: 20;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    width: 25vw;
    height: 40px;
    font-size: 0.9rem;
  }

  &:hover {
    border-radius: 0;
    /* background-color:  ${props => props.theme.primaryColor}; */
  }

  &:hover div {
    display: block;
    position: absolute;
    min-width: 100%;
    /* box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 9px, rgba(0, 0, 0, 0.12) 0px 2px 4px; */
  }

  svg {
    color: hsl(0, 0%, 66%);
    color: ${props => props.theme.primaryColorSuperlight};
    font-size: 2rem;
  }
`;

const Menu = styled.div`
    display: none;
    left: 0;
    top: calc(4vh);
    flex: auto;
    flex-direction: column;
    width: 100%;
    margin: 0;
    z-index: 22;


    @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
      top: calc(40px);
    }

    a {
      text-decoration: none;
      padding: 10px;
      /* color: hsl(0, 0%, 36%); */
      color: hsl(0, 0%, 76%);
      justify-content: center;
      border-bottom: 1px solid hsl(222, 14%, 35%);
      /* background-color: hsl(0, 0%, 96%); */
      background-color: hsl(222, 14%, 27%);
      transition: background-color .2s;
      outline: none;

      &.active {
        /* background-color: hsl(193, 94%, 95%); */
        /* background-color: ${props => props.theme.primaryColor}; */
        /* background-color: hsl(222, 14%, 31%); */
        color: ${props => props.theme.primaryColorSuperlight};

        &:hover {
          /* background-color: hsl(193, 94%, 95%); */
          /* background-color: ${props => props.theme.primaryColor}; */
          /* background-color: hsl(222, 14%, 31%); */
        }
      }

      &:hover {
        /* background-color: hsl(0, 0%, 92%); */
        background-color: hsl(222, 14%, 31%);
        /* color: hsl(0, 0%, 96%); */
      }
    }
`;

class HeadingComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    // Build mainnav for units
    let units = undefined;
    if (this.props.unit && this.props.unitStarters) { 
      if (this.props.unit.length !== 0 ) {
        units = this.props.unitStarters.map((markdown, index) => {
          const node = markdown.node.frontmatter;
          const unitActive = node.unit === this.props.markdownCurrent.frontmatter.unit;
    
          return  <Link key={index}
                        className={unitActive ? "active" : ""}
                        to={`/module/?id=${node.module}&unit=${node.unit}&subunit=${node.subunit}`}
                        onClick={this.props.updateCurrentMarkdown}>
                        {node.unitTitle}
                  </Link>;
        });
      }  
    }

    return (
      <Heading>
        <Link to="/"><FiArrowLeft size={35} /></Link>
        <UnitNavigation>
          {this.props.unit} <FiChevronDown />    
          <Menu>
            {units}
          </Menu>
        </UnitNavigation>
        <span id="right">Pseudo</span>
      </Heading>
    ); 
  }
}

export default HeadingComponent;
