import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorProvider } from './contexts/ErrorContext';
// ... 其他 imports ...

function App() {
  return (
    <ErrorProvider>
      <Router>
        <Routes>
          {/* ... 你原本嘅 routes ... */}
        </Routes>
      </Router>
    </ErrorProvider>
  );
}

export default App;
