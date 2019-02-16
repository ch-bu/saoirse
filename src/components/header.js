import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { StaticQuery, graphql } from "gatsby"
import { FaBookOpen } from 'react-icons/fa';
import { IoIosSchool } from "react-icons/io";

const HeaderStyled = styled.div`
  background: #1a2638;
  /* box-shadow: 0px 7px 13px 0px rgba(204, 204, 204, 1); */
  /* box-shadow: 0 4px 8px 0 rgba(0,0,0,0.3); */
  top:  0;
  left:  0;
  width:  100vw;
  z-index:  99;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0 1rem;
  text-align: center;

  @media only screen and (min-width: 900px) {
    text-align: left;
    position: fixed;
    padding: 0 2rem;
  }

  ul {
    margin: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    box-align: center;
    justify-content: center;
    list-style: none;

    @media only screen and (min-width: 900px) {
      justify-content: flex-start;
    }

    li {
      text-decoration: none;
      color: #fff;
      font-size: 1rem;
      /* font-weight: 700; */
      margin: 0.4rem 0.4rem;

      svg {
        padding-right: 5px;
        padding-top: 6px;
        height: 20px;
      }
      
      @media only screen and (min-width: 900px) {
        margin-right: 2rem;
      }

      a {
        color: #fff;
        text-decoration: none;

        &:hover {
          color: #ccc;
        }
      }
    }

    li:first-child {
      flex-grow: 1;
      margin: 0.5rem 0;
      
      h1 {
        font-size: 0.9rem;
      }
    
    }
  }
`;

const Title = styled.span`
  a {
    color: #fff;
    text-decoration: none;
  }
`;

const Header = () => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <HeaderStyled>
        <nav>
          <ul>
            <li>
              <h1 style={{margin: 0}}>
                <Title>
                  <Link to="/">
                    {data.site.siteMetadata.title}
                  </Link>   
                </Title>
              </h1>
            </li>
            <li>
              <Link to="/lerneinheiten">
                <FaBookOpen /> Lerneinheiten
              </Link>
            </li>
            <li>
              <a target="_blank"
                rel="noopener noreferrer"
                href="https://ilias.uni-freiburg.de/goto.php?target=crs_1001276&client_id=unifreiburg">
                <IoIosSchool /> Zu Ilias
              </a>
            </li>
          </ul>
    
        </nav>
      </HeaderStyled>
    )}
  />
)

export default Header