import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
    id: string;
    username: string;
    email: string;
    color: string;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private API_URL = 'http://localhost:3000/api/v1/user';
  constructor(private http: HttpClient) {}

  updateColor(userId: string, color: string): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/color/${userId}`, { color });
  }
}