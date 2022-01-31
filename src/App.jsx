import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './landing-page/LandingPage';
import Page404 from './404/Page404';
import './App.css';
import SingleFact from './single-fact/SingleFact';

function App() {
  return (
    <div className="App">
      <header className="App-header App-marginals">
        <img src="/icons8-chuck-norris-100.png" alt="chuckie"/>
        <h1>Chuck Norris random facts</h1>
      </header>
      <div className="App-body">
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/detail/:id" element={<SingleFact/>}/>
            <Route path="*" element={<Page404/>}/>
          </Routes>
        </Router>
      </div>
      <footer className="App-footer App-marginals">
        <p className='comment'>
          <a target="_blank" href="https://icons8.com/icon/B66tBXIKOwR9/chuck-norris" rel="noreferrer">Chuck Norris</a>,&nbsp;
          <a target="_blank" href="https://icons8.com/icon/3641/road-closure"  rel="noreferrer">Road Closure</a>
          &nbsp; icons by &nbsp;
          <a target="_blank" href="https://icons8.com" rel="noreferrer">Icons8</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
