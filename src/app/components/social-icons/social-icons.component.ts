import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { HoverLinksComponent } from '../hover-links/hover-links.component';
import { config } from '../../core/config';

@Component({
  selector: 'app-social-icons',
  standalone: true,
  imports: [HoverLinksComponent],
  templateUrl: './social-icons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialIconsComponent implements AfterViewInit {
  readonly config = config;

  ngAfterViewInit(): void {
    const social = document.getElementById('social') as HTMLElement;
    if (!social) return;

    social.querySelectorAll('span').forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector('a') as HTMLElement;
      if (!link) return;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        link.style.setProperty('--siLeft', `${currentX}px`);
        link.style.setProperty('--siTop', `${currentY}px`);
        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      updatePosition();
    });
  }
}
