import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import Counter from "./components/Counter";
import TemporaryDrawer from "./UI/Sidebar";
import FormPlans from "./components/FormPlans";

import TeamPage from "./components/Teampage";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./components/Home";
import SearchGrid from "./UI/SearchGrid";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="team" element={<TeamPage />} />
        <Route path='plans' element={<SearchGrid />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
