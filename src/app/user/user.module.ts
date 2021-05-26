import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserComponent } from './user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { TokenInterceptorService } from '../services/token-interceptor.service';
import { BookingComponent } from './pages/booking/booking.component';
import { UserService } from './user.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';



@NgModule({
  declarations: [
    WishlistComponent,
    HomeComponent,
    ProfileComponent,
    UserComponent,
    NavbarComponent,
    FooterComponent,
    BookingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GoogleMapsModule,
    HttpClientModule,
    RouterModule,
    NgxSpinnerModule,
    UserRoutingModule,
    NgxSkeletonLoaderModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,


  }, UserService]
})
export class UserModule { }
