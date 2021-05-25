import React from 'react';
import Box from '@material-ui/core/Box';

import Sheet from "./Sheet";

import '../styles/App.css';


function App() {
  return (
    <Box minHeight="100vh" className="App">
      <p>Rhythm Expert</p>
      <Sheet />
    </Box>
  );
}

export default App;
