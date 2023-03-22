import React, { Component } from 'react';
import Form from './Form';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        Form
        <ErrorBoundary>
          <Form />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
