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
  /* background-image: url(https://advancedreact.com/images/texture-white.png); */
  /* background-color: rgba(255, 255, 255, .85); */
  border-top: 2vh solid hsla(196, 98%, 65%, 1);
`;

const Heading = styled.div`
  background-color: hsl(220, 16%, 15%);
  background-color: ${props => props.theme.primaryColor};
  min-height: 57vh;
  display: flex;
  z-index: 99;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-image: url(https://advancedreact.com/images/texture-black.png), url(https://advancedreact.com/images/texture-white.png);
  /* background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E"); */
  clip-path: polygon(0 0, 100% 0%, 100% calc(100% - 100px), 0 100%);

  h1 {
    margin: 0;
    text-align: center;
    letter-spacing: 2px;
    border: none;
    color: hsla(196, 98%, 98%, 1);
    text-shadow: 2px 2px hsla(196, 98%, 38%, 1);
    font-size: 2rem;
    padding-bottom: 0;
    cursor: default;

    @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
      font-size: 5rem;
    }
  }

  h2 {
    color: hsla(196, 98%, 98%, 1);
    text-shadow: 2px 2px hsla(196, 98%, 38%, 1);
    font-size: 1.5rem;
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
  /* background-image: url(https://advancedreact.com/images/texture-white.png); */
  /* min-height: 8vh; */
`;

const ModulesFlexbox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 3vh;
  position: relative;
  top: -23vh;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    justify-content: space-between;
  }
`;


const FlexElement = styled.div`
  background-color: hsl(220, 16%, 25%);
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
  transition: all 0.2s;
  box-sizing: border-box;
  border-left: 20px solid rgba(255, 255, 255, 0);
  box-shadow: 0 3px 9px hsla(0, 0%, 0%, .15), 0 2px 4px hsla(0, 0%, 0%, .12);
  box-shadow: 0 0 0 4px rgba(255,255,255,0.4), 0 0 4px rgba(0,0,0,0.48);
  
  
  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    width: calc(33% - 10px);
    margin-right: 10px;
    height: 180px;
  }

  &:hover {
    background-color: hsl(220, 16%, 19%);
    /* border-left: 20px solid ${props => props.theme.primaryColor}; */
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
  color: hsl(196, 16%, 70%);
  text-align: center;
  width: 29%;
  border-right: 1px solid rgba(0, 0, 0, .1);

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    font-size: 5rem;
  }
`;

const ModuleDescription = styled.div`
  width: 80%;
  color: hsl(250, 16%, 90%);
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
              <h1>Saoirse</h1>
              <h2>An E-Learning Framework for Busy People</h2>
            </Heading>
            <Content>
              <Spring
                from={{ opacity: 0 }}
                to={{ opacity: 1 }}
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

