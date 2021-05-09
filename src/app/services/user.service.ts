import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  constructor(private httpClient: HttpClient, private lstorageService: LocalstorageService) {
    this.currentUserSubject = new BehaviorSubject<any>({});
    this.getConnectedUser(lstorageService.getAccessToken()).subscribe(
      (user) => {
        this.currentUserSubject.next(user);
      }
    )
  }

  register(firstName: string, lastName: string, password: string, username: string,
    email: string, phoneNumber: string, birthDate: string, address: string, avatar: string, gender: string) {
    return this.httpClient.post('https://portail-2021.herokuapp.com/register',
      {
        firstName, lastName, password, username, email, phoneNumber, birthDate, address, avatar, gender
      }

    )
  }
  login(username: string, password: string) {
    return this.httpClient.post('https://portail-2021.herokuapp.com/login',
      {
        username, password
      }).pipe(map((data: any) => {
        console.log(data)
        this.lstorageService.setToken(data.accessToken)
        this.currentUserSubject.next(data.user)
      }))
  }
  logout() {
    this.lstorageService.clearToken();
  }
  getCurrentUser() {
    return this.currentUserSubject.asObservable();
  }
  getConnectedUser(token: string) {
    return this.httpClient.get('https://portail-2021.herokuapp.com/authorize',
      {
        headers: { 'Authorization': `Bearer ${token}` }
      })
  }
  // updateUser(userId: string, path: string, value: string) {
  //   return this.httpClient.patch(`https://portail-2021.herokuapp.com/user/${userId}`,
  //     {
  //       headers: { 'Authorization': `Bearer ${token}` }
  //     })
  // }
}
