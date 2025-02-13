import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LeadListComponent } from './pages/lead-list/lead-list.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'leads', component: LeadListComponent },
  { path: '**', redirectTo: 'register' } // Default route
];
