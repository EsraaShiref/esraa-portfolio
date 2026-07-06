import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { config } from '../../core/config';

@Component({
  selector: 'app-call-to-action',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="cta-section">
      <div class="cta-buttons">
        <a routerLink="/play" class="cta-btn cta-btn-play" data-cursor="disable">
          Play With Me &rarr;
        </a>
        <a
          [href]="config.contact.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          class="cta-btn cta-btn-hire"
          data-cursor="disable"
        >
          Hire Me &rarr;
        </a>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CallToActionComponent {
  readonly config = config;
}
