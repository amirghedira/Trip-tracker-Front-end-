import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  repassword: string;
  phoneNumber: string;
  address: string;
  birthDate: string = '2021-04-28T14:25:28.526Z';
  avatar: string = 'https://image.freepik.com/vecteurs-libre/profil-avatar-homme-icone-ronde_24640-14044.jpg'
  gender: string = 'MALE';
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  validateUsername() {
    return (/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(this.username))

  }
  validatePassword() {
    // return (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/ * ~$ ^+= <>]).{ 8, 20 } $/.test(this.password))
  }
  register() {
    if (this.password === this.repassword)
      this.userService.register(this.firstName, this.lastName, this.password, this.username,
        this.email, this.phoneNumber, this.birthDate, this.address, this.avatar, this.gender).subscribe(
          (data) => {
            console.log(data)
          },
          (err) => {
            console.log(err)
          }
        )
    else
      console.log('non mr')
  }


}
