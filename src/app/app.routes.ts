import { Routes } from '@angular/router';
import { SearchCenterComponent } from './components/search-center/search-center.component';
import { LoginComponent } from './login/login.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ManageCentersComponent } from './admin/manage-centers/manage-centers.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { AuthGuard } from './auth-guard.service';
import { ManagePlanningComponent } from './admin/manage-planning/manage-planning.component';
import { MyCenterComponent } from './admin/my-center/my-center.component';

export const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: SearchCenterComponent },
  { path: 'appointment', component: AppointmentFormComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'centers', component: ManageCentersComponent },
      { path: 'users', component: ManageUsersComponent },
      { path: 'planning', component: ManagePlanningComponent },
      { path: 'my-center', component: MyCenterComponent },  
    ],
  }
];
