import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorSketchModule } from 'ngx-color/sketch';
import { AvatarComponent } from '../../../shared/components/avatar/avatar.component';
import { AuthService } from '../../../core/services/auth.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ColorSketchModule , AvatarComponent],
  templateUrl: './settings.component.html'
})
export class SettingsComponent {
  private authService = inject(AuthService);
  private settingsService = inject(SettingsService);
  
  currentUser = this.authService.currentUser;
  selectedColor: string = this.currentUser()?.color || '#000000';
  showSuccessMessage: boolean = false;

  onColorChange(color: any) {
    this.selectedColor = color.color.hex;
  }

  saveChanges() {
    const userId = this.currentUser()?.id;
    if (!userId) return;

    this.settingsService.updateColor(userId, this.selectedColor)
      .subscribe({
        next: (updatedUser) => {
          this.authService.updateCurrentUser(updatedUser);
          this.selectedColor = updatedUser.color;
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
        },
        error: (error) => {
          console.error('Error updating color:', error);
        }
      });
  }
}