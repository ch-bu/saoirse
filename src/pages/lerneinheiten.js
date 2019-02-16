import React from 'react'
import voice from '../assets/images/voice.jpg'
import soul from '../assets/images/soul.png'
import vocaltract from '../assets/images/vokaltrakt.png'
import window from '../assets/images/lerneinheit8.jpg'
import styled from 'styled-components'
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Shell from '../layouts/shell';
import Helmet from 'react-helmet';

const Lerneinheiten = styled.div`
  padding-top: 50px;
  width: 90%;
  margin: 0 auto;
  text-align: center;

  h1 {
    margin-top: 0;
  }

  @media only screen and (min-width: 900px) {
    text-align: left;

    h1 {
      margin-top: 2rem;
    }
  }
`;

const LerneinheitenFlexbox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  @media only screen and (min-width: 900px) {
    justify-content: flex-start;
  }
`;

const FlexElement = styled.div`
  width: 350px;
  height: 400px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.3);
  transition: 0.3s;
  text-align: center;
  margin-bottom: 2rem;
  background-color: #fbfafc;
  
  @media only screen and (min-width: 900px) {
    margin-right: 2rem;
    height: 450px;
  }

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.3);
  }

  img {
    max-height: 150px;
    width: 100%;
    object-fit: cover;
    /* box-shadow: 0px 5px 32px -2px rgba(204,204,204,1); */
    border-bottom: 1px solid rgb(236, 236, 236);

    @media only screen and (min-width: 900px) {
      max-height: 200px;
    }

  }
`;

const LerneinheitDescription = styled.div`
  position: relative;
  height: 190px;
  text-align: center;
  
  h4, p, a {
    margin: 0;
  }

  h4 {
    margin-bottom: 2rem;
  }

  a {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    text-decoration: none;
    color: #fff;
    font-weight: bold;
    padding: .43em .87em;
    background: #5781bd;

    &:hover {
      background: #004a99;
    }
  }
`;

export default ({ data }) => {
  const lerneinheiten = data.allMarkdownRemark.edges;

  var thumbnailSources =  {
    "5": vocaltract,
    "6": voice,
    "7": soul,
    "8": window
  };

  return (
      <Shell>
        <Helmet>
          <title>Lerneinheiten</title>
        </Helmet>
        <Lerneinheiten>
          <h1>Lerneinheiten</h1>
            <LerneinheitenFlexbox>
              {lerneinheiten.map(({ node }) => (
                <FlexElement key={node.frontmatter.lerneinheit}>
                  
                  <img src={thumbnailSources[node.frontmatter.lerneinheit]} 
                      alt="Avatar"></img>
                  
                  <LerneinheitDescription>
                    <h4>Lerneinheit {node.frontmatter.lerneinheit}</h4> 
                    <p>{node.frontmatter.title}</p> 
                  
                    <Link to={`/lerneinheit?id=` + node.frontmatter.lerneinheit + 
                              '&subunit=' + node.frontmatter.subunit +
                              '&unit=' + node.frontmatter.unit}>
                      Zur Lerneinheit
                    </Link>
                  </LerneinheitDescription>
                </FlexElement>
              ))}  

            </LerneinheitenFlexbox>
            
        </Lerneinheiten>
      </Shell> 
  );
};


export const query = graphql`
  { allMarkdownRemark(sort: {fields: [frontmatter___lerneinheit]},
                      filter: {frontmatter: {unit: {eq:0 }, subunit: {eq: 0}}}) {
      edges {
        node {
          excerpt
          frontmatter {
            title
            unit
            subunit
            lerneinheit
          }
        }
      }
    }
  }
`;