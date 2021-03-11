import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { PastTrainingsComponent } from './training/past-trainings/past-trainings.component';
import { TrainingComponent } from './training/training.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: WelcomeComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'training', component: TrainingComponent},
  { path: 'new-training', component: NewTrainingComponent},
  { path: 'past-trainings', component: PastTrainingsComponent},
  { path: 'current-trainings', component: CurrentTrainingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
