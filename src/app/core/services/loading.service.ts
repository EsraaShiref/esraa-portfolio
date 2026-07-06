import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  // Skip the 3D loading screen on mobile (no 3D model shown there)
  readonly isLoading = signal<boolean>(
    typeof window !== 'undefined' ? window.innerWidth > 768 : true
  );
  readonly loadingPercent = signal<number>(0);

  setIsLoading(state: boolean): void {
    this.isLoading.set(state);
  }

  setLoading(percent: number): void {
    this.loadingPercent.set(percent);
  }
}

/**
 * Port of the original `setProgress` helper from Loading.tsx.
 * Drives a simulated progress percentage while the 3D character
 * model is being fetched/decrypted/parsed in the background.
 */
export function setProgress(setLoading: (value: number) => void) {
  let percent = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      const rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random());
        setLoading(percent);
        if (percent > 91) {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }

  return { loaded, percent, clear };
}
