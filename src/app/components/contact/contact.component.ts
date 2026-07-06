import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { config } from '../../core/config';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  readonly config = config;
  readonly currentYear = new Date().getFullYear();
  private contactTimeline: gsap.core.Timeline | null = null;

  ngAfterViewInit(): void {
    this.contactTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 80%',
        end: 'bottom center',
        toggleActions: 'play none none none',
      },
    });

    this.contactTimeline.fromTo(
      '.contact-section h3',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    this.contactTimeline.fromTo(
      '.contact-box',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out' },
      '-=0.4'
    );
  }

  ngOnDestroy(): void {
    this.contactTimeline?.kill();
  }
}
