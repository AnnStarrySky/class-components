import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout/Layout';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Details from './components/Details/Details';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="details/:id" element={<Details />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;