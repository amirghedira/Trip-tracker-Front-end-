import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingComponent } from './pages/booking/booking.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'bookings', component: BookingComponent },
  { path: 'favorite', component: WishlistComponent },
  { path: 'settings', component: ProfileComponent },
  { path: '**', redirectTo: 'home' },


];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class UserRoutingModule { }
