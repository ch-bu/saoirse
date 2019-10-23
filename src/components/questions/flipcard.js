import React, {useState} from "react"
import styled from 'styled-components'
import { useSpring, animated as a } from 'react-spring'
import { StaticQuery, graphql } from "gatsby"

const Container = styled.div`
  min-height: 55ch;

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
    /* background: url(${props => props.frontimage}); */
    /* background-size: cover; */
  }

  .front {
    background-color: ${props => props.theme.primaryColor};
    /* background: url(${props => props.backimage}); */
    background-size: cover;
  }
`;

function FlipCardComponent(props) {
  const [flipped, set] = useState(false)

  // Get correct flipcard
  const card = props.data.allFlipcardYaml.edges.filter((card) => {
    console.log(card.node.flipcardid);
    return parseInt(card.node.flipcardid) === parseInt(props.id);
  })[0].node;

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  })

  return (
    <Container onClick={() => set(state => !state)}>
      <a.div className="c back" 
        style={{ opacity: opacity.interpolate(o => 1 - o), transform }}>
        <p>{card.front}</p>  
      </a.div>
      <a.div className="c front" 
        style={{ opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`) }}>
        <p>{card.back}</p>  
      </a.div>
    </Container>
  )
}

// class FlipCardComponent extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       flipped: false,
//       set: false
//     };

//     const { transform, opacity } = useSpring({
//       opacity: this.state.flipped ? 1 : 0,
//       // transform: `perspective(600px) rotateX(${this.state.flipped ? 180 : 0}deg)`,
//       // config: { mass: 5, tension: 500, friction: 80 }
//     });

//     // console.log(transform);

//   }

//   render() {

//     return (
//       <p>Flipcard</p>
//       // <Container onClick={() => set(state => !state)}>
//       //   <a.div className="c back" 
//       //     style={{ opacity: opacity.interpolate(o => 1 - o), transform }}>
//       //     <p>asdfadsf</p>  
//       //   </a.div>
//       //   <a.div className="c front" 
//       //     style={{ opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`) }}>
//       //     <p>bdsdsfsdf</p>  
//       //   </a.div>
//       // </Container>
//     )
//   }
// }


// export default FlipCardComponent;
// https://github.com/gatsbyjs/gatsby/issues/8078
export default props => (
  <StaticQuery
    query={graphql`
      query {
        allFlipcardYaml {
          edges {
            node {
              flipcardid
              back
              front
              # imagefront {
              #   id
              #   publicURL
              #   relativePath
              # }
              # imageback {
              #   publicURL
              # }
            }
          }
        }
      }
    `}
    render={data => <FlipCardComponent data={data} {...props} />}
  />
)