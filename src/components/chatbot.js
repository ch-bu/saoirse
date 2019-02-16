import React from "react"
import ChatBot from 'react-simple-chatbot';
import ReactDOM from 'react-dom'
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';

const steps = [
  {
    id: '1',
    message: 'Please type a number',
    trigger: '2',
  },
  {
    id: '2',
    user: true,
    validator: (value) => {
      if (isNaN(value)) {
        return 'value should be a number';
      }
      return true;
    },
    trigger: '1',
  },
];

const ChatbotContainer = styled.div`
  z-index: -44;
  margin: 40px 0;

  .rsc {
    z-index: 0;

    h2 {
      color: #fff;
    }
  }
`;

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#5781bd',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#5781bd',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};


class Chatbot extends React.Component {

  render() {

    const REACT_VERSION = React.version;

    return (
      <ChatbotContainer>
        <ThemeProvider theme={theme}>
          <ChatBot steps={steps} />
        </ThemeProvider>
      </ChatbotContainer>
    ); 
  }
}

export default Chatbot;