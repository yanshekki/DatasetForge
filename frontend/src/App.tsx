import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorProvider } from './contexts/ErrorContext';
import { AuthProvider } from './contexts/AuthContext';
// ... 其他 imports (DatasetListPage, LoginPage 等) ...

function App() {
  return (
    <ErrorProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* 你原本嘅 routes 全部保留喺呢度 */}
            <Route path="/" element={<DatasetListPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/datasets/:id" element={<DatasetDetailPage />} />
            <Route path="/shared/:token" element={<PublicSharePage />} />
            {/* ... 其他 routes ... */}
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorProvider>
  );
}

export default App;
