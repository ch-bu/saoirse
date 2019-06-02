import React from "react"
import { Link } from "gatsby"
import { FaBookOpen, FaInfoCircle, FaTasks, FaVideo} from "react-icons/fa";
import styled from 'styled-components'


const FixedContainer = styled.div`
  position: fixed;
  bottom: 0vh;
  left: 0;
  width: 100vw;
  margin-left: 0vw;
  z-index: 92;
  
  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    left: 10vw;
    top: 10vh;
    width: 15vw;
  }
`;

const SubNavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  align-items: stretch;
  
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 9px, rgba(0, 0, 0, 0.12) 0px 2px 4px;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    flex-direction: column;
    left: 10vw;
    top: 10vh;
    width: 15vw;
    flex-basis: auto;
  }

  a {
    color: hsla(0, 0%, 0%, .32);
    height: 60px;
    text-align: center;
    flex: 1;
    font-size: 0.8rem;
    text-decoration:none;
    padding: 3px;
    outline: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    border-top: 1px solid hsl(111, 10%, 90%);

    @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
      flex-direction: row;
      justify-content: left;
      font-size: 0.9rem;
      text-align: left;
      padding-left: 15px;
    }

    &:hover {
      color: rgba(0, 0, 0, .6);
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
    background-color: hsl(0, 0%, 95%);
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

        return <Link key={index}
                    onClick={this.props.updateCurrentMarkdown}
                    getProps={this.props.linkIsActive}
                    to={`/module?id=${frontmatter.module}&unit=${frontmatter.unit}&subunit=${frontmatter.subunit}`}>
                {this.state.markdownIcons[frontmatter.type]}<span>{frontmatter.title}</span>
              </Link>
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
