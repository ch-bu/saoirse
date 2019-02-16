import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { StaticQuery, graphql } from "gatsby"
import { FaChevronLeft } from "react-icons/fa";

const HeaderStyled = styled.div`
  background: #1a2638;
  top:  0;
  left:  0;
  width:  100vw;
  z-index:  99;
  max-width: 100%;
  box-sizing: border-box;
  /* padding: 0 1rem; */
  text-align: center;
  display: none;
  height: 60px;

  a {
    color: #fff;
    font-weight: bold;
  }

  @media only screen and (min-width: 900px) {
    display: block;
    text-align: left;
    position: fixed;
    padding: 0 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const Title = styled.h1`
  color: #fff;
  margin: 0;
  font-size: 1.2rem;
  
`;

const Header = () => (
  <StaticQuery
    query={graphql`
      query HeadingQueryTwo {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <HeaderStyled>
        {/* <Link to="/lerneinheiten"><FaChevronLeft /> Zu den Lerneinheiten</Link> */}
        <Title> Wahrnehmung und Beurteilung der Stimme</Title>
      </HeaderStyled>
    )}
  />
)

export default Header