import React from 'react';
import Box from '@material-ui/core/Box';

import Sheet from "./Sheet";

import '../styles/App.css';

const notes = [
  [
    ['qn', 'qn', 'qn', 'qn'], ['qn', 'hn', 'qn'], ['hn', 'hn'], ['qn', 'qn', 'qn', 'qn']
  ],
  [
    ['hn', 'hn'], ['hn', 'qn', 'qn'], ['qn', 'qn', 'hn'], ['qn', 'hn', 'qn']
  ],
  // [
  //   ['qn', 'qn', 'qn', 'qn'], ['qn', 'hn', 'qn'], ['qn', 'qn', 'qn', 'qn'], ['hn', 'hn']
  // ]
]

function App() {
  return (
    <Box minHeight="100vh" className="App">
      <p>Rhythm Expert</p>
      <Sheet notes={notes} />
    </Box>
  );
}

export default App;
