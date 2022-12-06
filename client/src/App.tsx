import React from 'react';
import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';

import Home from './components/pages/Home';
import Week from './components/pages/Week';
import Leaderboards from './components/pages/Leaderboards';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import MakePicks from './components/pages/MakePicks';


function App() {
  return (
    <Router>

      <Header />
      <br /><br /><br /><br /><br /><br />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/week' element={<Week />} />
        <Route path='/picks' element={<MakePicks />} />
        <Route path='/leaderboards' element={<Leaderboards />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>

    </Router>
  );
}

export default App;
