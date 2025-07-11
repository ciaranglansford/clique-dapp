import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { PotInfoComponent } from './pages/pots/pot-info/pot-info.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'user', component: UserProfileComponent},
  { path: 'pots/:contractAddress', component: PotInfoComponent },
  { path: '**', redirectTo: '' }
];