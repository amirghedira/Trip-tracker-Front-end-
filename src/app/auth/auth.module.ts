import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { RootComponent } from './pages/root/root.component';
import { AuthComponent } from './auth.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent,
        RootComponent,
        AuthComponent,
        NavbarComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        HttpClientModule,
        NgxSpinnerModule,
        AuthRoutingModule,
    ]
})
export class AuthModule { }
