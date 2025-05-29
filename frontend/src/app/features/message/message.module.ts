import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MessageListComponent } from './pages/message-list/message-list.component';
import { MessageService } from './services/message.service';
import { FormsModule, NgForm } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MessageListComponent
  ]
})
export class MessageModule { }