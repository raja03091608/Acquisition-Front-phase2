import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { Apiendpoints } from '../ApiEndPoints';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

const API_URL = environment.apiUrl;


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  //
async login(loginname: string, password: string): Promise<any> {
  try {
    const response = await firstValueFrom(
      this.http.post<any>(`${API_URL}api/auth/token`, {
        loginname,
        password,
      }),
    );

    this.setAuthToken(response.access);
    this.setUnitId(response.unit_id);

    return response;
  } catch (error: any) {
    throw new Error(
      error?.error?.detail ||
      error?.error?.message ||
      'Invalid username or password'
    );
  }
}




  private setAuthToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  private setUnitId(unitId: string) {
    localStorage.setItem('unit_id', unitId);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('unit_id');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
  // ------------------------ MODULE PERMISSION API METHOD--------------------
  async getModulePermissions() {
    const token = this.getToken();
    const res = await fetch(`${API_URL}${Apiendpoints.ACCESS_PERMISSIONS}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  }
}
