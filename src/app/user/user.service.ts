import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private httpClient: HttpClient) { }

    getSuggestions(budget: number, days: number, currency: string) {
        return this.httpClient.get(`https://portail-2021.herokuapp.com/api/suggestion/getSuggestion?currency=${currency}&money=${budget}&days=${days}`)
    }
    updateUser(userId: string, path: string, value: string) {
        return this.httpClient.patch(`https://portail-2021.herokuapp.com/user/${userId}`,
            [{
                "op": "replace",
                "path": `/${path}`,
                "value": value
            }])
    }
}
