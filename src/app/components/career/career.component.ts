import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { config } from '../../core/config';

@Component({
  selector: 'app-career',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './career.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareerComponent {
  readonly config = config;

  getDisplayYear(period: string): string {
    if (period.includes('Present')) return 'NOW';
    if (period.includes(' - ')) return period.split(' - ')[0];
    return period;
  }
}
