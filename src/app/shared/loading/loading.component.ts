import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  /** Current load percentage, 0-100, driven by CharacterComponent. */
  readonly percent = input.required<number>();

  loaded = false;
  isLoaded = false;
  clicked = false;

  readonly marqueeItems = [
    'Full-Stack Developer',
    'Angular Developer',
    'Full-Stack Developer',
    'Angular Developer',
  ];

  constructor(private loadingService: LoadingService) {
    effect(() => {
      const value = this.percent();
      if (value >= 100 && !this.loaded) {
        setTimeout(() => {
          this.loaded = true;
          setTimeout(() => {
            this.isLoaded = true;
            this.onLoadedChange();
          }, 1000);
        }, 600);
      }
    });
  }

  private onLoadedChange(): void {
    if (!this.isLoaded) return;
    this.clicked = true;
    import('../../core/utils/initial-fx').then((module) => {
      setTimeout(() => {
        module.initialFX?.();
        this.loadingService.setIsLoading(false);
      }, 900);
    });
  }

  onMouseMove(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
  }
}
