import React from "react"
import { Link } from "gatsby"
import { FaBookOpen, FaInfoCircle, FaTasks, FaVideo} from "react-icons/fa";
import styled from 'styled-components'
import { FaArrowCircleLeft, FaArrowCircleRight} from "react-icons/fa";

const NavigationButtons = styled.div`
  visibility: hidden;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    visibility: visible;
    position: fixed;
    bottom: 2vh;
    right: 4vh;
    display: flex;
    width: 100px;
    height: 80px;
    align-items: center;

    a {
      /* color: #000; */
      color: ${props => props.theme.primaryColor};
      text-decoration: none;
      margin: 0;
      padding: 0;
    }

    a.previous {
      position: absolute;
      top: 0;
      left: 0;
    }

    a.next {
      position: absolute;
      top: 0;
      right: 0;
    }

    svg {
      height: 35px;
      width: 35px;
      transition: all 0.1s;
      cursor: pointer;

      &:hover {
        transform: scale(1.3);
      }
    }
  }

`;

class NavigationLink extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    let PreviousLink = undefined;
    if (this.props.markdownPrevious) {
      // Generate Links
      PreviousLink = this.props.markdownPrevious ? <Link 
        onClick={this.props.updateCurrentMarkdown}
        className="previous"
        to={`/module?id=${this.props.markdownPrevious.frontmatter.module}&unit=${this.props.markdownPrevious.frontmatter.unit}&subunit=${this.props.markdownPrevious.frontmatter.subunit}`}>
        <FaArrowCircleLeft />
      </Link> : "";
    }

    let NextLink = undefined;
    if (this.props.markdownNext) {
      NextLink = this.props.markdownNext ? <Link 
        onClick={this.props.updateCurrentMarkdown}
        className="next" 
        to={`/module?id=${this.props.markdownNext.frontmatter.module}&unit=${this.props.markdownNext.frontmatter.unit}&subunit=${this.props.markdownNext.frontmatter.subunit}`}>
        <FaArrowCircleRight />
        </Link> : "";
    }

    return (
      <NavigationButtons>
        {PreviousLink}
        {NextLink}
      </NavigationButtons>
    ); 
  }
}

export default NavigationLink;
