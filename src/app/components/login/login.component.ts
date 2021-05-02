import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor(private userService: UserService, private lStorageService: LocalstorageService, private router: Router) { }

  ngOnInit(): void {
  }
  login() {
    this.userService.login(this.username, this.password).subscribe(
      (data: any) => {
        this.lStorageService.setToken(data.accessToken);
        this.router.navigate(['/home']);
        console.log(data)
      },
      (err) => {
        console.log(err)
      }
    )
  }
}
