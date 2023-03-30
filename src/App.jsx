import React from 'react';
import DisplaySection from './components/DisplaySection';
import Jumbotron from './components/Jumbotron';
import NavBar from './components/NavBar';
import SoundSection from './components/SoundSection';

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Jumbotron />
      <SoundSection />
      <DisplaySection />
    </div>
  );
};

export default App;
