import React from "react"
import { Link } from "gatsby"
import { FaArrowLeft} from "react-icons/fa";
import styled, { css } from 'styled-components'
import { IoIosCloseCircle } from "react-icons/io";

const Menu = styled.div`
  background-color: hsla(216, 12%, 16%, 1);
  min-height: 100vh;
  width: 6vw;
  position: fixed;
  z-index: 209;
  top: 0;
  left: -100vw;
  display: grid;
  grid-template-rows: 10vh 80vh 10vh;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: ". ."
                       "nav nav"
                       "back back";
  transition: width 0.2s;

  ${props => props.menuOpen && css`
    left: 0;
    width: 100vw; 
    grid-template-areas: ". ."
                         "nav nav"
                         "back back";
  `}

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    left: 0;
  }

  .menu {
    visibility: hidden;
    grid-area: menu;
    color: rgba(255, 255, 255, .7);
    transform: rotate(-90deg);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    text-transform: uppercase;
    transition: color 0.1s;
    
    @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
      visibility: visible;
    }

    &:hover {
      color: rgba(255, 255, 255, .9);
    }
  }

  div.modules {
    grid-area: back;
    display: flex;
    justify-content: left;
    align-content: center;
    align-items: stretch;
    background-color: hsla(216, 12%, 20%, 1);

    @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
      background-color: hsla(216, 12%, 16%, 1);
    }

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;

      &:hover + svg {
        /* color: rgba(255, 255, 255, .9); */
        color: ${props => props.theme.primaryColorLight};
      }

      svg {
        color: rgba(255, 255, 255, .7);
        color: ${props => props.theme.primaryColorSuperlight};
        font-size: 1.8rem;
      }
    }
  }

  div.chapters {
    grid-area: chapters;
    transform: rotate(180deg);
    letter-spacing: 1px;
    writing-mode:vertical-rl; 
    align-self: center;
    justify-self: right;
    color: rgba(255, 255, 255, .7);
    cursor: default;
  }

  ul {
    grid-area: nav;
    margin: 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    justify-self: left;
    align-items: stretch;
    padding-left: 10vw;

    @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
      justify-self: center;
      padding-left: 0;
    }
    
    li {
      position: relative;
      height: 100%;

      a {
        position: absolute;
        top: -50%;
        left: -25px;
        width: 100px;
        height: 100%;
        z-index: 150;
        outline: none;
        text-indent: -9999px;
        text-decoration: none;
        color: transparent;
        font-size: 1.2rem;

        &.active {
          color: ${props => props.menuOpen ? "#fff" : "transparent"};
        }

        @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
          font-size: 1.7rem;
        }

        &:hover {
          color: transparent;
        }

        ${props => props.menuOpen && css`
          text-indent: 0px;
          color: rgba(255, 255, 255, .6);
          top: -20px;
          left: 25px;
          width: auto;
          min-width: 300px;

          &:hover {
            color: white;
          }
        `}

        span {
          color: rgba(255, 255, 255, .4);
          /* text-transform: capitalize; */
          font-size: 1rem;

          @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
            font-size: 1.4rem;
          }
        }

        &.active + span:after {
          margin: -5px -13px;
          height: 26px;
          width: 26px;
          transform: scale(.825);
        }

        &.active + span:before {
          height: 20px;
          width: 20px;
          margin: -2px -10px;
        }
      }

      &:after {
        content: "";
        border-left: 1px dotted ${props => props.theme.primaryColor};
        height: 100%;
        width: 1px;
        position: absolute;
        left: 0;
        top: 0;
      }

      &:last-child:after {
        height: 0px;
      }
    }

    span.dot {
        width: 50px;
        left: 50%;
        position: absolute;
        width: 25px;
        left: 13px;
        top: 0;
        bottom: 0;
        margin: -10px -25px;
        cursor: pointer;

        &:before {
          /* Das sind die Punkte */
          background: ${props => props.theme.primaryColor};
          border-radius: 50%;
          content: "";
          display: block;
          height: 16px;
          left: 50%;
          margin: 0 -8px;
          position: absolute;
          top: 0px;
          transform: scale(.625);
          transition: transform .5s cubic-bezier(0.5, 0, 0.2, 1);
          width: 16px;
        }

        &:after {
          /* Das sind die runden Kreise */
          content: "";
          display: block;
          position: absolute;
          left: 50%;
          top: 0px;
          margin: 0px -8px;
          height: 16px;
          border-radius: 50%;
          width: 16px;
          border: 1px solid ${props => props.theme.primaryColor};
          transition: transform .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform: scale(.68462);
      }
    }
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  right: 8vw;
  top: 2vh;
  width: 5vw;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    right: 1vw;
  }

  svg {
    color: ${props => props.theme.primaryColor};
    font-size: 3rem;
    cursor: pointer;
  }
`;

class MenuComponent extends React.Component {
  constructor(props) {
    super(props)

    this.linkClicked = this.linkClicked.bind(this);

  }
  render() {
    // Build mainnav for units
    let units = undefined;
    if (this.props.markdownCurrent && this.props.markdownCurrentSubunits) { 
      if (this.props.markdownCurrent.length !== 0 ) {
        units = this.props.markdownStarters.map((markdown, index) => {
          const node = markdown.node.frontmatter;
          const unitActive = node.unit === this.props.markdownCurrent.frontmatter.unit;
    
          return <li key={index}>
                    <Link key={index}
                       onMouseOut={this.props.mouseOutCard}
                       onMouseOver={this.props.showCard}
                       className={unitActive ? "active" : ""}
                       onClick={this.linkClicked}
                       to={`/module/?id=${node.module}&unit=${node.unit}&subunit=${node.subunit}`}
                       chaptername={node.unitTitle}
                       chapternumber={node.unit}><span>Chapter {node.unit}</span><br />{node.unitTitle}
                    </Link>
                    <span className="dot"></span>
                 </li>
        });
      }  
    }

    return (
      <Menu menuOpen={this.props.menuOpen}>
        {/* <div onClick={this.props.toggleMenu}
             className="menu">Menu</div> */}
        <ul>
          {units}
        </ul>
        {this.props.menuOpen ? <CloseIcon onClick={this.props.toggleMenu}><IoIosCloseCircle/></CloseIcon> : ""}
        <div className="modules"><Link to="/"><FaArrowLeft /></Link></div>
      </Menu>
    ); 
  }

  linkClicked() {
    this.props.updateCurrentMarkdown();

    if (this.props.menuOpen) {
      this.props.toggleMenu()
    }
  }
}

export default MenuComponent;
