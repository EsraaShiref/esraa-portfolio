import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { config } from '../../core/config';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
  readonly firstName: string;
  readonly lastName: string;

  constructor() {
    const nameParts = config.developer.fullName.split(' ');
    this.firstName = (nameParts[0] || config.developer.name).toUpperCase();
    this.lastName = nameParts.slice(1).join(' ').toUpperCase();
  }
}
