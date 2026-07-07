import * as THREE from 'three';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setCharTimeline, setAllTimeline } from './gsap-scroll';

export default function handleResize(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  canvasDiv: HTMLDivElement | null,
  character: THREE.Object3D
) {
  if (!canvasDiv) return;
  let canvas3d = canvasDiv.getBoundingClientRect();
  const width = canvas3d.width;
  const height = canvas3d.height;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  const workTrigger = ScrollTrigger.getById('work');
  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger != workTrigger) {
      trigger.kill();
    }
  });
  setCharTimeline(character, camera);
  // setAllTimeline();
}
