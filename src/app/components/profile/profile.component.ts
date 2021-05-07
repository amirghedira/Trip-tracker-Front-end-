import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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
  constructor() { }

  ngOnInit(): void {
  }

}
