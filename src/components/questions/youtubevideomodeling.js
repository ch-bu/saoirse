import React from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';
import Button from '../button'

const Container = styled.div`
  height: 400px;
  position: relative;

  iframe {
    padding: 0;
    margin: 0;
    z-index: -30;
    height: 393px;
  }
`;

const Overlay = styled.div`
  visibility: ${props => props.showOverlay ? "visible" : "hidden"};
  position: absolute;
  z-index: 29;
  background-color: ${props => props.theme.primaryColorLight};
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  vertical-align: middle;
  text-align: center;

  button {
    margin-top: 18%;
  }
`;
 
const QuestionBack = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* text-align: right; */
  margin-top: 10px;

  button {
    visibility: ${props => props.showButton ? "visible" : "hidden"};
  }
`;

const Answer = styled.p`
    text-decoration: none;
    margin: 0;
    font-size: 0.8rem;
    /* font-weight: bold; */
    color: #ccc;
    cursor: pointer;
`;

class YouTubeVideoModeling extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showOverlay: false,
      videoId: this.props.question,
      showAnswerButton: false,
      showQuestionButton: false,
      viewAnswerButton: true
    };

    this.displayOverlay = this.displayOverlay.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    this.showQuestion = this.showQuestion.bind(this);
  }

  render() {
    const opts = {
      height: '400',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

    return (
      <div>
        <Container>
          <YouTube
            videoId = {this.state.videoId}
            opts = {opts}
            onEnd = {this.displayOverlay}
          />
          <Overlay showOverlay={this.state.showOverlay}>
            <Button onClick={this.showAnswer}>Click to see the answer</Button>
          </Overlay>
        </Container>
        <QuestionBack showButton={this.state.showQuestionButton}>
          <Answer onClick={this.showAnswer}>{this.state.viewAnswerButton ? "View Answer" : ""}</Answer>
          <Button onClick={this.showQuestion}>Show me the question</Button>
        </QuestionBack>
      </div>
    );
  }

  displayOverlay() {
    if (this.state.showQuestionButton === false) {
      this.setState({
        showOverlay: true,
        showQuestionButton: true,
        viewAnswerButton: false
      });
    }
  }

  showAnswer() {
    this.setState({
      showOverlay: false,
      viewAnswerButton: false,
      showQuestionButton: true,
      videoId: this.props.answer,
    });
  }

  showQuestion() {
    this.setState({
      showOverlay: false,
      viewAnswerButton: true,
      showQuestionButton: false,
      videoId: this.props.question,
    });
  }
}

export default YouTubeVideoModeling;