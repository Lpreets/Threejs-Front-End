import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath'; // Make sure 'easing' functions are available from 'maath'
import { useSnapshot } from 'valtio';

import state from '../store';

const CameraRig = ({ children }) => {
  const group = useRef();
  const snap = useSnapshot(state);

  useFrame((frameState, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    let targetPosition = [-0.4, 0, 2];
    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5];
      else targetPosition = [0, 0, 2];
    }

    easing.damp3(frameState.camera.position, targetPosition, 0.25, delta);
    easing.dampE(
      group.current.rotation,
      [frameState.pointer.y / 10, -frameState.pointer.x / 5, 0],
      0.25,
      delta
    );
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
