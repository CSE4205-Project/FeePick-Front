import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './screens/MainPage/MainPage'
import CalPage from './screens/CalPage/CalPage'
import ListPage from './screens/ListPage/ListPage'
import DetailPage from './screens/DetailPage/DetailPage';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/calPage" element={<CalPage/>} />
          <Route path="/listPage" element={<ListPage/>} />
          <Route path="/detailPage" element={<DetailPage/>} />
          <Route path="/" element={<MainPage/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
