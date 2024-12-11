import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PicoYPlacaService } from './service/service.service';
import { AlertModalComponent } from './home/modal-component/alert-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertModalComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PicoYPlacaService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
