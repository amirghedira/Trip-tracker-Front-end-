import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService, private lStorageService: LocalstorageService) { }
  user: any;
  userSubscription: Subscription
  ngOnInit(): void {
    this.userSubscription = this.userService.getCurrentUser().subscribe(
      (data) => {
        console.log(data)
        this.user = data;
      }
    )
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
