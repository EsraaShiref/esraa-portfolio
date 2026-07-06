import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { config } from '../../core/config';

@Component({
  selector: 'app-what-i-do',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './what-i-do.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhatIDoComponent implements AfterViewInit {
  @ViewChildren('whatContent') contentRefs!: QueryList<ElementRef<HTMLDivElement>>;

  readonly config = config;

  ngAfterViewInit(): void {
    if ((ScrollTrigger as any).isTouch) {
      this.contentRefs.forEach((ref) => {
        const container = ref.nativeElement;
        container.classList.remove('what-noTouch');
        container.addEventListener('click', () => this.handleClick(container));
      });
    }
  }

  private handleClick(container: HTMLDivElement): void {
    container.classList.toggle('what-content-active');
    container.classList.remove('what-sibling');
    if (container.parentElement) {
      const siblings = Array.from(container.parentElement.children);
      siblings.forEach((sibling) => {
        if (sibling !== container) {
          sibling.classList.remove('what-content-active');
          sibling.classList.toggle('what-sibling');
        }
      });
    }
  }
}
