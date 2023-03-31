import React, { useRef } from 'react';
import DisplaySection from './components/DisplaySection';
import Jumbotron from './components/Jumbotron';
import NavBar from './components/NavBar';
import SoundSection from './components/SoundSection';
import WebgiViewer from './components/WebgiViewer';
import Loader from './components/Loader';

const App = () => {
  const contentRef = useRef();
  const webgiViewerRef = useRef();

  const handlePreview = () => {
    webgiViewerRef.current.triggerPreview();
  };

  return (
    <div className="App">
      <Loader />
      <div id="content" ref={contentRef}>
        <NavBar />
        <Jumbotron />
        <SoundSection />
        <DisplaySection triggerPreview={handlePreview} />
      </div>
      <WebgiViewer contentRef={contentRef} ref={webgiViewerRef} />
    </div>
  );
};

export default App;
