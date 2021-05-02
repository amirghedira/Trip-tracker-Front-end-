import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
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
      }

    )
  }
}
