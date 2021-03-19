import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { redirectAuthorizedToWelcome } from './auth/fire-auth-guard-pipes.pipe';

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
  // {
  //   path: 'training',
  //   canActivate: [AngularFireAuthGuard],
  //   data: { authGuardPipe: redirectUnauthorizedToLogin},
  //   loadChildren: './training/training.module#TrainingModule'
  // },
  { path: 'training', loadChildren: () => import('./training/training.module').then(m => m.TrainingModule) },
  { path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
