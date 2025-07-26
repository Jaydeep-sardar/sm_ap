import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import Dashboard from './components/Dashboard/Dashboard';
import ContentForm from './components/Contents/ContentForm';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contents" element={<Dashboard><ContentForm /></Dashboard>} />
        <Route path="/users" element={<Dashboard><div className="placeholder-content"><h2>Users Page</h2><p>This page is under construction</p></div></Dashboard>} />
        <Route path="/genre" element={<Dashboard><div className="placeholder-content"><h2>Genre Page</h2><p>This page is under construction</p></div></Dashboard>} />
        <Route path="/tags" element={<Dashboard><div className="placeholder-content"><h2>Tags Page</h2><p>This page is under construction</p></div></Dashboard>} />
        <Route path="/watch-age" element={<Dashboard><div className="placeholder-content"><h2>Watch-age Page</h2><p>This page is under construction</p></div></Dashboard>} />
        <Route path="/slider" element={<Dashboard><div className="placeholder-content"><h2>Slider Page</h2><p>This page is under construction</p></div></Dashboard>} />
        <Route path="/webseries" element={<Dashboard><div className="placeholder-content"><h2>Webseries Page</h2><p>This page is under construction</p></div></Dashboard>} />
        <Route path="/movies" element={<Dashboard><div className="placeholder-content"><h2>Movies Page</h2><p>This page is under construction</p></div></Dashboard>} />
        <Route path="/trending" element={<Dashboard><div className="placeholder-content"><h2>Trending Page</h2><p>This page is under construction</p></div></Dashboard>} />
      </Routes>
    </div>
  );
}

export default App;
