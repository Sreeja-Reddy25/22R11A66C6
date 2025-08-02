

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Redirector from './pages/Redirector';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:shortCode" element={<Redirector />} />
      </Routes>
    </Router>
  );
}

export default App;
