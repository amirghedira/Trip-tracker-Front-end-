import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { UserService } from '../../user.service'
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MapDirectionsService } from '@angular/google-maps';



import Swal from 'sweetalert2'
import { map } from 'rxjs/operators';


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
  fees: number
  loading: boolean = true
  loadingSpinner: boolean = false
  rest: number
  hotelOffer: any
  suggestionID: string
  restaurants: any = []
  recommendations: any = []
  recommendationSubscription: Subscription

  suggestionError: boolean
  currency: string = 'TND'
  zoom = 12
  markers = []
  renderOptions = {
    suppressMarkers: true,
    polylineOptions: { strokeColor: '#5cb85c' }
  }
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
  directionsResults = [];

  constructor(private authService: AuthService, private userService: UserService,
    private spinner: NgxSpinnerService, private mapDirectionsService: MapDirectionsService) {

  }

  ngOnInit() {

    this.userSubscription = this.authService.getCurrentUser().subscribe(
      (data) => {
        this.user = data;
        this.userService.getRecommendations().subscribe((res: any) => {
          console.log(res)
          this.recommendations = res.slice(2)
        },
          (err) => {
            console.log(err)
          })
      }
    )
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
    // if (this.userService.viewOnMap)
    //   this.recommendationSubscription = this.userService.getRecommendation().subscribe(recommendation => {
    //     this.viewRecommendationOnMap(recommendation)
    //   })
  }

  refreshMap(markers) {
    const bounds = new window.google.maps.LatLngBounds()
    markers.forEach(marker => {
      const myLatLng = new window.google.maps.LatLng(marker.position.lat, marker.position.lng);
      bounds.extend(myLatLng);
    })
    this.googleMap.fitBounds(bounds)
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
    this.loading = true
    this.loadingSpinner = true
    this.suggestionError = false
    this.userService.getSuggestions(this.budget, this.days, this.currency)
      .subscribe((suggestion: any) => {
        console.log(suggestion)
        this.loading = false
        this.loadingSpinner = false
        this.suggestionID = suggestion.id
        this.rest = suggestion.rest
        this.fees = suggestion.startingBudget - suggestion.rest
        this.restaurants = suggestion.restaurants
        this.hotelOffer = suggestion.hotelOffer
        let markers = [{
          position: {
            lng: suggestion.hotelOffer.hotel.longitude,
            lat: suggestion.hotelOffer.hotel.latitude
          },
          options: {
            animation: google.maps.Animation.DROP,
            draggable: false,
            icon: {
              url: '../../../assets/img/picker1.png',
              scaledSize: { height: 44, width: 30 }
            }
          },
          duration: '',
          name: suggestion.hotelOffer.hotel.name

        }]
        suggestion.restaurants.forEach(restaurant => {
          markers.push({
            position: {
              lng: +restaurant.location.longitude,
              lat: +restaurant.location.latitude
            },
            options: {
              animation: google.maps.Animation.DROP,
              draggable: false,
              icon: {
                url: '../../../assets/img/picker2.png',
                scaledSize: { height: 44, width: 30 }
              }
            },
            duration: '',
            name: restaurant.name
          })
        });
        markers.forEach((marker, index) => {
          if (index > 0) {
            const request: google.maps.DirectionsRequest = {
              destination: marker.position,
              origin: markers[0].position,
              travelMode: google.maps.TravelMode.DRIVING
            };
            this.mapDirectionsService.route(request)
              .subscribe(response => {
                marker.duration = response.result.routes[0].legs[0].duration.text
                this.directionsResults.push(response.result)
              })
          }
        })
        this.markers = markers
        this.refreshMap(this.markers)

      }, (err) => {
        console.log(err)
        this.loadingSpinner = false
        this.suggestionError = true
      }, () => {

      })
  }

  bookSuggestion() {
    this.userService.bookSuggestion(this.suggestionID).subscribe(res => {
      console.log(res)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'You have successfully booked!',
        showConfirmButton: false,
        timer: 1500
      })
    },
      (err) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'An error occurred, please try again',
          showConfirmButton: false,
          timer: 1500
        })
        console.log(err)
      })
  }
  openInfoWindow(marker: MapMarker, index) {
    /// stores the current index in forEach
    console.log(this.markers)
    this.infoContent = this.markers[index].name + ' ' + this.markers[index].duration;
    this.infoWindow.open(marker);

  }
  addSuggestionTowish() {
    this.userService.addSuggestionToWishlist(this.suggestionID).subscribe(res => {
      console.log(res)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Added succesfully to your wishlist!',
        showConfirmButton: false,
        timer: 1500
      })
    },
      (err) => {
        console.log(err)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'An error occured, please try again!',
          showConfirmButton: false,
          timer: 1500
        })
      })
  }
  viewRecommendationOnMap(suggestion: any) {
    this.loading = false;
    this.suggestionID = suggestion.id
    this.rest = suggestion.rest
    this.fees = suggestion.startingBudget - suggestion.rest
    this.restaurants = suggestion.restaurants
    this.hotelOffer = suggestion.hotelOffer
    let markers = [{
      position: {
        lng: suggestion.hotelOffer.hotel.longitude,
        lat: suggestion.hotelOffer.hotel.latitude
      },
      options: {
        animation: google.maps.Animation.DROP,
        draggable: false,
        icon: {
          url: '../../../assets/img/picker1.png',
          scaledSize: { height: 44, width: 30 }
        }
      },
      duration: '',
      name: suggestion.hotelOffer.hotel.name

    }]
    suggestion.restaurants.forEach(restaurant => {
      markers.push({
        position: {
          lng: +restaurant.location.longitude,
          lat: +restaurant.location.latitude
        },
        options: {
          animation: google.maps.Animation.DROP,
          draggable: false,
          icon: {
            url: '../../../assets/img/picker2.png',
            scaledSize: { height: 44, width: 30 }
          }
        },
        duration: '',
        name: restaurant.name
      })
    });
    markers.forEach((marker, index) => {
      if (index > 0) {
        const request: google.maps.DirectionsRequest = {
          destination: marker.position,
          origin: markers[0].position,
          travelMode: google.maps.TravelMode.DRIVING
        };
        this.mapDirectionsService.route(request)
          .subscribe(response => {
            marker.duration = response.result.routes[0].legs[0].duration.text
            this.directionsResults.push(response.result)
          })
      }
    })
    this.markers = markers
    this.refreshMap(this.markers)
  }
  deleteRecommendation(id: string) {
    console.log(id)
    this.recommendations = this.recommendations.filter(rec => rec.id !== id)
  }
  ngOnDestroy() {
    // this.recommendationSubscription.unsubscribe();
  }
}
