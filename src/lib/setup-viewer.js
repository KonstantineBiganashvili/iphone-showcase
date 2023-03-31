import {
  ViewerApp,
  AssetManagerPlugin,
  GBufferPlugin,
  ProgressivePlugin,
  TonemapPlugin,
  SSRPlugin,
  SSAOPlugin,
  BloomPlugin,
  GammaCorrectionPlugin,
  mobileAndTabletCheck,
} from 'webgi';

export const setupViewer = async (
  scrollAnimation,
  canvasRef,
  contentRef,
  assignRefs,
  checkMobile
) => {
  const viewer = new ViewerApp({
    canvas: canvasRef.current,
  });

  const isMobileOrTablet = mobileAndTabletCheck();
  checkMobile(isMobileOrTablet);

  const manager = await viewer.addPlugin(AssetManagerPlugin);
  const camera = viewer.scene.activeCamera;
  const { position, target } = camera;

  await viewer.addPlugin(GBufferPlugin);
  await viewer.addPlugin(new ProgressivePlugin(32));
  await viewer.addPlugin(new TonemapPlugin(true));
  await viewer.addPlugin(GammaCorrectionPlugin);
  await viewer.addPlugin(SSRPlugin);
  await viewer.addPlugin(SSAOPlugin);
  await viewer.addPlugin(BloomPlugin);

  viewer.renderer.refreshPipeline();

  await manager.addFromPath('./scene-black.glb');

  viewer.getPlugin(TonemapPlugin).config.clipBackground = true;

  viewer.scene.activeCamera.setCameraOptions({
    controlsEnabled: false,
  });

  if (isMobileOrTablet) {
    position.set(-16.7, 1.17, 11.7);
    target.set(0, 1.37, 0);

    contentRef.current.className = 'mobile-or-tablet';
  }

  window.scrollTo(0, 0);

  let needsUpdate = true;

  const onUpdate = () => {
    needsUpdate = true;
    viewer.setDirty();
  };

  viewer.addEventListener('preFrame', () => {
    if (needsUpdate) {
      camera.positionTargetUpdated(true);
      needsUpdate = false;
    }
  });

  scrollAnimation(position, target, isMobileOrTablet, onUpdate);
  assignRefs(viewer, target, camera, position);
};
