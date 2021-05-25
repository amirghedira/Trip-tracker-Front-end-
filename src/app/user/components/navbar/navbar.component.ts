import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) { }
  user: any;
  userSubscription: Subscription
  ngOnInit(): void {
    this.userSubscription = this.authService.getCurrentUser().subscribe(
      (data) => {
        this.user = data;
      }
    )
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
  logout() {
    this.authService.userLogout();
  }
}
