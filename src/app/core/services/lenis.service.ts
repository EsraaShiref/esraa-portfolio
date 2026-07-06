import { Injectable } from '@angular/core';
import Lenis from 'lenis';

/**
 * Wraps the Lenis smooth-scroll instance in an injectable singleton.
 * Replaces the module-level `export let lenis` from the original
 * React Navbar.tsx so any component/util can start/stop/scrollTo
 * without importing from a component file.
 */
@Injectable({ providedIn: 'root' })
export class LenisService {
  private instance: Lenis | null = null;

  init(): Lenis {
    if (this.instance) return this.instance;

    this.instance = new Lenis({
      duration: 1.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.7,
      touchMultiplier: 2,
      infinite: false,
    });

    // Start paused - matches original behavior (unpaused by initialFX)
    this.instance.stop();

    const raf = (time: number) => {
      this.instance?.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    window.addEventListener('resize', () => this.instance?.resize());

    return this.instance;
  }

  get(): Lenis | null {
    return this.instance;
  }

  start(): void {
    this.instance?.start();
  }

  stop(): void {
    this.instance?.stop();
  }

  scrollTo(target: HTMLElement, options?: { offset?: number; duration?: number }): void {
    this.instance?.scrollTo(target, options);
  }

  destroy(): void {
    this.instance?.destroy();
    this.instance = null;
  }
}
