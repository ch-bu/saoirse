import React from "react"
import styled from 'styled-components'
import Button from '../button'
import { StaticQuery, graphql } from "gatsby"
import Confetti from 'react-dom-confetti';
import {reactLocalStorage} from 'reactjs-localstorage';


const Quiz = styled.div`
  width: 100%;
  margin: 4rem 0;

  p {
    font-weight: bold;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 10px;
    border: 1px solid #e6e6e6;
    margin-bottom: 15px;
  }
`

const Label = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  padding: 10px 10px 10px 50px;
  cursor: pointer;
  font-size: 1rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    font-size: 1.2rem;
  }
`

const Answer = styled.div`
  margin-top: 15px;
  width: 100%;
  min-height: 100px;
  padding: 15px;
  font-size: 1rem;
  border-radius: 5px;
  background-color: ${props => props.answerCorrect ? "#c7efc7" : "#ecbaba"};
  box-shadow: 5px 4px 25px 0 rgba(46,61,73,.4);

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    font-size: 1.2rem;
  }
`;

const Checkmark = styled.span`
  position: absolute;
  top: 15px;
  left: 5px;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
  
  &:hover {
    background-color: #ccc;
  }

  &:checked {
    background-color: #ffefa2;
  }

  &:after {
    content: "";
    position: absolute;
    display: none;
    top: 9px;
    left: 9px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
  }
`

const Input = styled.input`
  position: absolute;
  cursor: pointer;

  &:checked ~ .checkmark {
    background-color: ${props => props.theme.primaryColor};
    box-shadow: 5px 4px 25px 0 rgba(46,61,73,.4);
  }
`

class SingleChoiceComponent extends React.Component {
  constructor(props) {
    super(props);

    // All questions
    this.questions = this.props.data.allSinglechoiceYaml.edges;

    // Get current question
    this.question = this.questions.filter((question) => {
      return question.node.question === this.props.question;
    })[0].node;

    this.state = {
      size: "-1",
      // Check if questions has already been answered?
      alreadyAnswered: reactLocalStorage.get(this.question.question) ? true : false,
      answers: this.shuffleAnswers(this.question.answers),
      answerCorrect: reactLocalStorage.get(this.question.question) ? true : null,
      showConfetti: false,
      hint: reactLocalStorage.get(this.question.question),
      buttonClicked: false
    };

    this.confettiConfig = {
      angle: 90,
      spread: 45,
      startVelocity: 45,
      elementCount: 50,
      dragFriction: 0.1,
      duration: 3000,
      delay: 0,
      width: "10px",
      height: "10px",
      colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
    };

    this.getAnswer = this.getAnswer.bind(this);
    this.updateChecked = this.updateChecked.bind(this);
    this.shuffleAnswers = this.shuffleAnswers.bind(this);
  }

  render() {
    // Decide wheather to show int
    let answer = "";
    if (this.state.buttonClicked | this.state.alreadyAnswered) {
      if (this.state.answerCorrect) {
        console.log(this.state.hint);
        answer = <Answer answerCorrect={true}>{this.state.hint}</Answer>;
      } else {
        answer = <Answer answerCorrect={false}>{this.state.hint}</Answer>;
      }
    }

    return (
      <Quiz key={this.question.name}>
        <p>{this.question.question}</p>
        <ul>
          {this.state.answers.map((item, i) => {
            return <li key={i} >
              <Label htmlFor={i + this.question.question}>{item.answer}
                <Input type="radio" value={i} 
                       id={i + this.question.question}
                       checked={this.state.alreadyAnswered ? item.correct : null}
                       name={this.question.question}
                       onChange={this.updateChecked} />
                  <Confetti active={ this.state.showConfetti } config={ this.config }/>
                <Checkmark className="checkmark" ></Checkmark>
              </Label>
            </li>;
          })}
        </ul>
        <Button onClick={this.getAnswer}>Submit Answer</Button>
        {answer}
      </Quiz>
    ); 
  }

  shuffleAnswers(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  getAnswer() {
    if (parseInt(this.state.size) >= 0 & !this.state.alreadyAnswered) {
      const currentQuestion = this.question.answers[this.state.size];
      const answer_correct = currentQuestion.correct;

      this.setState({
        hint: currentQuestion.hint,
        buttonClicked: true
      });

      if (answer_correct) {
        // Store correct answer in local storage
        reactLocalStorage.set(this.question.question, currentQuestion.hint);

        this.setState({
          showConfetti: answer_correct,
          answerCorrect: true,
          alreadyAnswered: true
        }, () => {
          setTimeout(() => {
            this.setState({showConfetti: false})
          }, 1000);
        });
      } else {
        this.setState({
          answerCorrect: false
        });
      }
    }
  }

  updateChecked(event) {
    // Update button
    event.target.checked = true;  

    // Set state
    this.setState({
      size: event.target.value,
      buttonClicked: false
    });
  }
}


export default props => (
  <StaticQuery
    query={graphql`
      query {
        allSinglechoiceYaml {
          edges {
            node {
              id
              question
              answers {
                answer
                correct
                hint
              }
            }
          }
        }
      }
    `}
    render={data => <SingleChoiceComponent data={data} {...props} />}
  />
)