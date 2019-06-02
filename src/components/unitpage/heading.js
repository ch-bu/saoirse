import React from "react"
import { Link } from "gatsby"
import styled, { css } from 'styled-components'
import { IoIosCloseCircle } from "react-icons/io";
import { FiHome, FiChevronDown} from "react-icons/fi";

const Heading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  min-height: 8vh;
  background-color: #fff;
  width: 100vw;
  border-bottom: 1px solid hsl(111, 10%, 75%);
  display: flex;
  align-items: center;
  padding: 0 10vw;
  justify-content: space-between;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    min-height: 6.4vh;
  }

  a {
    display: flex;
    align-items: center;

    svg {
      font-size: 1.4rem;

      @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
        font-size: 2.8vh;
      }

      color: ${props => props.theme.primaryColor};
      transition: color 0.2s;

      &:hover {
        color: hsla(193, 98%, 35%, 1);
      }
    }
  }

  #right {
    opacity: 0;
  }
`;

const UnitNavigation = styled.div`
  position: relative;
  background-color: hsl(0, 0%, 86%);
  color: hsl(0, 0%, 46%);
  width: 50vw;
  padding: 10px;
  height: 4vh;
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
  }

  &:hover {
    border-radius: 0;
    background-color: hsl(0, 0%, 92%);
    border-bottom: 1px solid hsl(111, 10%, 85%);
  }

  &:hover div {
    display: block;
    position: absolute;
    min-width: 100%;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 9px, rgba(0, 0, 0, 0.12) 0px 2px 4px;
  }

  svg {
    color: hsl(0, 0%, 66%);
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

    a {
      text-decoration: none;
      padding: 10px;
      color: hsl(0, 0%, 36%);
      justify-content: center;
      border-bottom: 1px solid hsl(111, 10%, 85%);
      background-color: hsl(0, 0%, 96%);
      transition: background-color .2s;

      &.active {
        background-color: ${props => props.theme.primaryColor};
        color: ${props => props.theme.primaryColorSuperlight};

        &:hover {
          background-color: ${props => props.theme.primaryColor};
        }
      }

      &:hover {
        background-color: hsl(0, 0%, 92%);
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
                        to={`/module?id=${node.module}&unit=${node.unit}&subunit=${node.subunit}`}
                        onClick={this.props.updateCurrentMarkdown}>
                        {node.unitTitle}
                  </Link>;
        });
      }  
    }

    return (
      <Heading>
        <Link to="/"><FiHome /></Link>
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
