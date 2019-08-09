import React from 'react';
import { Row, Container } from 'reactstrap';
import './App.css';
import Calendar from '../calendar/Calendar';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Row>
            <Calendar />
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default App;
