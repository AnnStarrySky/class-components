import React from 'react';
import Layout from './components/Layout/Layout';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <Layout />
        </ErrorBoundary>
    );
  }
}

export default App;
