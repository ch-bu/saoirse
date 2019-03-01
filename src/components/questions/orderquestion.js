import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { StaticQuery, graphql } from "gatsby"
import Button from '../button'

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 10;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  borderRadius: '5px',

  // change background colour if dragging
  background: isDragging ? '#5781bd' : '#ffefa2',
  color: isDragging ? '#fff' : '#000',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? '#f7f7f7' : '#f7f7f7',
  padding: grid,
  width: '100%',
  textAlign: 'left',
  border: '1px solid #ccc',
  marginBottom: '20px',
  // boxShadow: '5px 5px 25px 0 rgba(46,61,73,.2)'
});


const DragDropContainer = styled.div`
  margin: 40px 0;
`;

const QuestionP = styled.p`
  font-weight: bold;
`;

class OrderComponent extends Component {
  constructor(props) {
    super(props);

    this.questions = this.props.data.allOrderYaml.edges;

    // Get correct question
    this.question = this.questions.filter((question) => {
      return question.node.question == this.props.question;
    })[0].node;

    // Get answers for questions
    var answers = this.question.answers.map((answer) => {
      return answer.answer;
    });

    this.state = {
      correctItems: answers.slice(0),
      items: this.shuffleArray(answers),
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
    const answerCorrect = this.state.items.toString() == this.state.correctItems.toString();

    Swal({
      title: answerCorrect ? 'Richtig': "Leider falsch",
      text: answerCorrect ? "" : this.question.hint,
      type: answerCorrect ? 'success': "error"
    });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
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
          <Button onClick={this.getAnswer}>Überprüfe deine Antwort</ Button>
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