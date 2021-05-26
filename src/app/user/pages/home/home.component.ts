import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { UserService } from '../../user.service'
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { AfterViewInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any;
  userSubscription: Subscription
  budget: number
  days: number
  fees: number
  loading: boolean = true
  rest: number
  hotelOffer: any
  suggestionID: string
  restaurants: any = []
  suggestionError: boolean
  currency: string = 'TND'
  zoom = 12
  markers = [{
    position: {
      lng: 30.0001,
      lat: 36.025
    },
    options: {},
    title: 'marker test',
    label: { text: 'label test', color: 'red' },
  }]
  infoContent;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
  @ViewChild('map') googleMap;

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
  constructor(private authService: AuthService, private userService: UserService,
    private spinner: NgxSpinnerService) {

  }


  refreshMap(markers) {
    const bounds = new window.google.maps.LatLngBounds()
    markers.forEach(marker => {
      const myLatLng = new window.google.maps.LatLng(marker.position.lat, marker.position.lng);
      bounds.extend(myLatLng);
    })
    this.googleMap.fitBounds(bounds)
  }

  ngOnInit() {

    this.userSubscription = this.authService.getCurrentUser().subscribe(
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
    this.refreshMap(this.markers)
  }

  onGetSuggestion() {
    this.spinner.show()
    this.loading = true
    this.suggestionError = false
    this.userService.getSuggestions(this.budget, this.days, this.currency)
      .subscribe((suggestion: any) => {
        this.loading = false
        this.suggestionID = suggestion.id
        this.rest = suggestion.rest
        this.fees = suggestion.startingBudget - suggestion.rest
        this.restaurants = suggestion.restaurants
        this.hotelOffer = suggestion.hotelOffer
        this.markers = [{
          position: {
            lng: suggestion.hotelOffer.hotel.longitude,
            lat: suggestion.hotelOffer.hotel.latitude
          },
          options: {},
          title: suggestion.hotelOffer.hotel.name,
          label: { text: 'hotel', color: 'red' },
        }]
        this.refreshMap(this.markers)

      }, (err) => {
        console.log(err)
        this.spinner.hide()
        this.suggestionError = true
      }, () => {
        this.spinner.hide()

      })
  }

  bookSuggestion() {
    this.userService.bookSuggestion(this.suggestionID).subscribe(res => {
      console.log(res)
    },
      (err) => {
        console.log(err)
      })
  }
  openInfoWindow(marker: MapMarker, index) {
    /// stores the current index in forEach
    this.infoContent = this.markers[index].title;
    this.infoWindow.open(marker);

  }
  addSuggestionTowish() {
    this.userService.addSuggestionToWishlist(this.suggestionID).subscribe(res => {
      console.log(res)
    },
      (err) => {
        console.log(err)
      })
  }
}
