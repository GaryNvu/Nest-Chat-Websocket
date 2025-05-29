import { Component, OnDestroy, OnInit, Signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthResponse, AuthService } from '../../../core/services/auth.service';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [AvatarComponent, RouterModule]
})

export class SidebarComponent {
  currentUser: Signal<AuthResponse['user'] | null>;
  

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser = this.authService.currentUser;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
