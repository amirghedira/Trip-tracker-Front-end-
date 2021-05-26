import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { UserService } from '../../user.service'
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
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
    markers = []
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
                console.log(suggestion)
                this.loading = false
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
                            url: '../../../assets/img/PngItem_1760457.png',
                            scaledSize: { height: 90, width: 71 }
                        }
                    },

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
                                url: '../../../assets/img/tript.png',
                                scaledSize: { height: 90, width: 40 }
                            }
                        }
                    })
                });
                this.markers = markers
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
        this.infoContent = this.markers[index].title;
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
}
