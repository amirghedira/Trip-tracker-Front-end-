import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RootComponent } from './pages/root/root.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
    { path: 'home', component: RootComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '**', redirectTo: 'home' },


];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class AuthRoutingModule { }
