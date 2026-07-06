import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WorkImageComponent } from '../work-image/work-image.component';
import { config } from '../../core/config';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule, RouterLink, WorkImageComponent],
  templateUrl: './work.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkComponent implements AfterViewInit, OnDestroy {
  readonly projects = config.projects.slice(0, 5);
  private timeline: gsap.core.Timeline | null = null;

  ngAfterViewInit(): void {
    // Disable pinning on mobile to allow scrolling
    if (window.innerWidth <= 768) return;

    let translateX = 0;

    const setTranslateX = () => {
      const box = document.getElementsByClassName('work-box');
      if (box.length === 0) return;
      const rectLeft = document
        .querySelector('.work-container')!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      const padding = parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    };

    setTranslateX();

    this.timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.work-section',
        start: 'top top',
        end: `+=${translateX}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        id: 'work',
        invalidateOnRefresh: true,
      },
    });

    this.timeline.to('.work-flex', {
      x: -translateX,
      ease: 'none',
    });

    ScrollTrigger.refresh();
  }

  ngOnDestroy(): void {
    this.timeline?.kill();
    ScrollTrigger.getById('work')?.kill();
  }
}
