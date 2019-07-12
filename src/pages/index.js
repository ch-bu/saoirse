import React from 'react'
import Shell from '../layouts/shell';
import styled from 'styled-components'
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Helmet from 'react-helmet';
import { Spring, config } from 'react-spring/renderprops.cjs';
import { FaStar } from "react-icons/fa";


const Modules = styled.div`
  background-color: hsl(220, 16%, 88%);
  border-top: 2vh solid hsl(222, 14%, 15%);
`;

const Heading = styled.div`
  background-color: hsl(222, 14%, 20%);
  min-height: 56vh;
  display: flex;
  z-index: 99;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  /* clip-path: polygon(0 0, 100% 0%, 100% calc(100% - 100px), 0 100%); */

  h1 {
    margin: 0;
    text-align: center;
    letter-spacing: 2px;
    border: none;
    font-weight: 700;
    color: ${props => props.theme.primaryColorSuperlight};
    font-size: 2rem;
    padding-bottom: 0;
    cursor: default;

    @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
      font-size: 6rem;
    }
  }

  h2 {
    color: rgba(255, 255, 255, 0.95);
    font-size: 1.5rem;
    font-weight: 100;
    text-align: center;
    border: none;
    letter-spacing: 1px;
    margin-top: 0.9rem;
    cursor: default;

    @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
      font-size: 2.5rem;
    }
  }
`;

const Content = styled.div`
  background-color: hsl(220, 16%, 88%);
  padding: 5vw 10vw;
`;

const ModulesFlexbox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 3vh;
  position: relative;
  top: -20vh;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    justify-content: space-between;
  }
`;


const FlexElement = styled.div`
  background-color: ${props => props.theme.primaryColorSuperlight};
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
  transition: all 0.2s;
  box-sizing: border-box;
  box-shadow: 7px 7px 0px 1px ${props => props.theme.primaryColor};
  
  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    width: calc(33% - 20px);
    margin-right: 10px;
    height: 180px;
  }

  &:hover {
    box-shadow: 7px 7px 0px 1px ${props => props.theme.primaryColorLight};
  }

  a {
    display: flex;
    align-self: stretch;
    height: 100%;
    text-decoration: none;
    border: none;
  }
`;

const ModuleNumber = styled.div`
  align-self: center;
  font-size: 3rem;
  color: hsla(250, 16%, 15%, 0.9);
  text-align: center;
  width: 29%;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    font-size: 5rem;
  }
`;

const ModuleDescription = styled.div`
  width: 80%;
  color: hsla(250, 16%, 15%, 0.9);
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
  color: hsl(250, 16%, 99%);
  padding: 10px;
  padding-left: 20px;
  background-color: hsl(220, 16%, 19%);
  border-radius: 5px;
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
    color: hsl(250, 16%, 99%);
    border-bottom: 1px solid ${props => props.theme.primaryColor};
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
            <Heading>
              <h1>Saoirse [ˈsˠiːɾʲʃə]</h1>
              <h2>A Content-First E-Learning Framework</h2>
            </Heading>
            <Content>
              <Spring
                delay={100}
                from={{ 
                  opacity: 0,
                  transform: "scale(0.9)" }}
                to={{ opacity: 1, transform: "scale(1)"  }}
                config={{duration: 200}}>
                {props => 
                  <ModulesFlexbox style={props}>
                  {modules.map(({ node }) => (
                    
                    <FlexElement key={node.frontmatter.module}>
                      <Link to={`/module/?id=` + node.frontmatter.module + 
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
            </Content>
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

