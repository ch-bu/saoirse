import React from 'react'
import Shell from '../layouts/shell';
import styled from 'styled-components'
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Helmet from 'react-helmet';
import { Spring, config } from 'react-spring/renderprops.cjs';
import { FaStar } from "react-icons/fa";


const Modules = styled.div`
  position: static;
  background-color: #1f232b;
  padding: 5vh;
  overflow-y: scroll;
  border-top: 1.5vh solid ${props => props.theme.primaryColor};
  min-height: 100vh;

  h1 {
    margin-top: 0;
    letter-spacing: 2px;
    font-weight: 700;
    color: #fff;
    text-shadow: 8px 8px 3px rgba(0,0,0,0.1);
    border: none;
    width: 100%;
    filter: rotate(1deg);
  }

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    h1 {
      margin-top: 5vh;
      font-size: 3.3rem;
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
  border-radius: 6px;
  background-color: #fff;
  background-color: rgba(255, 255, 255, .85);
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
  transition: all 0.2s;
  box-sizing: border-box;
  border-left: 20px solid rgba(255, 255, 255, 0);
  
  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    width: calc(25% - 10px);
    margin-right: 10px;
    height: 180px;
  }

  &:hover {
    border-left: 20px solid ${props => props.theme.primaryColor};
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
  color: #000;
  text-align: center;
  width: 29%;
  border-right: 1px solid rgba(0, 0, 0, .1);

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    font-size: 5rem;
  }
`;

const ModuleDescription = styled.div`
  width: 80%;
  color: #000;
  text-align: left;
  padding: 20px;
  align-self: center;
  font-size: 1.3rem;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    font-size: 2rem;
  }
`;

const Credits = styled.div`
  display: none;
  color: #000;
  padding: 10px;
  padding-left: 20px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.primaryColor};
  margin-top: 5vh;
  width: 50%;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    display: block;
    transform: rotate(-2deg);
    position: fixed;
    bottom: 5vh;
    width: auto;
    margin-top: 0;
    right: 10vh;
  }

  a {
    color: ${props => props.theme.primaryColor};
    color: #000;
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

