import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { JoinComponent } from './pages/join/join.component';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'join', component: JoinComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '' }
];