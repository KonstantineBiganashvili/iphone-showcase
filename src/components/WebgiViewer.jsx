import React, { useEffect, useCallback, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollAnimation } from '../lib/scroll-animation';
import { setupViewer } from '../lib/setup-viewer';
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';
import { useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const WebgiViewer = forwardRef(({ contentRef }, ref) => {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const [viewerRef, setViewerRef] = useState(null);
  const [targetRef, setTargetRef] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [positionRef, setPositionRef] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [isMobile, setMobile] = useState(null);

  useImperativeHandle(ref, () => ({
    triggerPreview() {
      contentRef.current.style.opacity = 0;
      canvasContainerRef.current.style.pointerEvents = 'all';
      viewerRef.scene.activeCamera.setCameraOptions({ controlsEnabled: true });

      setPreviewMode(true);

      gsap.to(positionRef, {
        x: 13.04,
        y: -2.01,
        z: 2.29,
        duration: 2,
        onUpdate: () => {
          viewerRef.setDirty(), cameraRef.positionTargetUpdated(true);
        },
      });

      gsap.to(targetRef, {
        x: 0.11,
        y: 0.0,
        z: 0.0,
        duration: 2,
      });
    },
  }));

  const assignRefs = (viewer, target, camera, position) => {
    setViewerRef(viewer);
    setTargetRef(target);
    setCameraRef(camera);
    setPositionRef(position);
  };

  const checkMobile = (value) => {
    setMobile(value);
  };

  const memoizedScrollAnimation = useCallback(
    (position, target, isMobile, onUpdate) => {
      if (position && target && onUpdate)
        scrollAnimation(position, target, isMobile, onUpdate);
    },
    []
  );

  const setupNewViewer = useCallback(() => {
    setupViewer(
      memoizedScrollAnimation,
      canvasRef,
      contentRef,
      assignRefs,
      checkMobile
    );
  }, []);

  const handleExit = useCallback(() => {
    contentRef.current.style.opacity = 1;
    canvasContainerRef.current.style.pointerEvents = 'none';
    viewerRef.scene.activeCamera.setCameraOptions({ controlsEnabled: false });

    setPreviewMode(false);

    gsap.to(positionRef, {
      x: !isMobile ? 1.56 : 9.36,
      y: !isMobile ? 5.0 : 10.95,
      z: !isMobile ? 0.01 : 0.09,
      scrollTrigger: {
        trigger: '.display-section',
        start: 'top bottom',
        end: 'top top',
        scrub: 2,
        immediateRender: false,
      },
      onUpdate: () => {
        viewerRef.setDirty();
        cameraRef.positionTargetUpdated(true);
      },
    });

    gsap.to(targetRef, {
      x: !isMobile ? -0.55 : -1.62,
      y: !isMobile ? 0.32 : 0.02,
      z: !isMobile ? 0.0 : -0.06,
      scrollTrigger: {
        trigger: '.display-section',
        start: 'top bottom',
        end: 'top top',
        scrub: 2,
        immediateRender: false,
      },
    });
  }, [canvasContainerRef, viewerRef, positionRef, cameraRef, targetRef]);

  useEffect(() => {
    setupNewViewer();
  }, []);

  return (
    <div ref={canvasContainerRef} id="webgi-canvas-container">
      <canvas id="webgi-canvas" ref={canvasRef} />
      {previewMode && (
        <button className="button" onClick={handleExit}>
          exit
        </button>
      )}
    </div>
  );
});

export default WebgiViewer;
