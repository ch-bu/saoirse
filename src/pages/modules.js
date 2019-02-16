import React from 'react'
import Shell from '../layouts/shell';
import styled from 'styled-components'
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Helmet from 'react-helmet';

const Modules = styled.div`
  background-color: #20232a;
  padding-top: 50px;
  padding-left: 5vw;
  padding-right: 5vw;
  margin: 0 auto;
  text-align: center;
  min-height: 100vh;

  h1 {
    margin-top: 0;
    color: #fff;
  }

  @media only screen and (min-width: 900px) {
    text-align: left;
    padding-left: 20vw;
    padding-right: 20vw;

    h1 {
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

  @media only screen and (min-width: 900px) {
    justify-content: flex-start;
  }
`;

const FlexElement = styled.div`
  background-color: #fff;
  background-color: rgb(247, 247, 247);
  width: 100%;
  border-radius: 10px;
  transition: 0.3s;
  text-align: center;
  margin-bottom: 3rem;
  height: 240px;
  
  @media only screen and (min-width: 900px) {
    width: 330px;
    margin-right: 2rem;
    height: 280px;
  }

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.3);
  }
`;

const ModuleDescription = styled.div`
  position: relative;
  height: 100%;
  /* padding-top: 30px; */
  padding: 20px;
  padding-top: 50px;
  text-align: left;
  
  h4, p, a {
    margin: 0;
  }

  .title {
    font-weight: bold;
  }

  span {
    position: absolute;
    top: -20px;
    background-color: #bb6d8c;
    font-weight: bold;
    color: #fff;
    left: 42%;
    width: 45px;
    height: 45px;
    padding-top: 6px;
    border-radius: 45px;
    text-align: center;
  }

  a {
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    text-decoration: none;
    color: #000;
    font-weight: bold;
    padding: .43em 20px;
    background: #bb6d8c;
    text-align: center;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    &:hover {
      background: #cb90a7;
    }
  }

  p:nth-child(3) {
    font-size: 0.8rem;
  }
`;

export default ({ data }) => {
  const modules = data.allMarkdownRemark.edges;

  return (
      <Shell>
        <Helmet>
          <title>Modules</title>
        </Helmet>
        <Modules>
          <h1>Modules</h1>
            <ModulesFlexbox>
              {modules.map(({ node }) => (
                <FlexElement key={node.frontmatter.module}>
                  <ModuleDescription>
                    <span>{node.frontmatter.module}</span>
                    
                    <p className="title">{node.frontmatter.moduleTitle}</p> 
                    <p>{node.excerpt}</p>
                  
                    <Link to={`/module?id=` + node.frontmatter.module + 
                              '&unit=' + node.frontmatter.unit +
                              '&subunit=' + node.frontmatter.subunit}>
                      Zum Modul
                    </Link>
                  </ModuleDescription>
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

