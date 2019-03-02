import React from "react"
import styled from 'styled-components'
import Swal from 'sweetalert2'
import Button from '../button'
import { StaticQuery, graphql } from "gatsby"

const Quiz = styled.div`
  width: 100%;
  margin: 2rem 0;

  p {
    font-weight: bold;
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
    border: 1px solid ${props => props.theme.darkColorLight};
  }
`

class SingleChoiceComponent extends React.Component {
  constructor(props) {
    super(props);

    this.questions = this.props.data.allSinglechoiceYaml.edges;

    this.question = this.questions.filter((question) => {
      return question.node.question === this.props.question;
    })[0].node;

    this.state = {
      size: "-1",
      answers: this.shuffleAnswers(this.question.answers)
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
          {this.state.answers.map((item, i) => {
            return <li key={i} >
              <Label htmlFor={i + this.question.question}>{item.answer}
                <Input type="radio" value={i} 
                       id={i + this.question.question}
                       name={this.question.question}
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
    if (parseInt(this.state.size) >= 0) {
      const currentQuestion = this.question.answers[this.state.size];
      const answer_correct = currentQuestion.correct;

      Swal({
        title: answer_correct === true ? 'Richtig': "Leider falsch",
        text: currentQuestion.hint,
        type: answer_correct === true ? 'success': "error"
      })
    }
  }

  updateChecked(event) {
    // Update button
    event.target.checked = true;  

    // Set state
    this.setState({
      size: event.target.value
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