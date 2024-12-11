import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-alert-modal',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Restricción de Circulación</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="closeModal()">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
  <p><strong>El "Pico y Placa" se aplica en 2 horarios:</strong></p>

  <ion-grid>
    <ion-row>
      <ion-col size="6" class="ion-text-center">
        <div class="table-header">
          <strong>Horario</strong>
        </div>
      </ion-col>
      <ion-col size="6" class="ion-text-center">
        <div class="table-header">
          <strong>Descripción</strong>
        </div>
      </ion-col>
    </ion-row>
    
    <ion-row>
      <ion-col size="6" class="ion-text-center">
        <div class="table-row">
          <strong>06:00 a 09:30</strong>
        </div>
      </ion-col>
      <ion-col size="6" class="ion-text-center">
        <div class="table-row">
          <strong>Mañana</strong>
        </div>
      </ion-col>
    </ion-row>

    <ion-row>
      <ion-col size="6" class="ion-text-center">
        <div class="table-row">
          <strong>16:00 a 21:00</strong>
        </div>
      </ion-col>
      <ion-col size="6" class="ion-text-center">
        <div class="table-row">
          <strong>Tarde</strong>
        </div>
      </ion-col>
    </ion-row>
  </ion-grid>
</ion-content>

<style>
  .table-header {
    background-color: #4CAF50;
    color: white;
    font-weight: bold;
    padding: 10px;
    text-align: center;
  }
  .table-row {
    background-color: #f9f9f9;
    color: #333;
    border-bottom: 1px solid #ddd;
    padding: 10px;
  }
  .table-row:nth-child(odd) {
    background-color: #e2f7e2;
  }
  .table-row:hover {
    background-color: #d1f2d1;
  }
</style>
`,
})
export class AlertModalComponent {
  constructor(private modalController: ModalController) {}

  async closeModal() {
    await this.modalController.dismiss();
  }
}
