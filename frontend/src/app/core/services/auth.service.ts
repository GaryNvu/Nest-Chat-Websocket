import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, tap } from "rxjs";

export interface AuthResponse {
  access_token: string | null;
  user: {
    id: string;
    username: string;
    email: string;
    color: string;
  } | null;
}

export interface User {
    id: string;
    username: string;
    email: string;
    color: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly API_URL = 'http://localhost:3000/api/v1/auth';
    private readonly AUTH_STATE_KEY = 'auth_state';
    
    private authState = signal<AuthResponse>({
        user: this.getStoredAuthState()?.user || null,
        access_token: this.getStoredAuthState()?.access_token || null
    });

    currentUser = signal<User | null>(this.authState().user);

    constructor(private httpClient: HttpClient) {}

    login(email: string, password: string) {
        return this.httpClient.post<AuthResponse>(`${this.API_URL}/login`, { email, password }).pipe(
            tap(res => {
                if (res.access_token && res.user?.id && res.user?.email) {
                    this.setAuthState(res);
                } else {
                    console.warn('Réponse inattendue du serveur', res);
                }
            })
        );
    }

    signup(username: string, email: string, password: string) {
        return this.httpClient.post<AuthResponse>(`${this.API_URL}/signup`, { username, email, password }).pipe(
            tap(res => {
                if (res.access_token && res.user?.id && res.user?.email) {
                    this.setAuthState(res);
                } else {
                    console.warn('Réponse inattendue du serveur', res);
                }
            })
        );
    }

    logout() {
        localStorage.removeItem(this.AUTH_STATE_KEY);
        this.authState.set({ user: null, access_token: null });
        this.currentUser.set(null);
    }

    isLoggedIn(): boolean {
        return !!this.authState().access_token;
    }

    getToken(): string | null {
        return this.authState().access_token;
    }

    private setAuthState(state: AuthResponse) {
        localStorage.setItem(this.AUTH_STATE_KEY, JSON.stringify(state));
        this.authState.set(state);
        this.currentUser.set(state.user);
    }

    private getStoredAuthState(): AuthResponse | null {
        const stored = localStorage.getItem(this.AUTH_STATE_KEY);
        return stored ? JSON.parse(stored) : null;
    }

    updateCurrentUser(user: User) {
        const currentState = this.authState();

        const newState: AuthResponse = {
        ...currentState,
        user
        };
        this.setAuthState(newState);
    }
}