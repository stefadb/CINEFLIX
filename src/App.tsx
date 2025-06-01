import { useState } from 'react';
import './App.css'
import MovieSearch from './components/pages/MovieSearch'
import SidebarLeft from './components/SidebarLeft'
import type { SavedMovie } from './types/types';
import SavedMovies from './components/pages/SavedMovies';
import { MovieContextProvider, useMovieContext } from './context/MovieContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieDetails from './components/pages/MovieDetailsPage';
import SidebarTopContainer from './components/SidebarTopContainer';
import SidebarBottomContainer from './components/SidebarBottomContainer';

function App() {
  const MC = useMovieContext();
  return (
    <Router>
      <main className="main-container">
        <SidebarLeft />
        <SidebarTopContainer />
        <div style={{ padding: "8px", flexGrow: 1, overflowY: "auto", overflowX: "hidden", maxWidth: "100%"}}>
          <Routes>
            <Route path="/search" element={<MovieSearch />} />
            <Route path="/saved" element={<SavedMovies />} />
            <Route path="/details" element={<MovieDetails />} />
          </Routes>
        </div>
        <SidebarBottomContainer />
      </main>
    </Router>
  )
}

export default App
