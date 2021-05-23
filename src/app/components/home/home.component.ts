import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  user: any;
  userSubscription: Subscription
  budget: number
  days: number
  currency: string = 'TND'
  loading: boolean = true
  suggestionError: boolean = false
  fees: number
  rest: number
  hotelOffer: any
  restaurants = []
  zoom = 12
  markers = []
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    scrollwheel: false,
    maxZoom: 15,
    // minZoom: 8,
    mapTypeControl: false,
    scaleControl: false,
    zoomControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  constructor(private userService: UserService, private lStorageService: LocalstorageService, private router: Router,
    private spinner: NgxSpinnerService) {

  }

  ngOnInit() {

    if (this.lStorageService.getAccessToken()) {
      this.userSubscription = this.userService.getCurrentUser().subscribe(
        (data) => {
          this.user = data;
        }
      )
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
      })
    }
    else {
      this.router.navigate(['login']);
    }
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
  }
  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      options: { animation: google.maps.Animation.BOUNCE },
    })
  }

  onGetSuggestion() {
    this.loading = true
    this.suggestionError = false
    this.spinner.show();
    this.userService.getSuggestions(this.budget, this.days, this.currency)
      .subscribe((suggestion: any) => {
        this.loading = false
        console.log(suggestion)
        this.fees = suggestion.startingBudget - suggestion.rest
        this.rest = suggestion.rest
        this.hotelOffer = suggestion.hotelOffer
        this.restaurants = suggestion.restaurants
        this.markers = [{
          position: {
            lng: suggestion.hotelOffer.hotel.longitude,
            lat: suggestion.hotelOffer.hotel.latitude
          },
          options: {},
          title: suggestion.hotelOffer.hotel.name,
        }]
      }, (err) => {
        console.log(err)
        this.suggestionError = true
        this.spinner.hide();
      }, () => {
        this.spinner.hide();

      })
  }

  ngOnDestroy() {
    if (this.lStorageService.getAccessToken())
      this.userSubscription.unsubscribe();
  }
}
