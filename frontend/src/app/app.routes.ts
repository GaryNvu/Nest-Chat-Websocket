import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MessageListComponent } from './features/message/pages/message-list/message-list.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { SignupComponent } from './features/auth/pages/signup/signup.component';
import { AuthGuard } from './core/guards/auth.guard';
import { SettingsComponent } from './features/settings/pages/settings.component';

export const routes: Routes = [
  {
    path: '',
    component: MessageListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/signup',
    component: SignupComponent
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }