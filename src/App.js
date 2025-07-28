import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginPage from './components/LoginPage/LoginPage';
import Dashboard from './components/Dashboard/Dashboard';
import ContentForm from './components/Contents/ContentForm';
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
        <Route path="/users" element={
          <ProtectedRoute>
            <Dashboard><div className="placeholder-content"><h2>Users Page</h2><p>This page is under construction</p></div></Dashboard>
          </ProtectedRoute>
        } />
        <Route path="/genre" element={
          <ProtectedRoute>
            <Dashboard><div className="placeholder-content"><h2>Genre Page</h2><p>This page is under construction</p></div></Dashboard>
          </ProtectedRoute>
        } />
        <Route path="/tags" element={
          <ProtectedRoute>
            <Dashboard><div className="placeholder-content"><h2>Tags Page</h2><p>This page is under construction</p></div></Dashboard>
          </ProtectedRoute>
        } />
        <Route path="/watch-age" element={
          <ProtectedRoute>
            <Dashboard><div className="placeholder-content"><h2>Watch-age Page</h2><p>This page is under construction</p></div></Dashboard>
          </ProtectedRoute>
        } />
        <Route path="/slider" element={
          <ProtectedRoute>
            <Dashboard><div className="placeholder-content"><h2>Slider Page</h2><p>This page is under construction</p></div></Dashboard>
          </ProtectedRoute>
        } />
        <Route path="/webseries" element={
          <ProtectedRoute>
            <Dashboard><div className="placeholder-content"><h2>Webseries Page</h2><p>This page is under construction</p></div></Dashboard>
          </ProtectedRoute>
        } />
        <Route path="/movies" element={
          <ProtectedRoute>
            <Dashboard><div className="placeholder-content"><h2>Movies Page</h2><p>This page is under construction</p></div></Dashboard>
          </ProtectedRoute>
        } />
        <Route path="/trending" element={
          <ProtectedRoute>
            <Dashboard><div className="placeholder-content"><h2>Trending Page</h2><p>This page is under construction</p></div></Dashboard>
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
