import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../core/services/loading.service';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { CursorComponent } from '../../components/cursor/cursor.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SocialIconsComponent } from '../../components/social-icons/social-icons.component';
import { CharacterComponent } from '../../components/character/character.component';
import { LandingComponent } from '../../components/landing/landing.component';
import { AboutComponent } from '../../components/about/about.component';
import { WhatIDoComponent } from '../../components/what-i-do/what-i-do.component';
import { CareerComponent } from '../../components/career/career.component';
import { WorkComponent } from '../../components/work/work.component';
import { TechStackComponent } from '../../components/tech-stack/tech-stack.component';
import { CallToActionComponent } from '../../components/call-to-action/call-to-action.component';
import { ContactComponent } from '../../components/contact/contact.component';
import setSplitText from '../../core/utils/split-text';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    CursorComponent,
    NavbarComponent,
    SocialIconsComponent,
    CharacterComponent,
    LandingComponent,
    AboutComponent,
    WhatIDoComponent,
    CareerComponent,
    WorkComponent,
    TechStackComponent,
    CallToActionComponent,
    ContactComponent,
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  readonly isDesktopView = signal(
    typeof window !== 'undefined' ? window.innerWidth > 1024 : true
  );
  readonly isMobile =
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false;

  constructor(public loadingService: LoadingService) {}

  ngAfterViewInit(): void {
    this.handleResize();
    // Skip the 3D loading screen on mobile, matching original LoadingProvider
    if (this.isMobile) {
      import('../../core/utils/initial-fx').then((module) => {
        setTimeout(() => module.initialFX?.(), 100);
      });
    }
  }

  @HostListener('window:resize')
  handleResize(): void {
    setSplitText();
    this.isDesktopView.set(window.innerWidth > 1024);
  }

  ngOnDestroy(): void {}
}
