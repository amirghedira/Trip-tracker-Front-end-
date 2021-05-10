import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profileuser;
  user;
  oldPassword: string;
  newPassword: string;
  renewPassword: string;
  invalidPasswordMatch = false;
  fileUpload: File = null;
  existimg: boolean;
  clickedimage: boolean;
  clientId: string;
  editName = false;
  editUsername = false;
  editEmail = false;
  editAgencename = false;
  editAddress = false;
  editPhone = false;
  editBirthday = false;
  editLicenceNum = false;
  editNcin = false;
  username: string;
  firstName: string;
  surname: string;
  email: string;
  agenceName: string;
  address: string;
  phone: string;
  birthday: string;
  currentUserId: string;
  licencenum: string;
  numCin: string;
  imageUrl: string;
  loading = true;
  private userId: string;
  userSubscription: Subscription

  constructor(private userService: UserService, private lStorageService: LocalstorageService) { }

  ngOnInit(): void {
    if (this.lStorageService.getAccessToken())
      this.userSubscription = this.userService.getCurrentUser().subscribe(
        (data: any) => {
          console.log(data)
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
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
