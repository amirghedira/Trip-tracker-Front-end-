import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    token: string;
    loggedUser: BehaviorSubject<any>;
    isConnected: BehaviorSubject<Boolean>
    constructor(private httpClient: HttpClient, private router: Router) {
        this.token = localStorage.getItem('access_token')
        this.loggedUser = new BehaviorSubject(null)
        this.isConnected = new BehaviorSubject(null)
    }

    checkUser() {
        if (this.token) {
            this.getConnectedUser().subscribe((reponse: any) => {
                this.setCurrentUser(reponse);
                this.isConnected.next(true)


            }, err => {
                this.userLogout()
            })
        } else {
            this.isConnected.next(false)
        }
    }

    setCurrentUser(user: any) {
        this.loggedUser.next(user)
    }
    getCurrentUser() {
        return this.loggedUser
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
            })
    }
    userLogout() {
        localStorage.removeItem('access_token')
        this.token = null;
        this.isConnected.next(false)
        this.setCurrentUser(null)
        this.router.navigate(['auth'])
    }
    getConnectedUser() {
        return this.httpClient.get('https://portail-2021.herokuapp.com/authorize',
            {
                headers: { 'Authorization': `Bearer ${this.token}` }
            })
    }
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
