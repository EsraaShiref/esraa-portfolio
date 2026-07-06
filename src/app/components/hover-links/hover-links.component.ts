import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-hover-links',
  standalone: true,
  template: `
    <div class="hover-link" [attr.data-cursor]="cursor() ? null : 'disable'">
      <div class="hover-in">{{ text() }} <div>{{ text() }}</div></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoverLinksComponent {
  readonly text = input.required<string>();
  readonly cursor = input<boolean>(false);
}
