import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutes } from './app.routing';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    NavbarComponent,
    ProfileComponent,
    FavoriteComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes, {
      scrollPositionRestoration: 'enabled',
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
