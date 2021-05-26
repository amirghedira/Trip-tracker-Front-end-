import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { UserService } from '../../user.service'

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  user: any;
  userSubscription: Subscription
  loading: boolean = false
  suggestions: any = []
  constructor(private authService: AuthService, private userService: UserService,
    private spinner: NgxSpinnerService) {

  }

  ngOnInit() {
    this.loading = true
    this.userService.getBookings().subscribe((res) => {
      console.log(res)
      this.loading = false
      this.suggestions = res
    },
      (err) => {
        console.log(err)
      })

  }

}
