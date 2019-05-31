import React from "react"
import { Link } from "gatsby"
import { FaBookOpen, FaInfoCircle, FaTasks, FaVideo} from "react-icons/fa";
import styled from 'styled-components'

const SubNavContainer = styled.div`
  position: fixed;
  top: 7vh;
  left: 0;
  width: 100vw;
  min-height: 7vh;
  margin-left: 0vw;
  background-color: #fff;
  border-bottom: 1px solid rgb(236, 236, 236);
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  /* padding: 5px; */
  /* opacity: 0.96; */
  z-index: 92;
  box-shadow: 0px 4px 18px 0 hsla(0, 0%, 0%, .11);
  border-top: 1px solid rgba(236, 236, 236, .5);

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    width: 94vw;
    margin-left: 6vw;
  }

  a {
    color: hsla(0, 0%, 0%, .32);
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
    border-top: 2px solid #fff;

    &:hover {
      color: rgba(0, 0, 0, .6);
    }
  }

  span {
    display: none;

    @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
      display: inline;
    }
  }

  .active {
    color: rgba(0, 0, 0, .8);
    /* font-weight: bold; */
    border-top: 2px solid ${props => props.theme.primaryColorLight};
    /* background-color: ${props => props.theme.primaryColorSuperlight} */
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
      <SubNavContainer>
        {subnav}
      </SubNavContainer>
    ); 
  }
}

export default SubNav;
