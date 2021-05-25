import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { UserComponent } from './user/user.component';



const routes: Routes = [
    {
        path: 'auth',
        canActivate: [GuestGuard],
        component: AuthComponent,
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'user',
        canActivate: [AuthGuard],
        component: UserComponent,
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    },
    { path: '**', redirectTo: 'auth' },


];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
