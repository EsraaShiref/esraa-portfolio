import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { config } from '../../core/config';

@Component({
  selector: 'app-my-works',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-works.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyWorksComponent {
  readonly projects = config.projects;
}
