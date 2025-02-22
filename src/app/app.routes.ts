import { Routes } from '@angular/router';
import { SearchCenterComponent } from './components/search-center/search-center.component';
import { LoginComponent } from './components/login/login.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManageCentersComponent } from './components/admin/manage-centers/manage-centers.component';
import { AuthGuard } from './auth-guard.service';
import { ManagePlanningComponent } from './components/admin/manage-planning/manage-planning.component';
import { MyCenterComponent } from './components/admin/my-center/my-center.component';
import { ManageSuperAdminsComponent } from './components/admin/manage-super-admins/manage-super-admins.component';
import { ManageAdminsComponent } from './components/admin/manage-admins/manage-admins.component';

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
      { path: 'centers', component: ManageCentersComponent, canActivate: [AuthGuard] },
      { path: 'planning', component: ManagePlanningComponent, canActivate: [AuthGuard] },
      { path: 'my-center', component: MyCenterComponent, canActivate: [AuthGuard] },  
      {path: 'super-admins', component: ManageSuperAdminsComponent, canActivate: [AuthGuard]},
      {path: 'admins', component: ManageAdminsComponent, canActivate: [AuthGuard]}
    ],
  }
];
