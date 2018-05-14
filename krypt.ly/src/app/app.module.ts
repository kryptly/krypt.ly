import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { RoadmapComponent } from './pages/roadmap/roadmap.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AppRoutingModule } from './/app-routing.module';
import { ServicesComponent } from './pages/services/services.component';
import { VisionComponent } from './pages/vision/vision.component';
import { MakeSquareDirective } from './make-square.directive';
import { Service1Component } from './pages/services/service1/service1.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    RoadmapComponent,
    ContactComponent,
    ServicesComponent,
    VisionComponent,
    MakeSquareDirective,
    Service1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
