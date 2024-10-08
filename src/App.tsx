import React from 'react';
import './App.css';
import Navbar from './component/navbar';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './page/home/home';
import CollectionPage from './page/users/collection/home';
import { CollectionCreatorPage } from './page';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element="" />
        <Route path="/services" element="" />
        <Route path="/profile" element={ <CollectionPage /> } />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/collection/create" element={<CollectionCreatorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
