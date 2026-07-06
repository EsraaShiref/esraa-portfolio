import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MyWorksComponent } from './pages/my-works/my-works.component';
import { PlayComponent } from './pages/play/play.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'myworks', component: MyWorksComponent },
  { path: 'play', component: PlayComponent },
];
