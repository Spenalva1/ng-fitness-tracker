import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { PastTrainingsComponent } from './training/past-trainings/past-trainings.component';
import { TrainingComponent } from './training/training.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { redirectAuthorizedToWelcome, redirectUnauthorizedToLogin } from './auth/fire-auth-guard-pipes.pipe';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: WelcomeComponent},
  {
    path: 'signup',
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectAuthorizedToWelcome},
    component: SignupComponent
  },
  {
    path: 'login',
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectAuthorizedToWelcome},
    component: LoginComponent
  },
  {
    path: 'training',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin},
    component: TrainingComponent
  },
  { path: 'new-training', component: NewTrainingComponent},
  { path: 'past-trainings', component: PastTrainingsComponent},
  { path: 'current-trainings', component: CurrentTrainingComponent},
  { path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
