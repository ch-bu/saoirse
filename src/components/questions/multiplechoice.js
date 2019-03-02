import React from "react"
import styled from 'styled-components'
import Swal from 'sweetalert2'
import Button from '../button'
import { StaticQuery, graphql } from "gatsby"

const Quiz = styled.div`
  width: 100%;
  margin: 2rem 0;

  p {
    font-size: 1rem;
    font-weight: bold;
  }


  @media only screen and (min-width: 900px) {
    font-size: 1.1rem;
  }
  
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  li {
    padding: 0.8rem;
    border-radius: 5px;
    border: 1px solid #e6e6e6;
  }

  li:hover {
    border: 1px solid #2e3d49;
  }
`

const Label = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 0.9rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  @media only screen and (min-width: 900px) {
    font-size: 1.1rem;
  }
`

const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  
  &:hover {
    background-color: #ccc;
  }

  &:checked {
    background-color: #ffefa2;
  }

  /* &:after {
    content: "";
    position: absolute;
    display: none;
    top: 9px;
    left: 9px;
    width: 8px;
    height: 8px;
    background: white;
  } */

  &::after {
    left: 9px;
    top: 9px;
    width: 8px;
    height: 8px;
    border: solid blue;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`

const Input = styled.input`
  position: absolute;
  cursor: pointer;

  &:checked ~ .checkmark {
    background-color: ${props => props.theme.primaryColor};
    border: 1px solid ${props => props.theme.darkColorLight};
  }
`

class MultipleChoiceComponent extends React.Component {
  constructor(props) {
    super(props);

    this.questions = this.props.data.allMultiplechoiceYaml.edges;

    this.question = this.questions.filter((question) => {
      return question.node.question === this.props.question;
    })[0].node;

    // Shuffle answers
    this.shuffleAnswers(this.question.answers);
    
    var answers = {};
    var correctAnswers = {};
    for (let answer = 0; answer < this.question.answers.length; answer++) {
      answers[this.question.answers[answer].answer] = false;
      correctAnswers[this.question.answers[answer].answer] = this.question.answers[answer].correct;
    }

    this.state = {
      size: "-1",
      answers: answers,
      correctAnswers: correctAnswers
    };

    this.getAnswer = this.getAnswer.bind(this);
    this.updateChecked = this.updateChecked.bind(this);
    this.shuffleAnswers = this.shuffleAnswers.bind(this);
  }

  render() {
    return (
      <Quiz key={this.question.name}>
        <p>{this.question.question}</p>
        <ul>
          {this.question.answers.map((item, i) => {
            return <li key={i} >
              <Label className="mc">{item.answer}
                <Input type="checkbox"
                       name={item.answer}
                       onClick={this.updateChecked} />
                <Checkmark className="checkmark"></Checkmark>
              </Label>
            </li>;
          })}
        </ul>
        <Button onClick={this.getAnswer}>Prüfe deine Antwort</Button>
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

    var equal = true;

    Object.entries(this.state.answers).forEach(
      ([key, value]) => value === this.state.correctAnswers[key] ? "" : equal = false
    );

    if (equal) {
      Swal({
        title: "Super. Richtig gemacht.",
        type: "success"
      })
    } else {
      Swal({
        title: "Nicht ganz",
        text: this.question.hint,
        type: "error"
      })
    }
  }

  updateChecked(event) {
    var updatedAnswers = this.state.answers;
    updatedAnswers[event.target.name] = event.target.checked

    this.setState({
      answers: updatedAnswers
    });
  }
}


export default props => (
  <StaticQuery
    query={graphql`
      query {
        allMultiplechoiceYaml {
          edges {
            node {
              id
              question
              hint
              answers {
                answer
                correct
              }
            }
          }
        }
      }
    `}
    render={data => <MultipleChoiceComponent data={data} {...props} />}
  />
)