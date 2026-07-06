import { ChangeDetectionStrategy, Component } from '@angular/core';
import { config } from '../../core/config';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="about-section" id="about">
      <div class="about-me">
        <h3 class="title">{{ config.about.title }}</h3>
        <p class="para">{{ config.about.description }}</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  readonly config = config;
}
