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
  name: string;
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
        (data) => {
          console.log(data)
          this.user = data;
        }
      )
  }
  onEditName() {
    this.editName = !this.editName;
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
