import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import { HoverLinksComponent } from '../hover-links/hover-links.component';
import { LenisService } from '../../core/services/lenis.service';
import { registerLenisStart } from '../../core/utils/initial-fx';
import { config } from '../../core/config';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [HoverLinksComponent],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements AfterViewInit {
  readonly config = config;

  constructor(private lenisService: LenisService) {}

  ngAfterViewInit(): void {
    const lenis = this.lenisService.init();
    registerLenisStart(() => this.lenisService.start());

    const links = document.querySelectorAll('.header ul a');
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener('click', (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const target = e.currentTarget as HTMLAnchorElement;
          const section = target.getAttribute('data-href');
          if (section && lenis) {
            const targetEl = document.querySelector(section) as HTMLElement;
            if (targetEl) {
              this.lenisService.scrollTo(targetEl, { offset: 0, duration: 1.5 });
            }
          }
        }
      });
    });
  }
}
