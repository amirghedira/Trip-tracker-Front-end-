import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../../user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user;
  oldPassword: string;
  newPassword: string;
  renewPassword: string;
  invalidPasswordMatch: boolean = false;
  incorrectPassword: boolean = false
  fileUpload: File = null;
  existimg: boolean;
  clickedimage: boolean;
  editName = false;
  editUsername = false;
  editEmail = false;
  editAddress = false;
  editPhone = false;
  editBirthday = false;
  username: string;
  firstName: string;
  surname: string;
  email: string;
  address: string;
  phone: string;
  birthday: string;
  currentUserId: string;
  imageUrl: string;
  loading = true;
  userSubscription: Subscription

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.getCurrentUser().subscribe(
      (data: any) => {
        this.user = data;
        this.firstName = data.firstName
      }
    )
  }
  onEditName() {
    this.editName = !this.editName;
  }
  updateName() {
    this.userService.updateUser(this.user.id, "firstName", this.user.firstName).subscribe(
      (user) => {
        console.log(user)
      },
      (err) => {
        console.log(err)
      }
    )
    this.userService.updateUser(this.user.id, "lastName", this.user.firstName).subscribe(
      (user) => {
        console.log(user)
      },
      (err) => {
        console.log(err)
      }
    )
  }
  onEditEmail() {
    this.editEmail = !this.editEmail
  }
  updateEmail() {
    this.userService.updateUser(this.user.id, "email", this.user.firstName).subscribe(
      (user) => {
        console.log(user)
      },
      (err) => {
        console.log(err)
      }
    )
  }
  onEditAddress() {
    this.editAddress = !this.editAddress
  }
  updateAddress() {
    this.userService.updateUser(this.user.id, "address", this.user.firstName).subscribe(
      (user) => {
        console.log(user)
      },
      (err) => {
        console.log(err)
      }
    )
  }

  onEditPhone() {
    this.editPhone = !this.editPhone
  }
  updatePhone() {
    this.userService.updateUser(this.user.id, "phoneNumber", this.user.firstName).subscribe(
      (user) => {
        console.log(user)
      },
      (err) => {
        console.log(err)
      }
    )
  }
  updatePassword() {
    if (this.newPassword === this.renewPassword) {
      this.invalidPasswordMatch = false
      this.userService.updatePassword(this.oldPassword, this.newPassword).subscribe((res) => {
        console.log(res)
      }, (err) => {
        console.log(err)
        if (err.status === 400) {
          this.incorrectPassword = true
        }
      })
    }
    else {
      this.invalidPasswordMatch = true
    }
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
