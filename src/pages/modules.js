import React from 'react'
import Shell from '../layouts/shell';
import styled from 'styled-components'
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Helmet from 'react-helmet';
import { Spring, config } from 'react-spring/renderprops.cjs';
import { FaStar } from "react-icons/fa";


const Container = styled.div`
  min-width: 95vw;
  min-height: 100vh;
  background-color: #000;
  background-color: ${props => props.theme.primaryColor};
  filter: saturate(.6);
  padding: 2.5vh;
`;

const Modules = styled.div`
  background-color: ${props => props.theme.asideBackgroundColor};
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.29' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
  padding: 5vh;
  min-height: 95vh;

  h1 {
    margin-top: 0;
    color: #fff;
    border: none;
    width: 100%;
    filter: rotate(1deg);
    /* border-bottom: 5px solid ${props => props.theme.primaryColor}; */
  }

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    h1 {
      margin-top: 5vh;
      width: 60%;
      font-size: 3rem;
    }
  }
`;

const ModulesFlexbox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 3vh;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    justify-content: flex-start;
  }
`;


const FlexElement = styled.div`
  background-color: ${props => props.theme.asideDropdownBackgroundColor};
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
  transition: all 0.3s;
  box-sizing: border-box;
  border-left: 10px solid ${props => props.theme.asideDropdownBackgroundColor};
  
  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    width: 33%;
    margin-right: 5px;
    height: 180px;
  }

  &:hover {
    background-color: #4e4e4e;
    border-left: 10px solid ${props => props.theme.primaryColor};
  }

  a {
    display: flex;
    align-self: stretch;
    height: 100%;
    text-decoration: none;
  }
`;

const ModuleNumber = styled.div`
  align-self: center;
  font-size: 3rem;
  color: ${props => props.theme.asideDropdownTitleTextColor};
  text-align: center;
  width: 29%;
  border-right: 1px solid #626262;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    font-size: 5rem;
  }
`;

const ModuleDescription = styled.div`
  width: 80%;
  color: ${props => props.theme.asideDropdownTitleTextColor};
  text-align: left;
  padding: 20px;
  align-self: center;
  font-size: 1.3rem;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    font-size: 2rem;
  }
`;

const Credits = styled.div`
  position: fixed;
  bottom: 5vh;
  right: 10vh;
  color: #fff;
  padding: 10px;
  padding-left: 20px;
  background-color: ${props => props.theme.asideDropdownBackgroundColor};
  border-radius: 5px;
  transform: rotate(-3deg);
  border: 1px solid #626262;

  a {
    color: ${props => props.theme.primaryColor};
    color: #fff;
    border-bottom: 2px solid ${props => props.theme.primaryColor};
    text-decoration: none;

    &:hover {
      border-bottom: 2px solid ${props => props.theme.primaryColorLight};
    }
  }

  svg {
    color: ${props => props.theme.primaryColor};
    position: absolute;
    font-size: 2.5rem;
    top: -27%;
    left: -8%;
  }
`;

export default ({ data }) => {
  const modules = data.allMarkdownRemark.edges;

  return (
      <Shell>
        <Helmet>
          <title>Your Lessons</title>
        </Helmet>
        <Container>
          <Modules>
            <h1>Saoirse - An E-Learning Framework</h1>
            <Spring
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
              config={{duration: 200}}>
              {props => 
                <ModulesFlexbox style={props}>
                {modules.map(({ node }) => (
                  
                  <FlexElement key={node.frontmatter.module}>
                    <Link to={`/module?id=` + node.frontmatter.module + 
                                '&unit=' + node.frontmatter.unit +
                                '&subunit=' + node.frontmatter.subunit}>
                        <ModuleNumber>{node.frontmatter.module}</ModuleNumber>
                        <ModuleDescription>{node.frontmatter.moduleTitle}</ModuleDescription>
                    </Link>
                  </FlexElement>
                  
                ))}  
              </ModulesFlexbox>
                
              }
            </Spring>

          <Credits><FaStar /><span>Designed and developed by<br />
            <a target="_blank" href="https:/christianburkhart.de">Christian Burkhart</a>
              </span></Credits>
         </Modules>
        </Container>
      </Shell> 
  );
};


export const query = graphql`
  { allMarkdownRemark(sort: {fields: [frontmatter___module]},
                      filter: {frontmatter: {unit: {eq:0 }, subunit: {eq: 0}}}) {
      edges {
        node {
          excerpt(pruneLength: 150)
          frontmatter {
            moduleTitle
            title
            module
            unit
            subunit
          }
        }
      }
    }
  }
`;

