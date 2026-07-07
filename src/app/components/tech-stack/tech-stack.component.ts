import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { techStack } from './tech-stack-data';

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tech-stack.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackComponent implements AfterViewInit {
  @ViewChild('techVideo') videoRef?: ElementRef<HTMLVideoElement>;

  readonly techStack = techStack;

  ngAfterViewInit(): void {
    const video = this.videoRef?.nativeElement;
    if (!video) return;

    // Belt-and-suspenders for autoplay: some Chrome versions won't honor
    // the `muted` HTML attribute alone inside an SPA route, so set the
    // property explicitly and call play() ourselves, swallowing the
    // promise rejection some browsers throw if a gesture is required.
    video.muted = true;
    video.play().catch((err) => {
      console.warn('Tech stack video autoplay was blocked:', err);
    });
  }
}