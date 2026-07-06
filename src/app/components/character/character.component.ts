import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import setCharacter from '../../core/three/utils/character';
import setLighting from '../../core/three/utils/lighting';
import setAnimations from '../../core/three/utils/animation-utils';
import handleResize from '../../core/three/utils/resize-utils';
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from '../../core/three/utils/mouse-utils';
import { LoadingService, setProgress } from '../../core/services/loading.service';

@Component({
  selector: 'app-character',
  standalone: true,
  templateUrl: './character.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasDiv', { static: true }) canvasDivRef!: ElementRef<HTMLDivElement>;
  @ViewChild('hoverDiv', { static: true }) hoverDivRef!: ElementRef<HTMLDivElement>;

  private scene = new THREE.Scene();
  private character: THREE.Object3D | null = null;
  private animationFrameId: number | null = null;
  private resizeListener: (() => void) | null = null;
  private mouseMoveListener: ((e: MouseEvent) => void) | null = null;
  private touchStartListener: ((e: TouchEvent) => void) | null = null;
  private touchEndListener: (() => void) | null = null;
  private touchDebounce: ReturnType<typeof setTimeout> | undefined;
  private landingDiv: HTMLElement | null = null;
  private renderer: THREE.WebGLRenderer | null = null;

  constructor(private loadingService: LoadingService) {}

  ngAfterViewInit(): void {
    const canvasDiv = this.canvasDivRef.nativeElement;
    if (!canvasDiv) return;

    const rect = canvasDiv.getBoundingClientRect();
    const container = { width: rect.width, height: rect.height };
    const aspect = container.width / container.height;
    const scene = this.scene;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: window.devicePixelRatio < 2,
      powerPreference: 'high-performance',
    });
    this.renderer = renderer;
    renderer.setSize(container.width, container.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    canvasDiv.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
    camera.position.z = 10;
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    let headBone: THREE.Object3D | null = null;
    let screenLight: any | null = null;
    let mixer: THREE.AnimationMixer;

    const clock = new THREE.Clock();

    const light = setLighting(scene);
    const progress = setProgress((value) => this.loadingService.setLoading(value));
    const { loadCharacter } = setCharacter(renderer, scene, camera);

    loadCharacter().then((gltf) => {
      if (gltf) {
        const animations = setAnimations(gltf);
        if (this.hoverDivRef.nativeElement) {
          animations.hover(gltf, this.hoverDivRef.nativeElement);
        }
        mixer = animations.mixer;
        const character = gltf.scene;
        this.character = character;
        scene.add(character);
        headBone = character.getObjectByName('spine006') || null;
        screenLight = character.getObjectByName('screenlight') || null;
        progress.loaded().then(() => {
          setTimeout(() => {
            light.turnOnLights();
            animations.startIntro();
          }, 2500);
        });
        this.resizeListener = () =>
          handleResize(renderer, camera, canvasDiv, character);
        window.addEventListener('resize', this.resizeListener);
      }
    });

    let mouse = { x: 0, y: 0 };
    let interpolation = { x: 0.1, y: 0.2 };

    this.mouseMoveListener = (event: MouseEvent) => {
      handleMouseMove(event, (x, y) => (mouse = { x, y }));
    };

    this.touchStartListener = (event: TouchEvent) => {
      const element = event.target as HTMLElement;
      this.touchDebounce = setTimeout(() => {
        element?.addEventListener('touchmove', (e: TouchEvent) =>
          handleTouchMove(e, (x, y) => (mouse = { x, y }))
        );
      }, 200);
    };

    this.touchEndListener = () => {
      handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };

    document.addEventListener('mousemove', this.mouseMoveListener);
    this.landingDiv = document.getElementById('landingDiv');
    if (this.landingDiv) {
      this.landingDiv.addEventListener('touchstart', this.touchStartListener);
      this.landingDiv.addEventListener('touchend', this.touchEndListener);
    }

    const animate = () => {
      this.animationFrameId = requestAnimationFrame(animate);
      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );
        light.setPointLight(screenLight);
      }
      const delta = clock.getDelta();
      if (mixer) {
        mixer.update(delta);
      }
      renderer.render(scene, camera);
    };
    animate();
  }

  ngOnDestroy(): void {
    clearTimeout(this.touchDebounce);
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.scene.clear();
    this.renderer?.dispose();
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
    const canvasDiv = this.canvasDivRef?.nativeElement;
    if (canvasDiv && this.renderer) {
      canvasDiv.removeChild(this.renderer.domElement);
    }
    if (this.mouseMoveListener) {
      document.removeEventListener('mousemove', this.mouseMoveListener);
    }
    if (this.landingDiv) {
      if (this.touchStartListener) {
        this.landingDiv.removeEventListener('touchstart', this.touchStartListener);
      }
      if (this.touchEndListener) {
        this.landingDiv.removeEventListener('touchend', this.touchEndListener);
      }
    }
  }
}
