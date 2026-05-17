import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorProvider } from './contexts/ErrorContext';
import { AuthProvider } from './contexts/AuthContext';
// ... 其他 imports ...

function App() {
  return (
    <ErrorProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* 你原本嘅 routes 全部保留喺呢度 */}
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorProvider>
  );
}

export default App;
