// home.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { PicoYPlacaService } from '../service/service.service';  // Asegúrate de importar el servicio aquí

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
  ],
  providers: [PicoYPlacaService]  // Añade el servicio aquí
})
export class HomePageModule {}
