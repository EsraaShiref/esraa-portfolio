import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { techStack } from './tech-stack-data';

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tech-stack.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackComponent {
  readonly techStack = techStack;
}
