import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginPage from './components/LoginPage/LoginPage';
import Dashboard from './components/Dashboard/Dashboard';
import ContentForm from './components/Contents/ContentForm';
import Genre from './components/Genre/Genre';
import Tags from './components/Tags/Tags';
import WatchAge from './components/WatchAge/WatchAge';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { validateSession } from './store/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Validate session on app startup
    dispatch(validateSession());
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/contents" element={
          <ProtectedRoute>
            <Dashboard><ContentForm /></Dashboard>
          </ProtectedRoute>
        } />
        <Route path="/genre" element={
          <ProtectedRoute>
            <Dashboard><Genre /></Dashboard>
          </ProtectedRoute>
        } />
        <Route path="/tags" element={
          <ProtectedRoute>
            <Dashboard><Tags /></Dashboard>
          </ProtectedRoute>
        } />
        <Route path="/watch-age" element={
          <ProtectedRoute>
            <Dashboard><WatchAge /></Dashboard>
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
