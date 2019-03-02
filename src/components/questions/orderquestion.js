import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components'
import { StaticQuery, graphql } from "gatsby"
import Button from '../button'
import Confetti from 'react-dom-confetti';

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
  background: isDragging ? "#fcf113" : '#fefab8',
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
  // border: '1px solid #ccc',
  marginBottom: '20px',
  // boxShadow: '5px 5px 25px 0 rgba(46,61,73,.2)'
});

const Answer = styled.div`
  margin-top: 15px;
  width: 100%;
  min-height: 100px;
  padding: 15px;
  border-radius: 5px;
  background-color: ${props => props.answerCorrect ? "#c7efc7" : "#ecbaba"};
  box-shadow: 5px 4px 25px 0 rgba(46,61,73,.4);
`;

const DragDropContainer = styled.div`
  margin: 40px 0;
`;

const QuestionP = styled.p`
  font-weight: bold;
  margin-bottom: 10px;
`;

class OrderComponent extends Component {
  constructor(props) {
    super(props);

    this.questions = this.props.data.allOrderYaml.edges;

    // Get correct question
    this.question = this.questions.filter((question) => {
      return question.node.question === this.props.question;
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
      items: this.shuffleArray(answers),
      showConfetti: false,
      answerCorrect: null,
      hint: "",
      buttonClicked: false
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
    const answerCorrect = this.state.items.toString() === this.state.correctItems.toString();

    this.setState({
      buttonClicked: true
    });

    if (answerCorrect) {
      this.setState({
        showConfetti: true,
        answerCorrect: true
      }, () => {
        setTimeout(() => {
          this.setState({showConfetti: false})
        }, 1000);
      });
    } else {
      this.setState({
        answerCorrect: false,
        hint: this.question.hint
      });
    }
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {

    let answer = "";
    if (this.state.buttonClicked) {
      if (this.state.answerCorrect) {
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
                  <Draggable  draggableId={item} index={index} key={index}>
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
          <Button onClick={this.getAnswer}>Überprüfe deine Antwort</ Button>
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