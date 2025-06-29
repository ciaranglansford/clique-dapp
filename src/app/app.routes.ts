import { Routes } from '@angular/router';
import { JoinComponent } from './pages/join/join.component';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
  { path: '', component: JoinComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '' }
];