import React from "react"
import styled from 'styled-components'
import Button from '../button'
import { StaticQuery, graphql } from "gatsby"
import FlipCard from 'react-flipcard-2';


const FlipCardContainer = styled.div`
  div:first-child {
    height: 400px;
    min-width: 300px;

    .ReactFlipCard__Front, .ReactFlipCard__Back {
      border-radius: 10px;
      box-shadow: 5px 5px 25px 0 rgba(46,61,73,.4);
      outline: none;
      /* cursor: pointer; */

      p {
        padding: 30px;
        text-align: center;
      }
    }

    .ReactFlipCard__Front {
      background-color: ${props => props.theme.primaryColor};
    }

    .ReactFlipCard__Back {
      background-color: ${props => props.theme.primaryColorLight};
    }
  }
`;

class FlipCardComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFlipped: false
    };

    console.log(this.props);
    this.flipCard = this.flipCard.bind(this);
  }

  render() {
    return (
      <div>
        {/* Default behavior is horizontal flip on hover, or focus */}
        <FlipCardContainer>
          <FlipCard
            // disabled={true}
            // flipped={this.state.isFlipped}
          >
            {/* The first child is used as the front of the card */}
            <div onClick={this.flipCard}>
              <div><p>{this.props.front}</p></div>
            </div>
            {/* The second child is used as the back of the card */}
            <div onClick={this.flipCard}>
              <p>{this.props.back}</p>
            </div>
          </FlipCard>
        </FlipCardContainer>
      </div>
    ); 
  }

  // getInitialState() {
  //   return {
  //     isFlipped: false
  //   };
  // }

  flipCard() {
    // this.setState(prevState => ({
    //   isFlipped: !prevState.isFlipped
    // }));

    // this.setState({
    //   isFlipped: true
    // });

    // console.log(this.state.isFlipped);

    // if (this.state.isFlipped) {
    //   this.setState({
    //     isFlipped: false
    //   });
    // } else {
    //   this.setState({
    //     isFlipped: true
    //   });
    // }
  }
 
  // showBack() {
  //   this.setState({
  //     isFlipped: true
  //   });
  // }
 
  // showFront() {
  //   this.setState({
  //     isFlipped: false
  //   });
  // }
 
  // handleOnFlip(flipped) {
  //   if (flipped) {
  //     this.refs.backButton.getDOMNode().focus();
  //   }
  // }
 
  // handleKeyDown(e) {
  //   if (this.state.isFlipped && e.keyCode === 27) {
  //     this.showFront();
  //   }
  // }
}

export default FlipCardComponent;
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