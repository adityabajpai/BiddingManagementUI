import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import LoadComponent from './Components/LoadComponent';

function App() {
  return (
    <BrowserRouter>
      <div>
          <LoadComponent/>
      </div >
    </BrowserRouter>
  );
}

export default App;
