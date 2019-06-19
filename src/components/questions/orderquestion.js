import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components'
import { StaticQuery, graphql } from "gatsby"
import Button from '../button'
import Confetti from 'react-dom-confetti';
import {reactLocalStorage} from 'reactjs-localstorage';
import { ShakeLittle } from 'reshake'

// fake data generator
// const getItems = count =>
//   Array.from({ length: count }, (v, k) => k).map(k => ({
//     id: `item-${k}`,
//     content: `item ${k}`,
//   }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: 10 * 2,
  outline: "none",
  // margin: `0 0 ${grid}px 0`,
  margin: "15px 0",
  borderRadius: '5px',
  boxShadow: "5px 4px 20px 0 rgba(46,61,73,.4)",

  // change background colour if dragging
  background: isDragging ? "hsla(208, 100%, 47%, 1)" : 'hsla(208, 100%, 47%, 0.8)',
  // color: isDragging ? '#fff' : '#000',
  color: "#000",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  // background: isDraggingOver ? '#f7f7f7' : '#f7f7f7',
  // padding: grid,
  padding: "10px 0",
  width: '100%',
  textAlign: 'left',
  marginBottom: '20px',
});


const Answer = styled.div`
  margin-top: 15px;
  width: 100%;
  font-size: 1rem;
  min-height: 100px;
  padding: 15px;
  /* border-radius: 5px; */
  background-color: ${props => props.answerCorrect ? "#c7efc7" : "#ecbaba"};
  /* box-shadow: 5px 4px 25px 0 rgba(46,61,73,.4); */
  /* box-shadow: inset 0 3px 9px hsla(0, 0%, 0%, .15), inset 0 2px 4px hsla(0, 0%, 0%, .12); */

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    font-size: 1.2rem;
  }
`;

const DragDropContainer = styled.div`
  margin: 20px 0;
  /* box-shadow: 0 3px 9px hsla(0, 0%, 0%, .15), 0 2px 4px hsla(0, 0%, 0%, .12); */
  box-shadow: 3px 3px 15px hsla(0, 0%, 0%, .15);
  padding: 20px;
`;

const QuestionP = styled.p`
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 0.9rem;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    font-size: 1rem;
  }
`;

class OrderComponent extends Component {
  constructor(props) {
    super(props);

    this.questions = this.props.data.allOrderYaml.edges;

    // Get correct question
    this.question = this.questions.filter((question) => {
      return parseInt(question.node.questionid) === parseInt(this.props.id);
    })[0].node;

    // Get answers for questions
    var answers = this.question.answers.map((answer) => {
      return answer.answer;
    });

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

    this.state = {
      correctItems: answers.slice(0),
      items: reactLocalStorage.get("orderquestion-" + this.question.questionid) ? answers : this.shuffleArray(answers),
      alreadyAnswered: reactLocalStorage.get("orderquestion-" + this.question.questionid) ? true : false,
      showConfetti: false,
      answerCorrect: null,
      hint: reactLocalStorage.get("orderquestion-" + this.question.questionid) ? "Well, done!" : "",
      buttonClicked: false,
      shakeButton: false
    };

    this.onDragEnd = this.onDragEnd.bind(this);
    this.getAnswer = this.getAnswer.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
      buttonClicked: false
    });
  }

  shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }

    return a;
  }

  getAnswer() {
    var self = this;
    
    const answerCorrect = this.state.items.toString() === this.state.correctItems.toString();

    this.setState({
      buttonClicked: true
    });

    if (answerCorrect) {
      // Store correct answer in local storage
      reactLocalStorage.set("orderquestion-" + this.question.questionid, true);

      this.setState({
        showConfetti: true,
        answerCorrect: true,
        alreadyAnswered: true
      }, () => {
        setTimeout(() => {
          this.setState({showConfetti: false})
        }, 500);
      });
    } else {
      this.setState({
        answerCorrect: false,
        hint: this.question.hint,
        shakeButton: !this.state.shakeButton
      });

      setTimeout(function() {
        self.setState({shakeButton: false})
      }, 400);
    }
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {

    let answer = "";
    if (this.state.buttonClicked | this.state.alreadyAnswered) {
      if (this.state.answerCorrect | this.state.alreadyAnswered) {
        answer = <Answer answerCorrect={true}>{"Well done!"}</Answer>;
      } else {
        answer = <Answer answerCorrect={false}>{this.state.hint}</Answer>;
      }
    }

    return (
      <DragDropContainer >
        <DragDropContext onDragEnd={this.onDragEnd}>
          <QuestionP>{this.props.question}</QuestionP>
          <Droppable droppableId="droppable" key={Math.floor((Math.random() * 6000) + 1)}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.state.items.map((item, index) => (
                  <Draggable draggableId={item} 
                             index={index} 
                             key={index}
                             isDragDisabled={this.state.alreadyAnswered ? true : false}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        key={index + this.props.question}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {item}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Confetti active={ this.state.showConfetti } config={ this.config }/>

          {this.state.shakeButton ? 
          <ShakeLittle >
            <Button onClick={this.getAnswer}>Submit Answer</Button>
          </ShakeLittle> : 
          
          <Button onClick={this.getAnswer}>Submit Answer</Button>}

          {answer}
        </DragDropContext>
      </DragDropContainer>
    );
  }
}

// export default DragDrop;

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allOrderYaml {
          edges {
            node {
              question
              questionid
              hint
              answers {
                answer
              }
            }
          }
        }
      }
    `}
    render={data => <OrderComponent data={data} {...props} />}
  />
)