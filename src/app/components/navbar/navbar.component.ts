import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService, private lStorageService: LocalstorageService) { }
  user: any;
  ngOnInit(): void {
    this.userService.getCurrentUser(this.lStorageService.getAccessToken()).subscribe(
      (data) => {
        console.log(data)
      }
    )
  }

}
