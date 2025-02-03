import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SearchCenterComponent } from './components/search-center/search-center.component';
import { LoginComponent } from './components/login/login.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManageCentersComponent } from './components/manage-centers/manage-centers.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { AuthGuard } from './auth-guard.service';
import { ManagePlanningComponent } from './components/manage-planning/manage-planning.component';
import { ManageTimeslotsComponent } from './components/manage-timeslots/manage-timeslots.component';



export const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: SearchCenterComponent },
  { path: 'appointment', component: AppointmentFormComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'login', component: LoginComponent },
  {
   
  path: 'admin',
  component: AdminDashboardComponent, // Assurez-vous que AdminDashboardComponent est défini ici
  canActivate: [AuthGuard],
  children: [
    { path: 'centers', component: ManageCentersComponent },
    { path: 'users', component: ManageUsersComponent },
    { path: 'planning', component: ManagePlanningComponent},
    { path: 'timeslots', component: ManageTimeslotsComponent}
    ],
  },
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
];

