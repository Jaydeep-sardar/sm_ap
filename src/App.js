import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
