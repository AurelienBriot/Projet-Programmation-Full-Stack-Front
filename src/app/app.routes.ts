import { Routes } from '@angular/router';
import { SearchCenterComponent } from './components/search-center/search-center.component';
import { LoginComponent } from './components/login/login.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManageCentersComponent } from './components/admin/manage-centers/manage-centers.component';
import { AuthGuard } from './auth-guard.service';
import { ManagePlanningComponent } from './components/admin/manage-planning/manage-planning.component';
import { ManageSuperAdminsComponent } from './components/admin/manage-super-admins/manage-super-admins.component';
import { ManageAdminsComponent } from './components/admin/manage-admins/manage-admins.component';
import { ManageMedecinsComponent } from './components/admin/manage-medecins/manage-medecins.component';
import { ManageTimeslotsComponent } from './components/admin/manage-timeslots/manage-timeslots.component';

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
    data: { roles: ['ROLE_SUPERADMIN', 'ROLE_ADMIN', 'ROLE_MEDECIN'] } ,
    children: [
      { path: 'centers', component: ManageCentersComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_SUPERADMIN', 'ROLE_ADMIN'] } },
      { path: 'planning', component: ManagePlanningComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_SUPERADMIN', 'ROLE_ADMIN', 'ROLE_MEDECIN'] } },
      { path: 'super-admins', component: ManageSuperAdminsComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_SUPERADMIN'] } },
      { path: 'admins', component: ManageAdminsComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_SUPERADMIN'] } },
      { path: 'medecins', component: ManageMedecinsComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_SUPERADMIN', 'ROLE_ADMIN', 'ROLE_MEDECIN'] } },
      { path: 'creneaux', component: ManageTimeslotsComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_SUPERADMIN', 'ROLE_ADMIN', 'ROLE_MEDECIN'] }  }

    ],
  }
];
