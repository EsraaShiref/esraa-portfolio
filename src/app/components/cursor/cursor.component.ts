import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-cursor',
  standalone: true,
  template: `<div class="cursor-main" #cursorEl></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CursorComponent implements AfterViewInit {
  @ViewChild('cursorEl', { static: true }) cursorRef!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    let hover = false;
    const cursor = this.cursorRef.nativeElement;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };

    document.addEventListener('mousemove', (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    });

    requestAnimationFrame(function loop() {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        gsap.to(cursor, { x: cursorPos.x, y: cursorPos.y, duration: 0.1 });
      }
      requestAnimationFrame(loop);
    });

    document.querySelectorAll('[data-cursor]').forEach((item) => {
      const element = item as HTMLElement;
      element.addEventListener('mouseover', (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        if (element.dataset['cursor'] === 'icons') {
          cursor.classList.add('cursor-icons');
          gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.1 });
          cursor.style.setProperty('--cursorH', `${rect.height}px`);
          hover = true;
        }
        if (element.dataset['cursor'] === 'disable') {
          cursor.classList.add('cursor-disable');
        }
      });
      element.addEventListener('mouseout', () => {
        cursor.classList.remove('cursor-disable', 'cursor-icons');
        hover = false;
      });
    });
  }
}
