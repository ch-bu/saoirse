import React from 'react'
import Shell from '../layouts/shell';
import styled from 'styled-components'
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Helmet from 'react-helmet';

const Modules = styled.div`
  /* background-color: ${props => props.theme.darkColor}; */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 50px;
  padding-left: 5vw;
  padding-right: 5vw;
  margin: 0 auto;
  text-align: center;
  min-height: 100vh;

  h1 {
    margin-top: 0;
    color: #000;
    border: none;
  }

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    text-align: left;
    padding-left: 20vw;
    padding-right: 20vw;

    h1 {
      font-size: 3rem;
      font-weight: 700;
      margin-top: 2rem;
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
  /* background-color: ${props => props.theme.darkColor}; */
  /* background-color: #fff; */
  background-color: rgb(245,245,245);
  opacity: .9;
  width: 90%;
  text-align: center;
  margin-bottom: 2rem;
  transition: background-color 0.3s;
  /* border: 1px solid ${props => props.theme.primaryColorLight}; */
  box-shadow: 5px 10px 25px 0 rgba(46,61,73,.2);
  
  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    width: 100%;
    margin-right: 2rem;
    height: 180px;
  }

  &:hover {
    /* background-color: ${props => props.theme.darkColorLight}; */
    box-shadow: 2px 4px 8px 0 rgba(46,61,73,.2);
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
  /* color: ${props => props.theme.primaryColor}; */
  color: #000;
  text-align: center;
  width: 29%;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    font-size: 5rem;
  }
`;

const ModuleDescription = styled.div`
  width: 80%;
  color: #fff;
  color: #000;
  text-align: left;
  padding: 20px;
  align-self: center;
  font-size: 1.3rem;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    font-size: 2rem;
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
          <h1>Lessons</h1>
          <ModulesFlexbox>
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

