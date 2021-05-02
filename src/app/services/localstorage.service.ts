import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }
  setToken = (accessToken) => {
    localStorage.setItem("access_token", accessToken);
  }

  getAccessToken = () => {
    return localStorage.getItem("access_token");
  }

  clearToken = () => {
    localStorage.removeItem("access_token");
  }
}