import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
providedIn: 'root'
})
export class AuthService {
constructor(private router: Router) { }

  getUserDetails() {
    return localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;
  }

  setDataInLocalStorage(variableName, data) {
    localStorage.setItem(variableName, data);
  }

  getToken() {
    return localStorage.getItem('token');
  }
  
  clearStorage() {
    localStorage.clear();
  }

  logoutUser() {
    this.clearStorage();
    this.router.navigate(['login']);

  }
}