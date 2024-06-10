import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/navegation/menu/menu.component';
import { FooterComponent } from './components/navegation/footer/footer.component';
import { HomeComponent } from './components/navegation/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AnunciosComponent } from './components/anuncios/anuncios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { ApiService } from './api.service';
import { AuthService } from './components/login/auth.service';
import { AuthGuardService } from './auth-guard.service';
import { AnuncioComponent } from './components/anuncio/anuncio.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { _anunciosReducer } from './components/anuncios/store/anuncios.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AnunciosEffects } from './components/anuncios/store/anuncios.effects';
import { CreateAnuncioComponent } from './components/create-anuncio/create-anuncio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    AnunciosComponent,
    AnuncioComponent,
    CreateAnuncioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({ anuncios: _anunciosReducer }),
    EffectsModule.forRoot([AnunciosEffects]),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthService,
    ApiService,
    AuthGuardService,
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
