import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/navegation/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AnunciosComponent } from './components/anuncios/anuncios.component';
import { AuthGuardService } from './auth-guard.service';
import { AnuncioComponent } from './components/anuncio/anuncio.component';

const routes: Routes = [
{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: 'home', component: HomeComponent},
{ path: 'login', component: LoginComponent },
{ path: 'anuncios', component: AnunciosComponent},
{ path: 'anuncio/:id', component: AnuncioComponent}
// { path: 'anuncio/:id', component: AnuncioComponent , canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
