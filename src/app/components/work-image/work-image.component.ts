import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-work-image',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="work-image">
      <a
        class="work-image-in"
        [href]="link()"
        (mouseenter)="handleMouseEnter()"
        (mouseleave)="isVideo.set(false)"
        target="_blank"
        data-cursor="disable"
      >
        <div class="work-link" *ngIf="link()">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M6 6l10.59 10.59L18 15.17V6H6z" transform="rotate(45 12 12)"/>
          </svg>
        </div>
        <img [src]="image()" [alt]="alt()" />
        <video *ngIf="isVideo()" [src]="videoUrl()" autoplay muted playsinline loop></video>
      </a>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkImageComponent {
  readonly image = input.required<string>();
  readonly alt = input<string>('');
  readonly video = input<string | undefined>();
  readonly link = input<string | undefined>();

  readonly isVideo = signal(false);
  readonly videoUrl = signal('');

  async handleMouseEnter(): Promise<void> {
    const videoPath = this.video();
    if (videoPath) {
      this.isVideo.set(true);
      const response = await fetch(`assets/${videoPath}`);
      const blob = await response.blob();
      this.videoUrl.set(URL.createObjectURL(blob));
    }
  }
}
