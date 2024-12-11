import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-alert-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Restricción de Circulación</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="closeModal()">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <p><strong>El "Pico y Placa" se aplica en 2 horarios:</strong></p>
      <ul>
        <li><strong>06:00 a 09:30</strong> (Mañana)</li>
        <li><strong>16:00 a 21:00</strong> (Tarde)</li>
      </ul>
    </ion-content>
  `,
})
export class AlertModalComponent {
  constructor(private modalController: ModalController) {}

  async closeModal() {
    await this.modalController.dismiss();
  }
}
