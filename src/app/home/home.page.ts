import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  plate: string = '';
  date: string = new Date().toISOString().split('T')[0]; 
  time: string = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  dayOfWeek: string = '';
  showCalendar: boolean = false;
  showTimePicker: boolean = false;
  result: string = '';

  daysOfWeek = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  restrictedDays: { [key: number]: string } = {
    1: 'Lunes',
    2: 'Lunes',
    3: 'Martes',
    4: 'Martes',
    5: 'Miércoles',
    6: 'Miércoles',
    7: 'Jueves',
    8: 'Jueves',
    9: 'Viernes',
    0: 'Viernes',
  };

  constructor(private alertController: AlertController) {
    this.updateDayOfWeek(); 
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  toggleTimePicker() {
    this.showTimePicker = !this.showTimePicker;
  }

  updateDayOfWeek() {
    const currentDate = new Date(); 
    const currentDayOfWeek = currentDate.getDay(); 
    this.dayOfWeek = this.daysOfWeek[currentDayOfWeek]; 
  }

  async presentAlertModal(message: string = 'Horarios restringidos: 06:00-09:30 y 16:00-21:00') {
    const alert = await this.alertController.create({
      header: 'Restricción de circulación',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
  

  checkIfCanDrive() {
    if (!this.plate || !this.date || !this.time) {
      this.presentAlertModal('Por favor, complete todos los campos.');
      return;
    }

    const lastDigit = this.plate.slice(-1);
    const restrictedDay = this.restrictedDays[parseInt(lastDigit, 10)];

    if (this.dayOfWeek === restrictedDay) {
      this.presentAlertModal(
        'No puede circular en los horarios restringidos: de 06:00 a 09:30 y de 16:00 a 21:00.'
      );
    } else {
      this.presentAlertModal('Puede circular en esta fecha.');
    }
  }

  clearFields() {
    this.plate = '';
    this.date = new Date().toISOString().split('T')[0]; 
    this.time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.result = '';
    this.updateDayOfWeek(); 
  }
}
