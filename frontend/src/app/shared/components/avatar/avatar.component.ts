import { Component, ElementRef, Input, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  standalone: true,
  imports: [CommonModule]
})

export class AvatarComponent implements AfterViewInit {
  @Input() username: string = '';
  @Input() color: string = '#000000';

  containerWidth: number = 0;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.containerWidth = this.elementRef.nativeElement.offsetWidth;
  }

  get initial(): string {
    return this.username ? this.username[0].toUpperCase() : '';
  }
}
