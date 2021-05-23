import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        FormsModule,
        BrowserModule,
        // UserModule,
        AppRoutingModule,
        AuthModule,

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],

    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
