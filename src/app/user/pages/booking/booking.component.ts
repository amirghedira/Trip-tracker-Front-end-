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

  constructor(private authService: AuthService, private userService: UserService,
    private spinner: NgxSpinnerService) {

  }

  ngOnInit() {

    this.userSubscription = this.authService.getCurrentUser().subscribe(
      (data) => {
        this.user = data;
      }
    )

  }

}
