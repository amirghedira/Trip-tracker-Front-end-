import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {
  recommendation: BehaviorSubject<any>;
  viewOnMap: BehaviorSubject<Boolean>

  constructor(private httpClient: HttpClient) {
    this.recommendation = new BehaviorSubject(null)
    this.viewOnMap = new BehaviorSubject(null)

  }

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

  updatePassword(oldPassword: string, newPassword: string) {
    return this.httpClient.post('https://portail-2021.herokuapp.com/reset/password', {
      oldPassword, newPassword
    })
  }

  updateProfilePicture(file: FormData) {
    return this.httpClient.post('https://portail-2021.herokuapp.com/user/upload', file
    )
  }

  bookSuggestion(id: string) {
    return this.httpClient.post('https://portail-2021.herokuapp.com/api/suggestion/book', { id })
  }

  addSuggestionToWishlist(id: string) {
    return this.httpClient.post('https://portail-2021.herokuapp.com/api/suggestion/wish', { id })

  }

  getBookings() {
    return this.httpClient.get('https://portail-2021.herokuapp.com/api/suggestion/myBookingList')
  }

  getWishlist() {
    return this.httpClient.get('https://portail-2021.herokuapp.com/api/suggestion/myWishList')
  }

  getRecommendations() {
    return this.httpClient.get('https://portail-2021.herokuapp.com/api/suggestion/recommendation')
  }

  removeSuggestionFromWishlist(id: string) {
    return this.httpClient.delete(`https://portail-2021.herokuapp.com/api/suggestion/remove/${id}`)
  }

  setRecommendation(recommendation: any) {
    this.recommendation.next(recommendation)
    this.viewOnMap.next(true)

  }
  getRecommendation() {
    return this.recommendation
  }

}
