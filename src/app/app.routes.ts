import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SearchCenterComponent } from './components/search-center/search-center.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

export const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: SearchCenterComponent },
  { path: 'appointment', component: AppointmentFormComponent },
  { path: 'confirmation', component: ConfirmationComponent },
];