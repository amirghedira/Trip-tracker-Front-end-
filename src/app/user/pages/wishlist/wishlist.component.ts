import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  suggestions: any = []
  loading: boolean = false

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loading = true

    this.userService.getWishlist().subscribe((res) => {
      console.log(res)
      this.loading = false

      this.suggestions = res
    },
      (err) => {
        console.log(err)
      })
  }

  bookSuggestion(id: string) {
    this.userService.bookSuggestion(id).subscribe((res) => {
      console.log(res)
    },
      (err) => {
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
}
