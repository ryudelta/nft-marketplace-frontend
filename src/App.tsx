import React from 'react';
import './App.css';
import Navbar from './component/navbar';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import routes from './AppRoutes/routes';


const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
            {routes.map((route) => (
            <Route key={route.key} path={route.path} element={React.createElement(route.component)} />
        ))}
        </Routes>
    </Router>
  );
};

export default App;
