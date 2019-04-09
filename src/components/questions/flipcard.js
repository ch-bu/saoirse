import React, {useState} from "react"
import styled from 'styled-components'
import { useSpring, animated as a } from 'react-spring'
import { StaticQuery, graphql } from "gatsby"

const Container = styled.div`

  .front,
  .back {
    background-size: cover;

    p {
      margin: 20px;
      color: #fff;
    }
  }

  .c {
    position: absolute;
    max-width: 100%;
    max-height: 100%;
    width: 50ch;
    height: 50ch;
    cursor: pointer;
    will-change: transform, opacity;
    border-radius: 10px;
    box-shadow: 5px 10px 25px 0 rgba(46,61,73,.2);
  }

  .back {
    background-color: ${props => props.theme.primaryColorLight};
  }

  .front {
    background-color: ${props => props.theme.primaryColor};
  }
`;

function Card() {
  const [flipped, set] = useState(false)
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  })

  return (
    <Container onClick={() => set(state => !state)}>
      <a.div className="c back" 
        style={{ opacity: opacity.interpolate(o => 1 - o), transform }}>
        <p>asdfadsf</p>  
      </a.div>
      <a.div className="c front" 
        style={{ opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`) }}>
        <p>bdsdsfsdf</p>  
      </a.div>
    </Container>
  )
}

export default Card;
// export default props => (
//   <StaticQuery
//     query={graphql`
//       query {
//         allSinglechoiceYaml {
//           edges {
//             node {
//               id
//               question
//               answers {
//                 answer
//                 correct
//                 hint
//               }
//             }
//           }
//         }
//       }
//     `}
//     render={data => <FlipCardComponent data={data} {...props} />}
//   />
// )