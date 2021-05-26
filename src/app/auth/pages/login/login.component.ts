import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string
  password: string
  errorMessage: boolean = false
  loading: boolean = false
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  login() {
    this.loading = true
    this.authService.login(this.username, this.password).subscribe(
      (res: any) => {
        this.authService.setCurrentUser(res.user)
        this.authService.setToken(res.accessToken)
        this.authService.isConnected.next(true)
        this.loading = false
      },
      (err) => {
        console.log(err)
        this.errorMessage = true
      }
    )
  }
}
