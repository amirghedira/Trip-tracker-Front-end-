import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { UserService } from '../../user.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  suggestions: any = []
  loading: boolean = false
  recommendations: any = []
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true

    this.userService.getWishlist().subscribe((wishlist) => {
      console.log(wishlist)
      this.suggestions = wishlist
      this.userService.getRecommendations().subscribe((res) => {
        console.log(res)
        this.loading = false
        this.recommendations = res
      },
        (err) => {
          console.log(err)
        })
    },
      (err) => {
        console.log(err)
      })
  }

  bookSuggestion(id: string) {
    this.userService.bookSuggestion(id).subscribe((res) => {
      console.log(res)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'You have successfully booked!',
        showConfirmButton: false,
        timer: 1500
      })
    },
      (err) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'An error occurred, please try again',
          showConfirmButton: false,
          timer: 1500
        })
        console.log(err)
      })
  }
  removeSuggestion(id: string) {
    this.userService.removeSuggestionFromWishlist(id).subscribe((res) => {
      console.log(res)
      this.suggestions = this.suggestions.filter(sugg => sugg.id !== id)
    }, (err) => {
      console.log(err)
    })
  }
  viewRecommendationOnMap(recommendation: any) {
    this.userService.setRecommendation(recommendation)
    this.router.navigate(['/user/home'])

  }

}
