import React from 'react'
import styled from 'styled-components'
import Shell from '../layouts/shell';

const Hero = styled.div`
  /* background-color: #004a99; */
  background-size: cover;
  height: 100vh;
  word-wrap: break-word;
  display: grid;
  grid-template-columns: 5% auto 5%;
  grid-template-rows: 1fr 3fr 1fr;
  grid-template-areas: ". . ."
                       ". text  ."
                       ". . .";

  h1 {
    font-size: 1.5rem;
    word-wrap: break-word;
  }

  h2 {
    font-size: 1rem;
  }

  @media only screen and (min-width: 900px) {
    grid-template-rows: 2fr 3fr 1fr;

    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.5rem;
    }
  }
`;

const HeroText = styled.div`
  grid-area: text;
  color: #fff;
  justify-self: center;
  text-align: center;
`;


export default ({ data }) => (
  <Shell>
    <Hero>
      <HeroText>
        <h1>Gesundheitsförderung und Stimme</h1>
        <h2>Eine Online-Vorlesung des Master of Education</h2>
      </HeroText>
    </Hero>
  </Shell>
)

