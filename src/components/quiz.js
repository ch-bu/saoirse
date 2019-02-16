import React from "react"
import styled from 'styled-components'
import Swal from 'sweetalert2'
import Button from './button'

const Quiz = styled.div`
  width: 100%;
  margin: 2rem 0;

  p {
    font-size: 1rem;
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
  /* opacity: 0; */
  cursor: pointer;

  &:checked ~ .checkmark {
    background-color: #385c8f;
    /* border: 1px solid #ccc; */
  }
`

// https://jsoneditoronline.org/
// https://www.freeformatter.com/json-formatter.html#ad-output

class QuizComponent extends React.Component {
  constructor(props) {
    super(props);

    this.question = JSON.parse(this.props.question);

    this.state = {
      size: "-1",
    };

    this.getAnswer = this.getAnswer.bind(this);
    this.updateChecked = this.updateChecked.bind(this);
  }

  render() {
    return (
      <Quiz key={this.question.name}>
        <p>{this.question.question}</p>
        <ul>
          {this.question.answers.map((item, i) => {
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

  getAnswer() {
    if (parseInt(this.state.size) >= 0) {
      const currentQuestion = this.question.answers[this.state.size];
      const answer_correct = currentQuestion.correct;

      Swal({
        title: answer_correct === "true" ? 'Richtig': "Leider falsch",
        text: currentQuestion.hint,
        type: answer_correct === "true" ? 'success': "error"
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

export default QuizComponent;
